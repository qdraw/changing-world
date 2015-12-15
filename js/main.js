// main.js


var width = 960,
	height = 500,
	projection = d3.geo.mercator();
	projection.center([156,8]);

	path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("aside").append("svg")
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
		.attr("id", function(d) {
			if (d.properties.name == "IS") {
				var object = document.getElementById(d["properties"]["name"]);
			}
			return d.properties.name; 
		})
		.attr('transform', "scale(2)");
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
				
				posX = getPositionX(document.getElementById(d["properties"]["name"]));
				posY = getPositionY(document.getElementById(d["properties"]["name"]));
				var scale = 3;

				return "translate(-" + Number(posX-(posX/scale)) + ",-" + Number(posY-(posY/scale)) + ") scale(" + scale + ")";
			}
			else {
				// return "translate(-" + 500 + ",100) scale(2)";
			}

		});
}



function getPositionX (id) {
	svgId = id.getAttribute('d');
	svgArray = svgId.match(/([0-9]*(\..[0-9]))/ig);	
	return svgArray[0];
}

function getPositionY (id) {
	svgId = id.getAttribute('d');
	svgArray = svgId.match(/([0-9]*(\..[0-9]))/ig);	
	return svgArray[1];
}
