//const 
const dims = { height: 2300, width: 900 , larghbody: 50, lungh: 60, larghwheel: 15 , lugnhwheel: 15 };
const margin = { heightmargin: 10, widthmargin:100 };

//select body
const body = d3.select("body");

//add svg to show
const svg = body.append("svg")
    .attr("style", "background-color:#BEBEBE")
    .attr("id", "ext")
    .attr("width", dims.width)
    .attr("height", dims.height)
    // .append("svg")
    // .attr("id","int")
    // .attr("width", (dims.width-margin.heightmargin))
    // .attr("height", (dims.height-margin.widthmargin));

//check read json async uso callback
d3.json('../dati/datimultivar.json').then( data => { 

    // setup y coordinate for each car
    const y = d3.scaleBand()
        .domain(data.map( datapoint => datapoint.numero ))
        .range([0,(dims.height-margin.heightmargin)]) 

    // color setup for each car 
    const colour = d3.scaleOrdinal(d3["schemeSet3"])
        .domain(data.map( datapoint => datapoint.numero ))

    const shapes = svg.selectAll('svg').data(data);

    const groups = shapes.enter().append('g');

    //front wing
    groups.append('rect')
        .attr('x',55)
        .attr('y',  d => ( y(d.numero) + 15 ))
        .attr('width', (dims.larghbody - 10))
        .attr('height', 15)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','frontwing')
            .on('click', transitionByLength.bind(this));

    // muzzle
    groups.append('rect')
        .attr('x', 67)
        .attr('y',  d => ( y(d.numero) + 30 ))
        .attr('width', 15)
        .attr('height',20)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','muso');

    // body
    groups.append('rect')
        .attr("x", 50)
        .attr("y",  d => ( y(d.numero) + 50 ) )
        .attr("width", dims.larghbody)
        .attr("height", 60)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','body');

    // back wing
    groups.append('rect')
        .attr("x", 50)
        .attr("y",  d => ( y(d.numero) + 120 ) )
        .attr("width", dims.larghbody)
        .attr("height", 15)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','backwing');

    // connection back wing sn
    groups.append('line')
        .attr('x1',51)
        .attr('y1', d => ( y(d.numero) + 110 ))
        .attr('x2',51)
        .attr('y2', d => ( y(d.numero) + 120 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('id','connectionbackwingsn');

    // connection back wing dx
    groups.append('line')
        .attr('x1',99)
        .attr('y1', d => ( y(d.numero) + 110 ))
        .attr('x2',99)
        .attr('y2', d => ( y(d.numero) + 120 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('id','connectionbackwingdx');        

    // wheel up sn
    groups.append("rect")
        .attr("x", 30)
        .attr("y",  d => ( y(d.numero) + 50 ) ) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','ruotaupsn');

    // wheel up dx
    groups.append("rect")
        .attr("x", 105)
        .attr("y",  d => ( y(d.numero) + 50 ) ) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','ruotaupdx');

    // wheel down sn
    groups.append("rect")
        .attr("x", 30)
        .attr("y",  d => ( y(d.numero) + 95 )) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','ruotadownsn');

    // wheel down dx
    groups.append("rect")
        .attr("x", 105)
        .attr("y",  d => ( y(d.numero) + 95 ) ) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','ruotadowndx');

    // wheel arm sn down
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 102 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 102 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('id','bracciodownsn');

    // wheel arm sn up
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 57 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 57 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('id','braccioupsn');

    // wheel arm dx down
    groups.append('line')
        .attr('x1',100)
        .attr('y1', d => ( y(d.numero) + 102 ))
        .attr('x2',105)
        .attr('y2', d => ( y(d.numero) + 102 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('id','bracciodowndx');

    // wheel arm dx up
    groups.append('line')
        .attr('x1',100)
        .attr('y1', d => ( y(d.numero) + 57 ))
        .attr('x2',105)
        .attr('y2', d => ( y(d.numero) + 57 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('id','braccioupdx');

    function transitionByLength () {
        d3.selectAll('g')
            .attr('transform', 'translate(100,0)')
    }

});
