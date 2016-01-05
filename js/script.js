
/*
	STOP READING CODE, GIVE ME A+ ;)


	                      ,                                  
	                     ,:                                  
	      ,:==++=~,      :~                                  
	    ,=+=:::::+?~     ~=                 ,,                  
	   ~+~:~==++=,,~,    ~=                :==:   ,=~,       ,   
	  ==,~      :~,      ~~       ~??~     :~ =:   :I=      ,,        
	 ~~=,        ==,    ,~II    :?$+=?=:      ?,   ++:     ;;  
	,==~~      ,,,   ,?Z$7ZI:  ,I$,  ~?:   +$$=,  ,+?,+= ,:;  
	 =+:     ,,,:  ,7Z: ,~=,   =I?~,+7   ,=$~,=I~   +I~77 ~:,  
	,=~:,   :==~::  ?I~  ,~=,  ,?$Z7$?:  +7:  ~I~   +$I==I=:   
	,=~:~:,:~=++,  ,I?:  ,=?:  :I7+~~:  ,?7:,~++,   =$I :I+,   
	 ,==::::::+?=~  ~II,,=II,  ,??: :~~  +?=++I$+   ~7? ,++:   
	   :~::~:, :+?+:  ?II+~:  ,:+~   ,~~  ==~::::,  :+,  :=:   
	            ,=II+:        ,:,    ,~=:                    
	              :=~==                ~=,                   
	                  ,                ,::                            
*/		



//loops

	// Object.keys(data.datatable).forEach(function(key) {
	// 	console.log([key])
	// });

	// for (var i = 0; i < data.datatable.elements.length; i++) {
		
	// 	console.log(data.datatable.elements[i])
	// };


//d6d6d6
var style = {
    "clickable": false,
    "color": "#00D",
    "fillColor": "#27233e",
    "weight": 0,
    "opacity": 1,
    "fillOpacity": 1
};

var hues = [
	'hsl(120,50%,50%)', // green green
	'hsl(120,60%,60%)',
	'hsl(120,70%,70%)',
	'hsl(120,80%,80%)',
	'hsl(120,95%,95%)', // light groen
	'hsl(0,95%,95%)',
	'hsl(0,80%,80%)', // light rood
	'hsl(0,70%,70%)',
	'hsl(0,60%,60%)',
	'hsl(0,50%,50%)', //donker rood
	];
	// 'hsl(120,20%,70%)', // light groen
	// 'hsl(0,20%,70%)',


var fHues = [
	'hsl(220,50%,50%)', // green green
	'hsl(220,60%,60%)',
	'hsl(220,70%,70%)',
	'hsl(220,80%,80%)',
	'hsl(220,95%,95%)', // light groen
	'hsl(330,95%,95%)', 
	'hsl(330,80%,80%)', // light rood
	'hsl(330,70%,70%)',
	'hsl(330,60%,60%)',
	'hsl(330,50%,50%)', //donker rood
	];


var geojsonURL = 'data/vectiles-water-areas/{z}/{x}/{y}.json';
var geojsonTileLayer = new L.TileLayer.GeoJSON(geojsonURL, 
	{
        clipTiles: true,
        unique: function (feature) {
            return feature.id; 
        }
    }, 
    {
        style: style,
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                var popupString = '<div class="popup">';
                for (var k in feature.properties) {
                    var v = feature.properties[k];
                    popupString += k + ': ' + v + '<br />';
                }
                popupString += '</div>';
                layer.bindPopup(popupString);
            }
        }
    }
);

var map = L.map('map',{ 
	zoomControl:false,
	minZoom: 3,
	maxZoom: 7 
	})
	.addLayer(geojsonTileLayer)
	.setView([55, 0], 4);

var popup = new L.Popup({ autoPan: false });


// Create a layer of state features, and when it's done
// loading, run loadData
var euLayer = L.mapbox.featureLayer()
	.loadURL('data/europe.geo.json')
	.addTo(map)
	.on('ready', loadData);

window.subject = [];
window.subjectui = [];
window.subjectintro = [];
window.ishightolow = [];
window.sidebarheader = [];
window.helpdata = [];
window.introdata = [];
window.countrydescription = {};

function loadData () {
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1v9Dsd5LwlLrSd5jzO7_QfTECU3TEtnlK44omvdYCJ8E/pubhtml';
	Tabletop.init( { key: public_spreadsheet_url,
	                callback: processData,
	                simpleSheet: false } );
}

function processData (data, tabletop) {
	Object.keys(data.datatableoptions.elements).forEach(function(key) {
		window.subject.push(data.datatableoptions.elements[key].subject);
		window.subjectui.push(data.datatableoptions.elements[key].subjectui);
		window.subjectintro.push(data.datatableoptions.elements[key].subjectintro);
		window.ishightolow.push(data.datatableoptions.elements[key].ishightolow);
		window.sidebarheader.push(data.datatableoptions.elements[key].sidebarheader);
		window.introdata.push(data.datatableoptions.elements[key].introdata);
		window.helpdata.push(data.datatableoptions.elements[key].helpdata);
	});

	window.countrydescription = data.countrydescription.elements;

	for (var i = 0; i < window.subject.length; i++) {
		window.ranges[window.subject[i]] = { min: Infinity, max: -Infinity };
	}

	joinData(data.datatable.elements, euLayer);

}


window.ranges = {};


function joinData(data, layer) {
	// First, get the Europian state GeoJSON data for reference.

	var euGeoJSON = euLayer.getGeoJSON(),
		byState = {};

	// Rearrange it so that instead of being a big array,
	// it's an object that is indexed by the state name,
	// that we'll use to join on.
	for (var i = 0; i < euGeoJSON.features.length; i++) {
		
		byState[euGeoJSON.features[i].properties.name] =
			euGeoJSON.features[i];

	}






	for (var j = 0; j < window.subject.length; j++) {

		for (i = 0; i < data.length; i++) {

			data[i][window.subject[j]] = data[i][window.subject[j]].replace(/,/i, "."); 
			data[i][window.subject[j]] = Number(data[i][window.subject[j]]);
			var jName = window.subject[j];
			var value = data[i][window.subject[j]];

			window.ranges[jName].min = Math.min(value, window.ranges[jName].min);
			window.ranges[jName].max = Math.max(value, window.ranges[jName].max);

		}	
	}

	for (i = 0; i < data.length; i++) {

		// Match the GeoJSON data (byState) with the tabular data
		// (data), replacing the GeoJSON feature properties
		// with the full data.
		try {
			byState[data[i].name].properties = data[i];
		}
		catch(e){}

	}


	// Create a new GeoJSON array of features and set it
	// as the new usLayer content.
	var newFeatures = [];
	for (i in byState) {
		newFeatures.push(byState[i]);
	}
	euLayer.setGeoJSON(newFeatures);


	setVariable([]);

	buildMenu();
	buildSidebarHeader();
	

}



// Excuse the short function name: this is not setting a JavaScript
// variable, but rather the variable by which the map is colored.
// The input is a string 'name', which specifies which column
// of the imported JSON file is used to color the map.


window.combinedScore = {};

function setVariable(selectedVar) {


	if (selectedVar.length > 0) {
		console.log("selectedVar");
		console.log(selectedVar);

		var combinedScore = {};

		euLayer.eachLayer(function(layer) {
			
			
			for (var i = 0; i < selectedVar.length; i++) {


				if (combinedScore[layer.feature.properties.name] !== undefined) {
					combinedScore[layer.feature.properties.name] += layer.feature.properties[selectedVar[i]];
				}
				else {
					combinedScore[layer.feature.properties.name] = layer.feature.properties[selectedVar[i]];
				}

				// console.log()
				// console.log(selectedVar[i]);
			}
			
			if (selectedVar.length !== 0) {
				combinedScore[layer.feature.properties.name] = Number(combinedScore[layer.feature.properties.name] / selectedVar.length);
				window.combinedScore = combinedScore;
			}


			var colorindex = hues.length + (Math.round(combinedScore[layer.feature.properties.name]) * -1);


			layer.setStyle({
				fillColor: hues[colorindex],
				fillOpacity: 0.8,
				color: '#fff',
				weight: 0.25
			});

			// 	// // YEAH, eventListeners
			layer.addEventListener("mouseover", function(e){ var those = this; mousemove(e,those); }, false);
			layer.addEventListener("click", function(e){ var those = this; filterCountry(e,those); }, false);


		});

	}//e/fi
	else {


		document.querySelector("#introdata").style.zIndex = "1";
		document.querySelector("#introdata").addEventListener("click", hideLightbox, false);


		document.querySelector("#introdata .container").innerHTML = "<div class='close'></div>";

		for (var i = 0; i <  window.introdata.length; i++) {

			if (i === 0) {
				document.querySelector("#introdata .container").innerHTML += "<h2>" + window.introdata[i] + "</h2>";
			}
			if (window.helpdata[i] !== ""  && i !== 0) {
				document.querySelector("#introdata .container").innerHTML += "<p>" + window.introdata[i] + "</p>";
			} 
		}


		// document.querySelector("#introdata").style.zIndex = "-1";

		euLayer.eachLayer(function(layer) {
			layer.setStyle({
				fillColor: "#d6d6d6",
				fillOpacity: 1,
				color: '#fff',
				weight: 0.25
			});
		});

		console.log("welcome");
	}


	legenda(hues);
	hidePreloader();


	// bestCountry (name);
	// setActiveMenu (name);
	// displayCurrentType (name);
}



function hidePreloader () {
	document.querySelector(".preloader").style.zIndex = "-1";
}




function buildMenu () {
	
	document.querySelector("#sidebar #menu").innerHTML = "";


	// #sidebar #menu
	for (var i = 0; i <  window.subject.length; i++) {
		document.querySelector("#sidebar #menu").innerHTML += "<label id='label_" + window.subject[i] +"'><input type='checkbox' id='" + window.subject[i] +"' name='checkbox' value='" + window.subject[i] +"'><span class='checkbox'></span><span class='txt'>" + window.subjectui[i] + "</span><span class='i' style='background-image: url(images/" + window.subject[i] + ".svg)'></span></label>";
	}

	for (i = 0; i <  window.subject.length; i++) {
		document.querySelector('#sidebar #menu #' + window.subject[i] ).addEventListener("click", function(e){ var those = this; readVariable(those); }, false);
		// line 305, col 151, Don't make functions within a loop.
	}

	document.querySelector('#sidebar .help').addEventListener("click", function(e){ var those = this; help(those); }, false);

}



function buildSidebarHeader () {
	for (var i = 0; i <  window.sidebarheader.length; i++) {
		if (i === 0) {
			document.querySelector("#sidebar #header").innerHTML = "<h2>" + window.sidebarheader[i] + "</h2>";
		}
		else if (window.sidebarheader[i] !== "") {
			document.querySelector("#sidebar #header").innerHTML += "<p>" + window.sidebarheader[i] + "</p>";
		} 
	}
}

var selectedVar = [];

function readVariable (those) {
	// var y = (x == 2 ? "yes" : "no");
	those.state = (those.state === true ? false : true);
	
	isFilterCountryActive = false;

	if (those.state) {
		selectedVar.push(those.id);
	}
	else {
		var index = selectedVar.indexOf(those.id);
		// delete storeActiveVar[index];
		selectedVar.splice( index, 1 );
	}

	for (var i = 0; i < window.subject.length; i++) {
		document.querySelector("#menu #label_" + window.subject[i] + " .checkbox").style.backgroundImage = "none";
	}

	for (var i = 0; i < selectedVar.length; i++) {
		document.querySelector("#menu #label_" + selectedVar[i] + " .checkbox").style.backgroundImage = "url('images/checkbox.svg')";
	}
	
	console.log(selectedVar);

	setVariable(selectedVar);
}


function legenda (hues) {

	// reset html
	document.querySelector("#sidebar #legenda").innerHTML = " <a class='close' onclick='toggleHamburger()'></a>		<span class='pointer'></span>";


	for (var i = 0; i < hues.length; i++) {
		// console.log(hues[i])
		document.querySelector("#sidebar #legenda").innerHTML +=  "  <div style='background-color:" + hues[i] + "'></div>";
	}

}



function mousemove(e,those) {
	// https://www.mapbox.com/mapbox.js/example/v1.0.0/choropleth/



	if (selectedVar.length > 0) {


		if (!isFilterCountryActive) {

			var top = mmap(window.combinedScore[e.target.feature.properties.name],0,10,0,100);
			top = (100 + (top * -1) + 0 /*fix*/ );

		} 
		else{
			// // isFilterCountryActive = true;
			
			if (window.combinedScore[e.target.feature.properties.name] > window.combinedScore[window.filterCountryName]) {
				// Countries who perform better! :D :D :D

				var top = mmap(window.combinedScore[e.target.feature.properties.name],window.combinedScore[window.filterCountryName],10,0,50);
				top = 50 - top;
				// console.log("higher" + e.target.feature.properties.name + top + " `" + window.combinedScore[window.filterCountryName]);

			}
			else {

				var top = mmap(window.combinedScore[e.target.feature.properties.name],0,window.combinedScore[window.filterCountryName],0,50);
				top = 100 - top;
				// console.log("lower" + e.target.feature.properties.name + top + " `" + window.combinedScore[window.filterCountryName]);

			}
			// euLayer.eachLayer(function(layer) {
			// 	if (window.combinedScore[layer.feature.properties.name] > window.combinedScore[window.filterCountryName]) {
				
			// 	}
			// });
			


		}

		if (top < 3) {
			top = 3;
		}
		if (top > 92) {
			top = 92;
		}

		if (document.querySelectorAll("#sidebar #legenda .pointer").length > 0) {
			document.querySelector("#sidebar #legenda .pointer").style.top = "calc( " + top + "vh" + " - 20px )";
			
			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;

			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "score " + score;
			 // filterReplace (variablesScale[name],content,countrynames[e.target.feature.properties["name"]]) 
		 	document.querySelector("#sidebar #legenda .pointer").innerHTML = content;
		}
	}

}

// Yeah here we go again http://eelslap.com/
function mmap(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}





function help () {

	
	document.querySelector("#lightbox").style.zIndex = "1";
	document.querySelector("#lightbox").addEventListener("click", hideLightbox, false);


	document.querySelector("#lightbox .container").innerHTML = "<div class='close'></div>";

	for (var i = 0; i <  window.helpdata.length; i++) {

		if (i === 0) {
			document.querySelector("#lightbox .container").innerHTML += "<h2>" + window.helpdata[i] + "</h2>";
		}
		if (window.helpdata[i] !== ""  && i !== 0) {
			document.querySelector("#lightbox .container").innerHTML += "<p>" + window.helpdata[i] + "</p>";
		} 
	}


	// add facepalm css
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = "cssId";
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/facepalm.css';
    link.media = 'all';
    head.appendChild(link);
    // end facepalm css

}

function hideLightbox () {
	document.querySelector("#lightbox").style.zIndex = "-1";
	document.querySelector("#introdata").style.zIndex = "-1";
}




var isFilterCountryActive = false;
function filterCountry(e,those) {
	isFilterCountryActive = true;

	var countryname = e.target.feature.properties.name;
	window.filterCountryName = countryname;

	// var combinedScoreArrayOrderByNames = Object.keys(window.combinedScore).sort(function(a,b){return window.combinedScore[a]-window.combinedScore[b]})

	// function sortObject(obj) {
	//     var arr = [];
	//     for (var prop in obj) {
	//         if (obj.hasOwnProperty(prop)) {
	//             arr.push({
	//                 'key': prop,
	//                 'value': obj[prop]
	//             });
	//         }
	//     }
	//     arr.sort(function(a, b) { return a.value - b.value; });
	//     //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
	//     return arr; // returns array
	// }
	// var sortCombinedScore = sortObject(window.combinedScore);
	// console.log(sortCombinedScore);



	var color = "#DDD";
	var borderwidth = 0.5;
	var fillOpacity = 0.8;

	euLayer.eachLayer(function(layer) {

		if (window.combinedScore[layer.feature.properties.name] > window.combinedScore[countryname]) {
			// Countries who perform better! :D :D :D

			var cindex = mmap(window.combinedScore[layer.feature.properties.name],window.combinedScore[countryname],10,5,0);
			color = fHues[Math.floor(cindex)];
			borderwidth = 0.5;

			//mmap(this,min,max,outmin,outmax)


		}
		else if (window.combinedScore[layer.feature.properties.name] === window.combinedScore[countryname]){
			color = fHues[Math.round(fHues.length/2)];
			console.log(Math.round(fHues.length/2));
			borderwidth = 0.5;


			// The selected country
			if (layer.feature.properties["name"] === e.target.feature.properties["name"]) {
				 color = "white"; // blue // selected country
				 borderwidth = 2;
				 fillOpacity = 1;
			}
		}
		else {
			color = "red";
			var cindex = mmap(window.combinedScore[layer.feature.properties.name],0,window.combinedScore[countryname],9,5);
			color = fHues[Math.floor(cindex)];
			borderwidth = 0.5;

		}

		// And finaly arange all the colours from all countries
		layer.setStyle({
			fillColor: color,
			fillOpacity: fillOpacity,
			color: '#fff',
			weight: borderwidth
		});

	});

	legenda(fHues);
	selectedCountry(e);


}


function selectedCountry (e) {
	console.log(window.filterCountryName);


	// var content = [];
	// Object.keys(window.countrydescription).forEach(function(key) {
	// 	content.push(window.countrydescription[key][window.filterCountryName])
	// });

	document.querySelector("#sidebar #content").innerHTML = "<h2>" +  e.target.feature.properties.nl_name + "</h2>"



	console.log(window.subject);

	console.log(window.subjectintro);
	console.log(selectedVar);



	if (selectedVar.length === 1) {

		var index = window.subject.indexOf(selectedVar[0])

		console.log(window.subjectintro[index])


		content = content.replace(/\[LAND\]/ig, e.target.feature.properties.nl_name);
		content = content.replace(/\[SCORE\]/ig, window.combinedScore[e.target.feature.properties.name]);

		// for (var i = 0; i <  window.subject.length; i++) {
		// 	content = content.replace("/\[" SCORE"\]/ig", window.combinedScore[e.target.feature.properties.name]);
		// }


		document.querySelector("#sidebar #content").innerHTML += "<p>" + content + "</p>";

	}




	var link = "\"" + e.target.feature.properties.name + "\",\"" + e.target.feature.properties.nl_name + "\"";
	document.querySelector("#sidebar #content").innerHTML += "<a href='javascript:country(" + link + ")'>Lees meer..</a>";

}

function country (name,nl_name) {
	console.log("`! " + name + " " + nl_name);


	var content = [];
	Object.keys(window.countrydescription).forEach(function(key) {
		content.push(window.countrydescription[key][window.filterCountryName])
	});

	document.querySelector("#lightbox").style.zIndex = "1";
	document.querySelector("#lightbox").addEventListener("click", hideLightbox, false);


	document.querySelector("#lightbox .container").innerHTML = "<div class='close'></div>";

	for (var i = 0; i <  content.length; i++) {

		if (i === 0) {
			document.querySelector("#lightbox .container").innerHTML += "<h2>" + nl_name + "</h2>";
		}
		if (content[i] !== ""  && i !== 0) {
			document.querySelector("#lightbox .container").innerHTML += "<p>" + content[i] + "</p>";
		} 
	}


}




// function pageFail (e) {

// 	var para = document.createElement("div");
// 	para.id = "warning"
// 	var node = document.createTextNode(" ");
// 	para.appendChild(node);

// 	document.body.appendChild(para);
  	
//   	document.getElementById("warning").innerHTML = '<h2 style="color:black;">Sorry, maar met jouw versie van Internet Explorer kan mijn site niet samenwerken. Het handigste is dat je Firefox of Chrome installeerd. </h2><p style="color:black;"> Mocht u vragen hebben neem dan contact op met Dion van Velde via: ' + '&#100;'  + '&#105;' + '&#111;' + '&#110;' + '&#64;' + '&#113;' + '&#100;' + '&#114;' + '&#97;' + '&#119;' + '&#46;' + '&#110;' + '&#108;' + '</p> <a href="https://www.google.com/chrome/browser/desktop/index.html" class="button" style="color:white">Download Google Chrome</a> <a class="button" href="https://www.mozilla.org/nl/firefox/new/" style="color:white">Download Firefox</a>'   

// }//e/pageFail


// // for IE10 and lower == unsuported
// if(document.all && document.compatMode) {
// 	pageFail ("noie")
// }