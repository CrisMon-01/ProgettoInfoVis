//const 
const dims = { height: 2300, width: 900 };
const margin = { heightmargin: 10, widthmargin:100 };

//select body
const body = d3.select("body");

//add svg to show
const svg = body.append("svg")
    .attr("style", "background-color:#BEBEBE")
    .attr("id", "ext")
    .attr("width", dims.width)
    .attr("height", dims.height)
    .append("svg")
    .attr("id","int")
    .attr("width", (dims.width-margin.heightmargin))
    .attr("height", (dims.height-margin.widthmargin));

//check read json async uso callback
d3.json('../dati/datimultivar.json').then( data => { 

    const y = d3.scaleBand()
        .domain(data.map( datapoint => datapoint.numero ))
        .range([0,(dims.height-margin.heightmargin)]) 

    const shapes = svg.selectAll('svg').data(data);

    const groups = shapes.enter().append('g');

    // body
    groups.append('rect')
        .attr("x", 50)
        .attr("y",  d => ( y(d.numero) + 50 ) )
        .attr("width", 50)
        .attr("height", 60)
        .attr('fill','white');

    //front wing
    groups.append('rect')
        .attr('x',55)
        .attr('y',  d => ( y(d.numero) + 15 ))
        .attr('width', 40)
        .attr('height', 15)
        .attr('fill', 'black');

    // muzzle
    groups.append('rect')
        .attr('x', 67)
        .attr('y',  d => ( y(d.numero) + 30 ))
        .attr('width', 15)
        .attr('height',20)
        .attr('fill','grey');

    // wheel up sn
    groups.append("rect")
    .attr("x", 30)
    .attr("y",  d => ( y(d.numero) + 50 ) ) 
    .attr("width", 15)
    .attr("height", 15)
    .attr('fill','grey');

    // wheel up dx
    groups.append("rect")
        .attr("x", 105)
        .attr("y",  d => ( y(d.numero) + 50 ) ) 
        .attr("width", 15)
        .attr("height", 15)
        .attr('fill','grey');

    // wheel down sn
    groups.append("rect")
        .attr("x", 30)
        .attr("y",  d => ( y(d.numero) + 95 )) 
        .attr("width", 15)
        .attr("height", 15)
        .attr('fill','grey');

    // wheel down dx
    groups.append("rect")
    .attr("x", 105)
    .attr("y",  d => ( y(d.numero) + 95 ) ) 
    .attr("width", 15)
    .attr("height", 15)
    .attr('fill','grey');

    // wheel arm sn down
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 102 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 102 ))
        .attr('stroke','black')
        .attr('stroke-width',5);

    // wheel arm sn up
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 57 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 57 ))
        .attr('stroke','black')
        .attr('stroke-width',5);

    // wheel arm dx down
    groups.append('line')
    .attr('x1',100)
    .attr('y1', d => ( y(d.numero) + 102 ))
    .attr('x2',105)
    .attr('y2', d => ( y(d.numero) + 102 ))
    .attr('stroke','black')
    .attr('stroke-width',5);

    // wheel arm dx up
    groups.append('line')
    .attr('x1',100)
    .attr('y1', d => ( y(d.numero) + 57 ))
    .attr('x2',105)
    .attr('y2', d => ( y(d.numero) + 57 ))
    .attr('stroke','black')
    .attr('stroke-width',5);

});

// var scale = d3.linearScale();
// scale.domain([0, d3.max(data, d => parseInt(d.))]);
// scale.rande([10, dims.width]);

// //legend setup
// const legendGroup = svgext.append('g')
//   .attr('transform', `translate(${dims.width + 40}, 10)`)

// const legend = d3.legendColor()
//   .shape('path', d3.symbol().type(d3.symbolCircle)())
//   .shapePadding(10)
//   .scale(colour)