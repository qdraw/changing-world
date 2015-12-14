// main.js


var width = Number(window.innerWidth-50),
	height = 400,
	projection = d3.geo.mercator(),
	path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

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
		.attr('transform', "translate(-" + 500 + ",100) scale(2)")
		.attr("id", function(d) { return d.properties.name; });
	redraw();
});



function redraw() {
	// if (d3.event) {
	// 	projection
	// 		.translate(d3.event.translate)
	// 		.scale(d3.event.scale);
	// }
	svg.selectAll("path").attr("d", path);
	var t = projection.translate();
}

function animate () {
	d3.select("body svg")
		.selectAll("path")
		.attr('class', "q")
	    .transition()
		.attr("transform", function(d) { 
			if (d["properties"]["name"] == "DE" || d["properties"]["name"] == "NL") {
				return "translate(-" + 900 + ",0) scale(3)";
			}
			else {
				return "translate(-" + 500 + ",100) scale(2)";
			}

		});
}





