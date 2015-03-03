//Margin Set Up
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//Parse the date so that it appears nicely 
var parseDate = d3.time.format("%Y").parse;
  
//scales  
var x = d3.time.scale()
    .range([0, width]);
//scale y 
var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

//define the xAxis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

//define the yAxis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    

//function to create a line for a country 
var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.E); });

//define the svg container
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
     .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
// function for the x grid lines
function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
};

// function for the y grid lines
function make_y_axis() {
  return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
};    
    
//grab and operate on the data
d3.csv("EPC_2000_2010_new.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));
  console.log(  (d3.keys(data[0]).filter(function(key) { return key !== "Year"; })));
  data.forEach(function(d) {
    d.Year = parseDate(d.Year);
  });

//a dictionary of countries, with the name and values as keys
  var countries = color.domain().map(function(name) {
    return {
       
      name: name,
      values: data.map(function(d) {
        return {Year: d.Year, E: +d[name]};
      })
      
    };
  });
  
//define the x domain in terms of the data    
  x.domain(d3.extent(data, function(d) { return d.Year; }));

//define the y domain in terms of the data
  y.domain([
    d3.min(countries, function(c) { return d3.min(c.values, function(v) { return v.E; }); }),
    d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.E; }); })
  ]);
    
    

 // Draw the x Grid lines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        );

    // Draw the y Grid lines
    svg.append("g")            
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        ); 
        
    
  console.log(d3.extent(data, function(d) { return d.Year; })); 
  console.log(d3.min(countries, function(c) { return d3.min(c.values, function(v) { return v.E; }); }),
    d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.E; }); }));     
 
//add the x axis to the svg     
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

//add the y axis to the svg     
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

    
   
 //create and add the lines to the svg with transitions 
  var country = svg.selectAll(".country")
      .data(countries)
      .enter().append("g")
      .attr("class", "country");   
  country.append("path")
      .attr("class", "line")
      .style("stroke", function(d) { return color(d.name); })
      .transition()
      .duration(1000)
    
      .delay( function(d) {
			return 10*d3.max(d.values, function(v) { return v.E; }) 
            
		})
      .attr("d", function(d) { return line(d.values); });
      
      
 //add the text labels    
  country.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) 
      .attr({"x": 3,"dy": ".35em"})
      .attr("transform", function(d) { return "translate(" + x(d.value.Year) + "," + y(d.value.E) + ")"; })
      .text(function(d) { return d.name; })
      
    
      
});