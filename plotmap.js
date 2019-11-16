"use-strict";

// Width and Height of the whole visualization
var width = 700;
var height = 580;

// Create SVG


svg=d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height),

// Append empty placeholder g element to the SVG
// g will contain geometry elements
g = svg.append( "g" );

// Width and Height of the whole visualization
// Set Projection Parameters

d3.json("neighborhoods.json")
  .then(d=>{
    const e=d3.geoAlbers()
    .scale(190000)
    .rotate([71.057,0])
    .center([0,42.313])
    .translate([width/2,height/2]),

// Create GeoPath function that uses built-in D3 functionality to turn
// lat/lon coordinates into screen coordinates
    geoPath=d3.geoPath().projection(e);

// Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes

    g.selectAll("path")
      .data(d.features)
      .enter()
      .append("path")
      .attr("fill","#ccc")
      .attr( "stroke", "#333")
      .attr("d",geoPath),

    d3.json("points.json")
      .then(t=>{
        g.selectAll("circle")
          .data(t.features).enter()
          .append("path")
          .attr("class","coord")
          .attr("fill","red")
          .attr("d",geoPath);
      const s=[];
        for(let a=0;

          a<t.features.length-1;a++){
            const r=e(t.features[a].geometry.coordinates),

            n=e(t.features[a+1].geometry.coordinates);
            s.push({
              type:"LineString",coordinates:[[r[0],r[1]],[n[0],n[1]]]
            })
          }

      const r=svg.append("g");

      r.selectAll("line")
        .data(s)
        .enter()
        .append("line")
        .attr("x1",t=>t.coordinates[0][0])
        .attr("y1",t=>t.coordinates[0][1])
        .attr("x2",t=>t.coordinates[1][0])
        .attr("y2",t=>t.coordinates[1][1])
        .attr("id",function(t,e){return"line"+e})
        .attr("stroke","steelblue"),

        r.selectAll("line")
          .style("opacity",0),

      d3.selectAll("line")
        .style("opacity","1"),

      d3.selectAll("line")
        .each(function(t,e){
          let a=d3.select("#line"+e)
            .node()
            .getTotalLength();

          d3.select("#line"+e)
            .attr("stroke-dasharray",a+" "+a)
            .attr("stroke-dashoffset",a)
            .transition()
            .duration(500)
            .delay(220*e)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset",0)
            .style("stroke-width",3)
          })
        })


    });

/*
var albersProjection = d3.geoAlbers()
    .scale( 190000 )
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate( [width/2,height/2] );

// Create GeoPath function that uses built-in D3 functionality to turn
// lat/lon coordinates into screen coordinates
var geoPath = d3.geoPath()
    .projection( albersProjection );

// Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
g.selectAll( "path" )
    .data(neighborhoods_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ccc" )
    .attr( "stroke", "#333")
    .attr( "d", geoPath );

    */
