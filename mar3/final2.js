/*--------------------------------------------------------------------------------------------
    defining the margin
--------------------------------------------------------------------------------------------*/

//Taken from previous assignments
var margin = {top: 20, right: 20, bottom: 20, left: 20};
  width = 1000 - margin.left - margin.right,
  height = 1200 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Taken from: http://shancarter.github.io/ucb-dataviz-fall-2013/classes/interactive-maps/
var projection = d3.geo.albers()
.translate([width / 2, height / 2])
.parallels([34, 40.5])
.rotate([120, 0])
.scale(3000);


//var p=d3.scale.category10();

//var color2 = d3.scale.ordinal()
  //  .domain([1,2,3,4,5])
//    .range(p.range());

//var color = d3.scale.linear()
//    .domain([1, 2, 3])
//    .range(["red", "white", "green"]);

// coloring the map
// resource: Overstack: Question on Colorbrewer
var color2 = d3.scale.quantize()
    .domain([1,2,3,4,5])
    .range(colorbrewer.Reds[5]);

var path = d3.geo.path().projection(projection);

var county_ozone; 



/*--------------------------------------------------------------------------------------------
    importing the data for ozone levels
--------------------------------------------------------------------------------------------*/
d3.json("test2.json", function(err, co){
    
    var ozone = [];     
    console.log(co);  
    function getCountyOzone(d){
        return co[d];    
    }
 

    
/*--------------------------------------------------------------------------------------------
    importing the data
--------------------------------------------------------------------------------------------*/
//Taken from http://bl.ocks.org/mbostock/5562380
    d3.json("ca-counties.json", function(err, ca) {

    var counties = topojson.feature(ca, ca.objects.counties);

    
    console.log(counties.features[0].properties.name);

   //Taken from: http://shancarter.github.io/ucb-dataviz-fall-2013/classes/interactive-maps/
    svg.selectAll(".county")
        .data(counties.features)
        .enter().append("path")
        .attr("class", "county-border")
        .attr("d", path)
        .style("fill", function(d) { return color2 (getCountyOzone(d.properties.name)/10); });
  
        var texts = svg.selectAll("text")
               .data(counties.features)
               .enter();
    
    //displaying the text
    texts.append("text")
        .text(function(d){
            return d.properties.name;
        });
    
    
/***************************************************************************************************
    Code for legend
    Got the code from homework 3 and modify it
****************************************************************************************************/
/* ----------------------------------------------------------------------------
draw legend colored rectangles and the circles inside
-----------------------------------------------------------------------------*/ 
    
    
    svg.append("rect")
        .attr("x", width-250)
        .attr("y", height-190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-225)
        .attr("cy", height-165)
       // .style("fill", "green");
        .style("fill", "white");
    
    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-225)
        .attr("cy", height-130)
     //   .style("fill", "yellow");
        .style("fill", "#fee0d2");
    
    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-225)
        .attr("cy", height-95)
      //  .style("fill", "orange");
        .style("fill", "#fc9272");

    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-225)
        .attr("cy", height-60)
    //    .style("fill", "red");
        .style("fill", "#de2d26");


    
/* ----------------------------------------------------------------------------
creating the text in the legend
-----------------------------------------------------------------------------*/ 
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -200)
        .attr("y", height-163)
        .style("text-anchor", "start")
        .text("Data not available");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -200)
        .attr("y", height-128)
        .style("text-anchor", "start")
        .text("Moderate (51-100)");
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -200)
        .attr("y", height-93)
        .style("text-anchor", "start")
        .text("Unhealthy (101-200)");
    

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -200)
        .attr("y", height-58)
        .style("text-anchor", "start")
        .text("Hazardous (200-300)");
        
    
/* ----------------------------------------------------------------------------
labelling the legend
-----------------------------------------------------------------------------*/  
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "purple") 
        .attr("font-size", "20px")
        .text("Safety Level in AQI");     
    



//svg.selectAll(".county")
//.data(counties.)
    
});    
    
});



//function(){
 //return()   
    
//}

