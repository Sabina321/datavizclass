
    //Define Margin
    var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
        width = 960 - margin.left -margin.right,
        height = 500 - margin.top - margin.bottom;

    //Define Color
    var colors = d3.scale.category20();

    
    var x = d3.scale.linear()
    .domain([-width / 2, width / 2])
    .range([0, width]);

    var y = d3.scale.linear()
    .domain([-height / 2, height / 2])
    .range([height, 0]);


    //Define Scales   
    var xScale = d3.scale.linear()
        .domain([0,16]) //Need to redefine this after loading the data
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([-10,400]) //Need to redfine this after loading the data
        .range([height, 0]);
    
   //Add zoom behavior
    var zoom = d3.behavior.zoom()
    .x(xScale)
    .y(yScale)
    .scaleExtent([1, 400])
    .on("zoom", zoomed);

//Define SVG
      var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .call(zoom); 


    //Define Tooltip here

    var div = d3.select("body")
	.append("div")  // declare the tooltip div 
	.attr("class", "tooltip")              // apply the 'tooltip' class
	.style("opacity", 0)
    
      
       //Define Axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);    
   
   
    //Draw Scatterplot
   d3.csv("scatterdata.csv", function(error, data) {
    var countries  = [];
     data.forEach(function(d){
     countries.push({
      name:d.country,
      country:d.country,
      gdp:d.gdp,
      epc:d.epc,
      population:d.population,
      total:d.total
     
     })
    
    });
    console.log(countries);
      
        svg.append('g')
   .attr('class','dots')
   .selectAll(".dot")
        
        .data(countries)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.total)/.2; })
        .attr("cx", function(d) {return xScale(d.gdp);})
        .attr("cy", function(d) {return yScale(d.epc);})
        .style("fill", function (d) { return colors(d.country); })
        
         //Add tooltip 
        .on("mouseover",function(d){
             
            //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("cx")) ;
        var yPosition = parseFloat(d3.select(this).attr("cy"));
            
        div.transition()
				.duration(500)	
				.style("opacity", 0);
			div.transition()
				.duration(200)	
				.style("opacity", .9);	     
        div.html(d.country +"<br\/><br/>Population: " +d.population + "<br/><br/>GDP: $"+d.gdp + " Trillion" +"<br/><br/>EPC: " + d.epc + " Million BTUS" +"<br/><br/>TEC: " + d.total + " Trillion BTUs" )
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
      
        
       
        
        })     
            
       .on("mouseout", function() {

       //Hide the tooltip
       d3.select("#tooltip").remove();

       });
  

    //Draw Country Names
       svg.append("g")
        .attr("class", "t")
        .selectAll(".text")
        .data(countries)
        .enter().append("text")
        .attr("class","text")
        .style("text-anchor", "start")
        .attr("x", function(d) {return xScale(d.gdp);})
        .attr("y", function(d) {return yScale(d.epc);})
        .style("fill", "black")
        .text(function (d) {return d.name; });

 //x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 50)
        .attr("x", width/2)
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("GDP (in Trillion US Dollars) in 2010");

    
    //Y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("Energy Consumption per Capita (in Million BTUs per person)");

    
     // draw legend colored rectangles
    svg.append("rect")
        .attr("x", width-250)
        .attr("y", height-190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-100)
        .attr("cy", height-175)
        .style("fill", "white");
    
    svg.append("circle")
        .attr("r", 15.8)
        .attr("cx", width-100)
        .attr("cy", height-150)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 50)
        .attr("cx", width-100)
        .attr("cy", height-80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-172)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-147)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-77)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "Green") 
        .attr("font-size", "20px")
        .text("Total Energy Consumption"); 
       });
        
        //Zoom function 
       function zoomed() {
         svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        svg.select(".dots")
       .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
       svg.selectAll(".dots circle")
       .attr("cx", function(d){
        return xScale(d.gdp)})        
        .attr("cy", function(d){
        return yScale(d.epc)}) 
       svg.svg.selectAll(".t text")
        .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
       
       }
//}
