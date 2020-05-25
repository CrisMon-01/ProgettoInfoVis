//const 
const dims = { height: 2300, width: 900 , larghbody: 50, lungh: 60, larghwheel: 15 , lugnhwheel: 15 };
const margin = { heightmargin: 10, widthmargin:150 };

//select body
const body = d3.select("body");

//add svg to show
const svg = body.append("svg")
    .attr("style", "background-color:#BEBEBE")
    .attr("id", "ext")
    .attr("width", dims.width)
    .attr("height", dims.height)

//check read json async uso callback
d3.json('../dati/datimultivar.json').then( data => { 

    // setup y coordinate for each car
    const y = d3.scaleBand()
        .domain(data.map( datapoint => datapoint.numero ))
        .range([0,(dims.height-margin.heightmargin)]) 

    // color setup for each car 
    const colour = d3.scaleOrdinal(d3["schemeSet3"])
        .domain(data.map( datapoint => datapoint.numero ))

    // shift on x by one field
    const shift_by_lunghezza = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.lunghezza)])    
        .range([0, dims.width-margin.widthmargin]);

    const shift_by_dimensione_ruote = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.dimensione_ruote) ])
        .range([0, dims.width-margin.widthmargin]);    

    const shift_by_distanza_delle_ruote = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.distanza_delle_ruote) ])
        .range([0, dims.width-margin.widthmargin]);

    const shift_by_peso = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.peso) ])
        .range([0, dims.width-margin.widthmargin]);

    const shapes = svg.selectAll('svg').data(data);

    const groups = shapes.enter().append('g')
        .attr('id', d => 'car'+d.numero )
            .on('mouseover', handleMouseOver);    

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
        .attr('number', d => d.numero )
            .on('click', transitionByLength.bind(this));
 
    //muzzle
    groups.append('rect')
        .attr('x', 67)
        .attr('y',  d => ( y(d.numero) + 30 ))
        .attr('width', 15)
        .attr('height',20)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )        
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
        .attr('number', d => d.numero )
        .attr('id','body')
            .on('click', transitionByWeight.bind(this));

    // back wing
    groups.append('rect')
        .attr("x", 50)
        .attr("y",  d => ( y(d.numero) + 120 ) )
        .attr("width", dims.larghbody)
        .attr("height", 15)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','backwing');

    // connection back wing sn
    groups.append('line')
        .attr('x1',51)
        .attr('y1', d => ( y(d.numero) + 110 ))
        .attr('x2',51)
        .attr('y2', d => ( y(d.numero) + 120 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('number', d => d.numero )
        .attr('id','connectionbackwingsn');

    // connection back wing dx
    groups.append('line')
        .attr('x1',99)
        .attr('y1', d => ( y(d.numero) + 110 ))
        .attr('x2',99)
        .attr('y2', d => ( y(d.numero) + 120 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('number', d => d.numero )
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
        .attr('number', d => d.numero )
        .attr('id','ruotaupsn')
            .on('click', transitionByDistanceWhell.bind(this));

    // wheel up dx
    groups.append("rect")
        .attr("x", 105)
        .attr("y",  d => ( y(d.numero) + 50 ) ) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
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
        .attr('number', d => d.numero )
        .attr('id','ruotadownsn')
            .on('click', transitionByWheelDim.bind(this));

    // wheel down dx
    groups.append("rect")
        .attr("x", 105)
        .attr("y",  d => ( y(d.numero) + 95 ) ) 
        .attr("width", dims.larghwheel)
        .attr("height", dims.lugnhwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','ruotadowndx');

    // wheel arm sn down
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 102 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 102 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('number', d => d.numero )
        .attr('id','bracciodownsn');

    // wheel arm sn up
    groups.append('line')
        .attr('x1',45)
        .attr('y1', d => ( y(d.numero) + 57 ))
        .attr('x2',50)
        .attr('y2', d => ( y(d.numero) + 57 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('number', d => d.numero )
        .attr('id','braccioupsn');

    // wheel arm dx down
    groups.append('line')
        .attr('x1',100)
        .attr('y1', d => ( y(d.numero) + 102 ))
        .attr('x2',105)
        .attr('y2', d => ( y(d.numero) + 102 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('number', d => d.numero )
        .attr('id','bracciodowndx');

    // wheel arm dx up
    groups.append('line')
        .attr('x1',100)
        .attr('y1', d => ( y(d.numero) + 57 ))
        .attr('x2',105)
        .attr('y2', d => ( y(d.numero) + 57 ))
        .attr('stroke','black')
        .attr('stroke-width',5)
        .attr('number', d => d.numero )
        .attr('id','braccioupdx');

    function transitionByLength(data) {
        d3.json('../dati/datimultivar.json').then( data => { 
        for (i in data){
            body.selectAll('#car'+data[i].numero)
                .transition().duration(400)
                 .attr('transform', 'translate('+shift_by_lunghezza(data[i].lunghezza)+',0)');  //return (data.distanza_delle_ruote)
        }
        });
    }

    function transitionByWheelDim(data) {
        d3.json('../dati/datimultivar.json').then( data => { 
        for (i in data){
            body.selectAll('#car'+data[i].numero)
                .transition().duration(400)
                 .attr('transform', 'translate('+shift_by_dimensione_ruote(data[i].dimensione_ruote)+',0)');  //return (data.distanza_delle_ruote)
        }
        });
    }

    function transitionByDistanceWhell(data) {
        d3.json('../dati/datimultivar.json').then( data => { 
        for (i in data){
            body.selectAll('#car'+data[i].numero)
                .transition().duration(400)
                 .attr('transform', 'translate('+shift_by_distanza_delle_ruote(data[i].distanza_delle_ruote)+',0)');  //return (data.distanza_delle_ruote)
        }
        });
    }


    function transitionByWeight(data) {
        d3.json('../dati/datimultivar.json').then( data => { 
        for (i in data){
            body.selectAll('#car'+data[i].numero)
                .transition().duration(400)
                 .attr('transform', 'translate('+shift_by_peso(data[i].peso)+',0)');  //return (data.distanza_delle_ruote)
        }
        });
    }
    
});

//event handler
const handleMouseOver = (d, i, n) => {
    console.log(d3.select(n[i]))
}