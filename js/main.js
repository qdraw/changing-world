// main.js


var width = 960,
	height = 500,
	projection = d3.geo.mercator();
	projection.center([156,8]);

	path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("aside").append("svg")
	.attr("width", width)
	.attr("height", height);
var scaleCijfer = 3;
// var axes = svg.append("g").attr("id", "axes"),
// 	xAxis = axes.append("line").attr("y2", height),
// 	yAxis = axes.append("line").attr("x2", width);


function loadData(){
d3.json("/data/europe.geo.json", function(error, json) {
	window["my_Data"] = json.features;
	//console.log(my_Data)
//	console.log(my_Data)
/*	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr('class', "l")
		.attr("id", function(d) {
			return d.properties.name; 
		})
		 .attr('transform', function(d){
		 	//alert(idGroot)
		 	if(idGroot == d["properties"]["name"]) {
		 		return "scale(10)";
		 	} else {
		 		return "scale(2)";
		 	}
		 });*/
	//redraw();
});
}
loadData();
function drawData(idGroot){

	svg.selectAll("path")
		.data(window["my_Data"])
		.enter()
		.append("path")
		.attr("d", path)
		.attr('class', "l")
		.attr("id", function(d) {
			return d.properties.name; 
		})
		 .attr('transform', function(d){
		 	//alert(idGroot)
		 	if(idGroot == d["properties"]["name"]) {
		 		var posX = getPositionX(document.getElementById(d["properties"]["name"]));
				var posY = getPositionY(document.getElementById(d["properties"]["name"]));
				var newX = (posX - parseInt(posX/scaleCijfer))/2;
				var newY = (posY - parseInt(posY/scaleCijfer))/2;

				console.log("posX=" + posX);
				console.log("posY=" + posY);
				console.log("newX=" + newX);
				console.log("newY=" + newY);
		 		return "scale(" + scaleCijfer + ") translate(-" + newX + ",-" + newY + ")";
		 		//return "scale(" + scaleCijfer + ")";

		 	} else {
		 		return "scale(2)";
		 	}
		 });

	//console.log("please "+ d3.select("#NL").attr("X"));	 
}
setTimeout("drawData('CH')",2000);
//function redraw() {
	// if (d3.event) {
	// 	projection
	// 		.translate(d3.event.translate)
	// 		.scale(d3.event.scale);
	// }
	//svg.selectAll("path").attr("d", path);
	//var t = projection.translate();
//}

function animate() {
	//loadData("NL");
	/*
	d3.select("body svg")
		.selectAll("path")
		.attr('class', "q")
	    .transition()
		.attr("transform", function(d) { 
			//if (d["properties"]["name"] == "DE" || d["properties"]["name"] == "NL") {
			if (d["properties"]["name"] == "DE") {
				posX = getPositionX(document.getElementById(d["properties"]["name"]));
				posY = getPositionY(document.getElementById(d["properties"]["name"]));
				console.log("posX=" +posX)
				console.log("posY=" +posY)
				//var obj = document.getElementById(d["properties"]["name"]);
				
				//d3.select(this)
				//.attr("transform", "scale(10)");
				//var scale = 3;
				return "scale(4)";

				//return "translate(-" + parseInt(posX-(posX/scale)) + ",-	" + Number(posY-(posY/scale)) + ") scale(" + scale + ")";
			}
			else {

				return "scale(2);"
				//return "translate(-" + 500 + ",100) scale(2)";
			}

		});*/
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
