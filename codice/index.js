//const 
const dims = { height: 2000, width: 900 };
const margin = { heightmargin: 100, widthmargin:100 };

//select body
const body = d3.select("body");

//add svg to show
const svgext = body.append("svg")
    .attr("style", "background-color:#d2d2cf")
    .attr("width", dims.width)
    .attr("height", dims.height);

const svgint = svgext.append("svg")
    .attr("width", (dims.width-margin.heightmargin))
    .attr("height", (dims.height-margin.widthmargin));


//check read json async uso callback
d3.json('../dati/datimultivar.json').then( data => { 
    console.log(data); //OK
    // console.log(data.numero) //KO
    
    const y = d3.scaleBand()
        .domain(data.map( item => item.numero ))
        .range([0,dims.height])  
    // console.log(y("99")) //OK

    // uso enter join e exit
    const shapes = svgint.selectAll("rect").data(data);

    // append rects enter selection al DOM
    //alettone ant
    shapes.enter()  
        .append("rect")
            .attr("x", 55 )
            .attr("y", d => ( y(d.numero) + 10 ) )    //OK
            .attr("width", 40)
            .attr("height", 20)
            .attr('fill','black');
    //muso
    // shapes.enter()
    //     .append('path')
    //         .attr("d", d3.svg.symbol().type("triangle-up").size(10))
    //         .attr("transform", function(d) { return "translate(" + 10 + "," + 10 + ")"; })
    //         .style("fill", "red");
    //corpo
    shapes.enter()
        .append("rect")
            .attr("x", 50)
            .attr("y", d => ( y(d.numero) + 50 ) )    
            .attr("width", 50)
            .attr("height", 50)
            .attr('fill','white');
    //ruota up sx
    shapes.enter()
        .append("rect")
            .attr("x", 35)
            .attr("y", d => ( y(d.numero) + 50 ) ) 
            .attr("width", 15)
            .attr("height", 15)
            .attr('fill','grey');
    //ruota up dx
    shapes.enter()
        .append("rect")
            .attr("x", 100)
            .attr("y", d => ( y(d.numero) + 50 ) ) 
            .attr("width", 15)
            .attr("height", 15)
            .attr('fill','grey');
    //ruota down sx
    shapes.enter()
        .append("rect")
            .attr("x", 35)
            .attr("y", d => ( y(d.numero) + 85 ) ) 
            .attr("width", 15)
            .attr("height", 15)
            .attr('fill','grey');
    // ruota down dx
    shapes.enter()
        .append("rect")
            .attr("x", 100)
            .attr("y", d => ( y(d.numero) + 85 ) ) 
            .attr("width", 15)
            .attr("height", 15)
            .attr('fill','grey');

});


// var scale = d3.linearScale();
// scale.domain([0, d3.max(data, d => parseInt(d.))]);
// scale.rande([10, dims.width]);

// legend setup
const legendGroup = svgext.append('g')
  .attr('transform', `translate(${dims.width + 40}, 10)`)

const legend = d3.legendColor()
  .shape('path', d3.symbol().type(d3.symbolCircle)())
  .shapePadding(10)
  .scale(colour)