var bodyselector = d3.select("body");

d3.json('../dati/datimultivar.json').then(data => {
    // console.log(data.datapoint["uno"]);
    console.log(data.datapoint.key);
});

var svgspace = bodyselector.append("svg")
    .attr("style", "background-color:#d2d2cf")
    .attr("width", 700)
    .attr("height", 500);
