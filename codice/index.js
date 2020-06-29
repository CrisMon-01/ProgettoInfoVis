//const 
const dims = { height: 1100, width: 1300 , larghbody: 70, lungh: 60, larghwheel: 15 , lugnhwheel: 15 };
const margin = { heightmargin: 40, widthmargin:150 };

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

    const lungheach = d3.scaleLinear()
        .domain([d3.min(data,d => d.lunghezza),d3.max(data,d => d.lunghezza)])
        .range([15,35])

    const larghwheel1 = d3.scaleLinear()
        .domain([d3.min(data,d => d.dimensione_ruote),d3.max(data,d => d.dimensione_ruote)])
        .range([10,16])

    const spacebetweenwheel = d3.scaleLinear()
        .domain([0,d3.max(data,d => d.distanza_delle_ruote)])
        .range([0,50])

    const weight = d3.scaleLinear()
        .domain([d3.min(data,d => d.peso),d3.max(data,d => d.peso)])
        .range([70,75])

    const weightstroke = d3.scaleLinear()
        .domain([d3.min(data,d => d.peso),d3.max(data,d => d.peso)])
        .range([0,5])

    // shift on x by one field
    const shift_by_lunghezza = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.lunghezza)])    
        .range([0, dims.width-margin.widthmargin-50]);

    const shift_by_dimensione_ruote = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.dimensione_ruote) ])
        .range([0, dims.width-margin.widthmargin-50]);    

    const shift_by_distanza_delle_ruote = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.distanza_delle_ruote) ])
        .range([0, dims.width-margin.widthmargin-50]);

    const shift_by_peso = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.peso) ])
        .range([0, dims.width-margin.widthmargin-50]);

    const shapes = svg.selectAll('svg').data(data);

    const groups = shapes.enter().append('g')
        .attr('id', d => 'car'+d.numero )
            .on('mouseover', handleMouseOver);  

    // back wing
    groups.append('rect')
        .attr("x", 10)
        .attr("y",  d => ( y(d.numero) + 20 ) )
        .attr("width", d =>  lungheach(d.lunghezza) )
        .attr("height", 50 )
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','backwing');

    // connection back wing down
    groups.append('line')
        .attr('x1',d => (lungheach(d.lunghezza) + 10) )
        .attr('y1',d => ( y(d.numero) + 60 ))
        .attr('x2',d => (lungheach(d.lunghezza) + 20) )
        .attr('y2',d => ( y(d.numero) + 60 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('number', d => d.numero )
        .attr('id','connectionbackwingsn');

    // connection back wing up
    groups.append('line')
        .attr('x1',d => (lungheach(d.lunghezza) + 10) )
        .attr('y1',d => ( y(d.numero) + 30 ))
        .attr('x2',d => (lungheach(d.lunghezza) + 20) )
        .attr('y2',d => ( y(d.numero) + 30 ))
        .attr('stroke','black')
        .attr('stroke-width','2')
        .attr('number', d => d.numero )
        .attr('id','connectionbackwingsn'); 

    // wheel up sn
    groups.append("rect")
        .attr("x", d => (lungheach(d.lunghezza) + 20))
        .attr("y", d => ( y(d.numero) + 5 ) )
        .attr("width", d => ( larghwheel1(d.dimensione_ruote) ))
        .attr("height", dims.larghwheel )
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','ruotaupsn')
            .on('click', transitionByWheelDim.bind(this));

    // wheel down sn
    groups.append("rect")
        .attr("x", d => (lungheach(d.lunghezza) + 20))
        .attr("y", d => ( y(d.numero) + 50 + 5 + dims.larghwheel ) )
        .attr("width", d => ( larghwheel1(d.dimensione_ruote) ))
        .attr("height", dims.larghwheel )
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','ruotaupsn')
            .on('click', transitionByWheelDim.bind(this));

    // wheel up dx
    groups.append("rect")
        .attr("x", d => (lungheach(d.lunghezza)+spacebetweenwheel(d.distanza_delle_ruote) + 20))
        .attr("y", d => ( y(d.numero) + 5 ) )
        .attr("width", d => ( larghwheel1(d.dimensione_ruote) ))
        .attr("height", dims.larghwheel)
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','ruotaupsn')
            .on('click', transitionByDistanceWhell.bind(this));

    // wheel down dx
    groups.append("rect")
        .attr("x", d => (lungheach(d.lunghezza)+spacebetweenwheel(d.distanza_delle_ruote) + 20))
        .attr("y", d => ( y(d.numero) + 50 + 5 + dims.larghwheel ) )
        .attr("width", d => ( larghwheel1(d.dimensione_ruote) ))
        .attr("height", dims.larghwheel )
        .attr('fill','grey')
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )
        .attr('id','ruotaupsn')
            .on('click', transitionByDistanceWhell.bind(this));

    //muzzle
    groups.append('rect')
        .attr('x', d => (lungheach(d.lunghezza)+20+dims.larghbody))
        .attr('y',  d => ( y(d.numero) + 35 ))
        .attr('width', 25)
        .attr('height',20)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('number', d => d.numero )        
        .attr('id','muso');

    // body
    groups.append('rect')
        .attr("x", d => (lungheach(d.lunghezza) + 20))
        .attr("y",  d => ( y(d.numero) + 20 ) )
        .attr("width", d => weight(d.peso))
        .attr("height", 50)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', d=> weightstroke(d.peso) )
        .attr('number', d => d.numero )
        .attr('id','body')
            .on('click', transitionByWeight.bind(this));
            
    //front wing
    groups.append('rect')
        .attr('x',  d => (lungheach(d.lunghezza)+40+dims.larghbody) )
        .attr('y',  d => ( y(d.numero) + 20 ))
        .attr('width', d => (lungheach(d.lunghezza)/2+5 ))
        .attr('height', 50)
        .attr('fill', d => ( colour(d.numero) ))
        .attr('stroke','black')
        .attr('stroke-width', '1')
        .attr('id','frontwing')
        .attr('number', d => d.numero )
            .on('click', transitionByLength.bind(this));

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