// main.js


var width = 960,
	height = 500,
	projection = d3.geo.mercator(),
	path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.call(d3.behavior.zoom()
		.translate(projection.translate())
		.scale(projection.scale())
		.on("zoom", redraw));

// var axes = svg.append("g").attr("id", "axes"),
// 	xAxis = axes.append("line").attr("y2", height),
// 	yAxis = axes.append("line").attr("x2", width);

d3.json("/data/europe.geo.json", function(error, json) {
	svg.selectAll("path")
		.data(json.features)
	.enter()
		.append("path")
		.attr("d", path)
		.attr('class', "l")
		.attr("id", function(d) { return d.properties.name; });
	redraw();
});



function redraw() {
	if (d3.event) {
		projection
			.translate(d3.event.translate)
			.scale(d3.event.scale);
	}
	svg.selectAll("path").attr("d", path);
	var t = projection.translate();
		// xAxis.attr("x1", t[0]).attr("x2", t[0]);
		// yAxis.attr("y1", t[1]).attr("y2", t[1]);
}

function animate () {
	d3.select("body svg")
		.selectAll("path")
		.attr('class', "q")
	    // .attr("transform", "translate(" + 10 + ")")
		.attr("d", function(d) { 

				// console.log(document.querySelector("svg #" + d["properties"]["name"]).d); 

			});


		// ((.)[0-9]*(\..[0-9]*))


	// d3.select("svg").selectAll("g")
	// 	.attr("class", function(d) { return d.properties.name; });


}