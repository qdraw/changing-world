
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
    "fillColor": "rgb(18,19,20)",
    "weight": 0,
    "opacity": 1,
    "fillOpacity": 1
};

var hues = [
	'#0eb223', // green green
	'#26cb2a',
	'#5ade46',
	'#96f566',
	'#b9ff82', // light groen
	'#ff8383',
	'#f46767', // light rood
	'#dd4747',
	'#c92727',
	'#af1010', //donker rood
	];
	// 'hsl(120,20%,70%)', // light groen
	// 'hsl(0,20%,70%)',


var fHues = [
	'rgb(72,101,19)', // green green
	'rgb(102,144,27)',
	'rgb(133,187,35)',
	'rgb(160,218,55)',
	'rgb(193,227,100)', // light groen
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


var southWest = L.latLng(3.337953961416485, -118.47656249),
    northEast = L.latLng(81.17449100425956, 112.8515625),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map',{ 
	zoomControl:false,
    maxBounds: bounds,
	minZoom: 4,
	maxZoom: 5 
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
window.subjectintro_selectie2ofmeer = [];
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
		window.subjectintro_selectie2ofmeer.push(data.datatableoptions.elements[key].subjectintro_selectie2ofmeer);
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


	buildURLout = buildURL();
	if (buildURLout.length != 0) {
		selectedVar = buildURLout[0];
		if (buildURLout[1].length > 0) {
			console.log("~test")
			isFilterCountryActive = true;
			window.filterCountryName = buildURLout[1];
			directFilterCountry();
		}
	}	

	setVariable();
	// or [];

	buildMenu();
	buildSidebarHeader();
	

}



// Excuse the short function name: this is not setting a JavaScript
// variable, but rather the variable by which the map is colored.
// The input is a string 'name', which specifies which column
// of the imported JSON file is used to color the map.


window.combinedScore = {};

function setVariable() {


	if (selectedVar.length > 0) {

		if (document.querySelectorAll("#introdata").length > 0) {
			document.querySelector("#introdata").style.zIndex = "-1";
		}

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
				fillOpacity: 1,
				color: '#fff',
				weight: 0.25
			});

			// 	// // YEAH, eventListeners
			layer.addEventListener("mouseover", function(e){ var those = this; mousemove(e,those); }, false);
			layer.addEventListener("click", function(e){ filterCountry(e); }, false);


		});

	}//e/fi
	else {
		// Welcome screen
		
		// reset content screen
		if (document.querySelectorAll("#sidebar #content").length > 0) {
			document.querySelector("#sidebar #content").innerHTML = "";
		}


		if (document.querySelectorAll("#introdata").length > 0) {

			document.querySelector("#introdata").style.zIndex = "1";


			document.querySelector("#introdata .container").innerHTML = "<div class='close'></div>";

			for (var i = 0; i <  window.introdata.length; i++) {

				if (i === 0) {
					document.querySelector("#introdata .container").innerHTML += "<h2>" + window.introdata[i] + "</h2>";
				}
				if (window.helpdata[i] !== ""  && i !== 0) {
					document.querySelector("#introdata .container").innerHTML += "<p>" + window.introdata[i] + "</p>";
				} 
			}
		}


		euLayer.eachLayer(function(layer) {
			layer.setStyle({
				fillColor: "#d6d6d6",
				fillOpacity: 1,
				color: '#fff',
				weight: 0.25
			});
		});

	}

	// isFilterCountryActive ? "yes" : "no"
	isFilterCountryActive ? directFilterCountry() : legenda(hues)


	hidePreloader();
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

	if (selectedVar.length > 0) {
		for (var i = 0; i < selectedVar.length; i++) {
			readVariable(undefined);
		}
	}


	document.querySelector('#sidebar .help').addEventListener("click", function(e){ var those = this; help(those); }, false);
	document.querySelector('#sidebar .resetAll').addEventListener("click", function(e){ var those = this; resetAll(those); }, false);

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

function buildURL() {
	// #subject=gini_score,freedom_score&country=DE
	// #subject=gini_score,freedom_score

	if (location.hash.length > 0) {

		var urlsubject = [];
		var urlcountry = "";

		if (location.hash.search("&") > 0) {
			var hash = location.hash.split("&");
			for (var i = 0; i < hash.length; i++) {
				if (hash[i].search("#subject=") !== -1) {
					var urlsubject = hash[i].replace("#subject=","");
					urlsubject = urlsubject.split(",");
				}
				if (hash[i].search("country=") !== -1) {
					var urlcountry = hash[i].replace("country=","");

					// check if country exist
					var listOfAllCounties = [];
					Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
						listOfAllCounties.push(euLayer.getGeoJSON()[key].properties.name);
					});
					if (listOfAllCounties.indexOf(urlcountry) === -1) {
						urlcountry = "NL";
					}

				}
			}

		}
		else {

			if (location.hash.search("#subject=") !== -1) {
				var urlsubject = location.hash.replace("#subject=","");
				urlsubject = urlsubject.split(",");
			}

		}

		// controle; voor subject
		for (var i = 0; i < urlsubject.length; i++) {
			if (window.subject.indexOf(urlsubject[i]) === -1) {
				var index = urlsubject.indexOf(urlsubject[i]);
				urlsubject.splice( index, 1 );
			}
		}


		return [urlsubject,urlcountry];

	}
	else {
		return [];
	}

	// console.log(hash)
}


function constructURL() {

	var url = "#subject=";
	for (var i = 0; i < selectedVar.length; i++) {
		
		if (i === selectedVar.length-1) {
			url += selectedVar[i];
		}
		else {
			url += selectedVar[i] + ",";
		}
	}

	if (isFilterCountryActive) {
		url += "&country=" + window.filterCountryName;
	}


	if (selectedVar.length === 0) {
		url = "#";
	}

	var stateObj = { object: "~" };
	history.pushState(stateObj, "Qdraw", url);



}


var selectedVar = [];


function readVariable (those) {
	

	// var y = (x == 2 ? "yes" : "no");
	// those.state = (those.state === true ? false : true);
	
	// isFilterCountryActive = false;

	
	if (those !== undefined) {
		
		if ( selectedVar.indexOf(those.id) === -1 ) {
			console.log(those.id)
			selectedVar.push(those.id);
		}
		else {
			console.log(selectedVar.indexOf(those.id) + "~")

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
	}
	else {
		// direct input
		for (var i = 0; i < selectedVar.length; i++) {
			document.querySelector("#menu #label_" + selectedVar[i] + " .checkbox").style.backgroundImage = "url('images/checkbox.svg')";
		}		
	}
	
	constructURL();

	console.log(selectedVar);

	setVariable(selectedVar);
}


function legenda (hues) {

	// reset html
	document.querySelector("#sidebar #legenda").innerHTML = " <a class='close' onclick='toggleHamburger()'></a>		<span class='pointer' id='selectedcountry'></span> <span class='pointer' id='pointer'></span>";


	for (var i = 0; i < hues.length; i++) {
		// console.log(hues[i])
		document.querySelector("#sidebar #legenda").innerHTML +=  "  <div style='background-color:" + hues[i] + "'></div>";
	}

}



function mousemove(e,those) { // legenda high


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
				top = 98 - top;
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


		if (document.querySelectorAll("#sidebar #legenda #pointer").length > 0) {

			document.querySelector("#sidebar #legenda #pointer").style.display = "block";
			document.querySelector("#sidebar #legenda #pointer").style.top = "calc( " + top + "vh" + " - 20px )";
			
			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;

			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "score " + score;
			 // filterReplace (variablesScale[name],content,countrynames[e.target.feature.properties["name"]]) 
		 	document.querySelector("#sidebar #legenda #pointer").innerHTML = content;
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

function resetAll () {
	selectedVar = [];

	setVariable();
	buildMenu ();

	var stateObj = { object: "~" };
	history.pushState(stateObj, "Qdraw", "#");

	isFilterCountryActive = false;

	if (document.querySelectorAll("#sidebar #content").length > 0) {
		document.querySelector("#sidebar #content").innerHTML = "";
	}


}


function hideLightbox () {
	document.querySelector("#lightbox").style.zIndex = "-1";
}




function directFilterCountry() {
	if (isFilterCountryActive) {
		var e = {};
		e.target = {};
		e.target.feature = {};
		e.target.feature.properties = {};
	
		euLayer.eachLayer(function(layer) {
		
			if(layer.feature.properties.name === window.filterCountryName)	{
				e.target.feature.properties = layer.feature.properties;
			}
		

		});
		filterCountry(e)
	}
}


var isFilterCountryActive = false;

function filterCountry(e) {
	isFilterCountryActive = true;


	if (selectedVar.length > 0) {
		var countryname = e.target.feature.properties.name;
		window.filterCountryName = countryname;


		var color = "#DDD";
		var borderwidth = 0.25;
		var fillOpacity = 1;

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
				if (layer.feature.properties["name"] === e.target.feature.properties.name) {
					 color = "white"; // blue // selected country
					 borderwidth = 2;
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
		selectedcountryLegenda(e);
		constructURL();
	}

}

function selectedcountryLegenda (e) {
	if (isFilterCountryActive && document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0) {
		document.querySelector("#sidebar #legenda #selectedcountry").style.display = "block";

		var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;
		var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "score " + score;
		document.querySelector("#sidebar #legenda #selectedcountry").innerHTML = content;
	}

}


function selectedCountry (e) { // the text
	console.log(window.filterCountryName);


	// var content = [];
	// Object.keys(window.countrydescription).forEach(function(key) {
	// 	content.push(window.countrydescription[key][window.filterCountryName])
	// });

	document.querySelector("#sidebar #content").innerHTML = "<h2>" +  e.target.feature.properties.nl_name + "</h2>"



	// console.log(window.subject);

	// console.log(window.subjectintro);
	// console.log(selectedVar);



	if (selectedVar.length === 1) {

		var index = window.subject.indexOf(selectedVar[0])
		var content = window.subjectintro[index];
		content = replaceKeys(e,content);

		document.querySelector("#sidebar #content").innerHTML += "<p>" + content + "</p>";

	}
	else {


		if (selectedVar.length <= 4) {

			var content = replaceKeys(e,window.subjectintro_selectie2ofmeer[0]);
		
			document.querySelector("#sidebar #content").innerHTML += content; 

			for (var i = 0; i < selectedVar.length; i++) {
				var index = window.subject.indexOf(selectedVar[i]);
				
				if (i === selectedVar.length-2) {
					document.querySelector("#sidebar #content").innerHTML += " " + window.subjectui[index] + " (" + e.target.feature.properties[window.subject[index]] + ")" + " en ";
				}
				else if(i === selectedVar.length-1) {
					document.querySelector("#sidebar #content").innerHTML += " " + window.subjectui[index]+ " (" + e.target.feature.properties[window.subject[index]] + ")";
				}
				else {
					document.querySelector("#sidebar #content").innerHTML += " " + window.subjectui[index] + " (" + e.target.feature.properties[window.subject[index]] + ")" + ", ";
				}
			}

		}
		else {
			var content = replaceKeys(e,window.subjectintro_selectie2ofmeer[1]);
			document.querySelector("#sidebar #content").innerHTML += content;
		}
	}

		// alle landen
		// console.log(euLayer.getGeoJSON());
		// Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
		// 	if (e.target.feature.properties.name === euLayer.getGeoJSON()[key].properties.name) {

		// 	}
		// });

		// for (var i = 0; i <  window.subject.length; i++) {
		// 	content = content.replace("/\[" SCORE"\]/ig", window.combinedScore[e.target.feature.properties.name]);
		// }



	var link = "\"" + e.target.feature.properties.name + "\",\"" + e.target.feature.properties.nl_name + "\"";
	document.querySelector("#sidebar #content").innerHTML += "<a href='javascript:country(" + link + ")'>Lees meer..</a>";

}


function replaceKeys (e,content) {
	// search and replace items in text
	var replaceKeys = [];
	Object.keys(e.target.feature.properties).forEach(function(key) {
		replaceKeys.push(key);
	});

	for (var i = 0; i < replaceKeys.length; i++) {
		var re = new RegExp("{" + replaceKeys[i] + "}","ig");
		content = content.replace(re, e.target.feature.properties[replaceKeys[i]]);
	}

	// score pointer feature
	var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;
	content = content.replace(/\{_score_\}/ig, score);


	return content;
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