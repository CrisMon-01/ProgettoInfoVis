//const 
const dims = { height: 900, width: 900 };
const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5)};

//select body
const body = d3.select("body");

//add svg to show
const svg = body.append("svg")
    .attr("style", "background-color:#d2d2cf")
    .attr("width", dims.width)
    .attr("height", dims.height);

//check read json async uso callback
d3.json('../dati/datimultivar.json').then( data => { 
    console.log(data); //OK
    // console.log(data.numero) //KO
    
    const y = d3.scaleBand()
        .domain(data.map( item => item.numero ))
        .range([0,dims.height])  
    // console.log(y("99")) //OK

    // svg.append('rect')  //OK

    // uso enter join e exit
    const rects = svg.selectAll("rect").data(data);

    // append rects enter selection al DOM
    rects.enter()   
        .append("rect")
            .attr("x", 10)
            .attr("y", d => ( y(d.numero) + 20 ) )    //OK
            .attr("width", 50)
            .attr("height", 50)
            .attr('fill','black');

});


// var scale = d3.linearScale();
// scale.domain([0, d3.max(data, d => parseInt(d.))]);
// scale.rande([10, dims.width]);

// legend setup
// const legendGroup = svg.append('g')
//   .attr('transform', `translate(${dims.width + 40}, 10)`)

// const legend = d3.legendColor()
//   .shape('path', d3.symbol().type(d3.symbolCircle)())
//   .shapePadding(10)
//   .scale(colour)