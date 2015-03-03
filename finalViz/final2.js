var margin = {top: 20, right: 20, bottom: 20, left: 20};
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var projection = d3.geo.albers()
.translate([width / 2, height / 2])
.parallels([34, 40.5])
.rotate([120, 0])
.scale(3000);

var p=d3.scale.category10();
var color3 = d3.scale.linear().domain([1,5]).range(['white', 'red']);

var color2 = d3.scale.ordinal()
    .domain([1,2,3,4,5])
    .range(p.range());


var path = d3.geo.path().projection(projection);

var county_ozone; 
d3.json("test.json", function(err, co){
    
var ozone = [];     
console.log(co);  
function getCountyOzone(d){
return co[d];    
    
}
console.log(getCountyOzone("Sonoma County"));     
//for(var i =0; i< co['ozone'].length; i++){
  // ozone.push({
//    key:   "keyName",
  //  value: "the value"
//}); 
//}
    
d3.json("ca-counties.json", function(err, ca) {

var counties = topojson.feature(ca, ca.objects.counties);

    
console.log(counties.features[0].properties.name);


svg.selectAll(".county")
  .data(counties.features)
  .enter().append("path")
  .attr("class", "county-border")
  .attr("d", path)
  .style("fill", function(d) { return color3(getCountyOzone(d.properties.name)/300.0); });    
  
var texts = svg.selectAll("text")
                .data(counties.features)
                .enter();
    
texts.append("text")
     .text(function(d){
                    return d.properties.name;
                })
    
//svg.selectAll(".county")
//.data(counties.)
    
});    
    
});



//function(){
 //return()   
    
//}

