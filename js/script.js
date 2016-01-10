
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
		// alle landen
		// console.log(euLayer.getGeoJSON());
		// Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
		// 	if (e.target.feature.properties.name === euLayer.getGeoJSON()[key].properties.name) {

		// 	}
		// });


var style = {
	"clickable": false,
	"color": "#00D",
	"fillColor": "#fff",
	"weight": 0,
	"opacity": 1,
	"fillOpacity": 1
};
// 	"fillColor": "#334163",

var hues = [
	'hsl(192,100%,90%)', 
	'hsl(192,100%,80%)', 
	'hsl(192,100%,70%)', 
	'hsl(192,100%,60%)', 
	'hsl(192,100%,50%)', 
	'hsl(192,100%,40%)', 
	'hsl(192,100%,30%)', 
	'hsl(192,100%,25%)', 
	'hsl(192,100%,20%)', 
	'hsl(192,100%,15%)' 
];
// var hues = [
// 	'hsl(223,70%,80%)', 
// 	'hsl(223,70%,75%)', 
// 	'hsl(223,70%,70%)', 
// 	'hsl(223,70%,65%)', 
// 	'hsl(223,70%,60%)', 
// 	'hsl(223,70%,55%)', 
// 	'hsl(223,70%,50%)', 
// 	'hsl(223,70%,45%)', 
// 	'hsl(223,70%,40%)', 
// 	'hsl(223,70%,35%)' 
// ];

// var hues = [
// 	'rgb(3,9,93)', 
// 	'rgb(19,29,124)', 
// 	'rgb(6,34,170)', 
// 	'rgb(0,68,186)', 
// 	'rgb(26,97,202)', 
// 	'rgb(33,141,231)', 
// 	'rgb(58,147,247)', 
// 	'rgb(114,167,243)', 
// 	'rgb(163,192,225)', 
// 	'rgb(208,224,250)' 
// ];


var fHues = [
	'rgba(14, 178, 35, 0.8)', // green green
	'rgba(38, 203, 42, 0.8)',
	'rgba(90, 222, 70, 0.8)',
	'rgba(150, 245, 102, 0.8)',
	'rgba(185, 255, 130, 0.8)', // light groen
	'#ff8383',
	'#f46767', // light rood
	'#dd4747',
	'#c92727',
	'#af1010', //donker rood
	];


// var hues = [
// 	'#64738C', // green green
// 	'#889EBB',
// 	'#B6D2DE',
// 	'#D4EAF2',
// 	'#888',
// 	'#888',
// 	'#EBC2D0', // light rood
// 	'#D994AB',
// 	'#E679A3',
// 	'#C0537A'
// ];



// var fHues = [
// 	'rgba(14, 178, 35, 0.8)', // green green
// 	'rgba(38, 203, 42, 0.8)',
// 	'rgba(90, 222, 70, 0.8)',
// 	'rgba(150, 245, 102, 0.8)',
// 	'rgba(185, 255, 130, 0.8', // light groen
// 	'#ff8383',
// 	'#f46767', // light rood
// 	'#dd4747',
// 	'#c92727',
// 	'#af1010', //donker rood
// 	];


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
	// https://geojson-maps.kyd.com.au/

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
		if (data.datatableoptions.elements[key].subject !== "") {
			window.subject.push(data.datatableoptions.elements[key].subject);
		}
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


	buildPage ();
	
}


function buildPage () {
	buildURLout = buildURL();
	if (buildURLout.length != 0) {
		selectedVar = buildURLout[0];
		isFilterCountryActive = false;
		if (buildURLout[1].length > 0) {
			isFilterCountryActive = true;
			window.filterCountryName = buildURLout[1];
			console.log("~filterCountryName` " + window.filterCountryName)
			directFilterCountry();
		}
	}
	else {
		selectedVar = [];
	}	

	setVariable();
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

		// console.log("selectedVar");
		// console.log(selectedVar);

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

			var	windowwidth = window.innerWidth  || document.documentElement.clientWidth 	|| document.body.clientWidth;
			if (windowwidth > 570) {
				document.querySelector("#introdata").style.display = "block";
			}



			document.querySelector("#introdata").style.zIndex = "1";


			document.querySelector("#introdata .container").innerHTML = "<a onclick='showAndHideSidebar()' class='close'></a>";

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

	console.log(location.hash);

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
					var listOfAllCounties_nl_name = [];

					Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
						listOfAllCounties.push(euLayer.getGeoJSON()[key].properties.name);
						listOfAllCounties_nl_name.push(euLayer.getGeoJSON()[key].properties.nl_name);

					});
					if (listOfAllCounties.indexOf(urlcountry) === -1) {
						urlcountry = "NL";
					}

				}
				if (hash[i].search("help=") !== -1) {
					var isHelp = hash[i].replace("help=","");
					if (isHelp == "1" && hash[i].search("info=") === -1) {
						help();
					}
				}

				if (hash[i].search("info=") !== -1) {
					var isInfo = hash[i].replace("info=","");
					if (isInfo == "1" && hash[i].search("help=") === -1) {
						setTimeout(function(){ 
							country (urlcountry,listOfAllCounties_nl_name[listOfAllCounties.indexOf(urlcountry)])
						}, 2);
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

var urlList = [];
var timestampList = [];
var prevURL;
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


	if (isCountyInfoActive) {
		url += "&info=1";
	}

	if (selectedVar.length === 0) {
		url = "#";
	}

	if (isHelpActive) {
		url += "&help=1";
	}

	if (url !== prevURL) {
		var timestamp = new Date().getTime();
		var stateObj = { url: url, timestamp: timestamp };
		history.pushState(stateObj, "Qdraw", url);

		urlList.push(url);
		timestampList.push(timestamp);
	}
	prevURL = url;



}




window.onhashchange = function() {
    if (window.innerDocClick) {
        window.innerDocClick = false;

        console.log("innerDocClick")
    	buildPage();


    } else {
        if (window.location.hash != '#undefined') {
        	buildPage();

        } else {
        	        	console.log("h2o ")

            history.pushState("", document.title, window.location.pathname);
            location.reload();
        }
    }
}




window.innerDocClick = false;
document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
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
	
	if (those !== undefined) {
		constructURL();
	}

	// console.log(selectedVar);

	setVariable(selectedVar);
}


function legenda (hues) {

	// reset html
	document.querySelector("#sidebar #legenda").innerHTML = " <a onclick='showAndHideSidebar()' class='close'></a>		<span class='pointer' id='selectedcountry'></span> <span class='pointer' id='pointer'></span>";


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
		}

		top = top - 5;

		if (top < 3) {
			top = 3;
		}
		if (top > 87) {
			top = 87;
		}

		answerShowPointersWhenSidebarIsClosed ();
		if (document.querySelectorAll("#sidebar #legenda #pointer").length > 0 && !isNaN(window.combinedScore[e.target.feature.properties.name])  && showPointersWhenSidebarIsClosed) {

			document.querySelector("#sidebar #legenda #pointer").style.display = "block";
			// document.querySelector("#sidebar #legenda #pointer").style.top = "calc( " + top + "vh" + " - 20px )";
			document.querySelector("#sidebar #legenda #pointer").style.top = top + "vh";
			
			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;

			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "score " + score.toLocaleString();
			document.querySelector("#sidebar #legenda #pointer").innerHTML = content;
		}
	}

}

// Yeah here we go again http://eelslap.com/
function mmap(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



var isHelpActive = false;

function help () {

	isHelpActive = true;
	constructURL();
	
	document.querySelector("#lightbox").style.zIndex = "2";
	document.querySelector("#lightbox").style.display = "block";
	document.querySelector("#lightbox").addEventListener("click", hideLightbox, false);



	write2lightbox(window.helpdata);


}

function write2lightbox (contentArray) {

	var contentHTML = "<div class='close'></div>";

	var splitrow = contentArray.indexOf("{_splitrow_}");

	if (splitrow === -1) {
		splitrow = contentArray.length;
	}

	var content;
	for (var i = 0; i <  splitrow; i++) {


		if (i === 0) {
			content = "<h2>" + contentArray[i] + "</h2>";
		}
		if (contentArray[i] !== ""  && i !== 0) {
			content += "<p>" + contentArray[i] + "</p>";
		}

	}

	contentHTML += "<div class='left'>" + content + "</div>";



	if (splitrow !== contentArray.length) {
	


		for (var i = splitrow+1; i <  contentArray.length; i++) {


			if (i === splitrow+1) {
				content = "<h2>" + contentArray[i] + "</h2>";
			}
			if (contentArray[i] !== ""  && i !== splitrow+1) {
				content += "<p>" + contentArray[i] + "</p>";
			}

		}
		contentHTML += "<div class='right'>" + content + "</div>";

	}


	var properties = {};
	Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
		if (window.filterCountryName === euLayer.getGeoJSON()[key].properties.name) {
			properties = euLayer.getGeoJSON()[key].properties;
		}
	});
	contentHTML = replaceKeys(properties,contentHTML);

	document.querySelector("#lightbox .container").innerHTML = contentHTML;

	// body...


	// var splitrow = window.helpdata.indexOf("{_splitrow_}");

	// if (splitrow === -1) {
	// 	splitrow = window.helpdata.length;
	// }

	// var content;
	// for (var i = 0; i <  splitrow; i++) {


	// 	if (i === 0) {
	// 		content = "<h2>" + window.helpdata[i] + "</h2>";
	// 	}
	// 	if (window.helpdata[i] !== ""  && i !== 0) {
	// 		content += "<p>" + window.helpdata[i] + "</p>";
	// 	}

	// }
	// document.querySelector("#lightbox .container").innerHTML += "<div class='left'>" + content + "</div>";

	// if (splitrow !== window.helpdata.length) {
	// 	for (var i = splitrow+1; i <  window.helpdata.length; i++) {


	// 		if (i === splitrow+1) {
	// 			content = "<h2>" + window.helpdata[i] + "</h2>";
	// 		}
	// 		if (window.helpdata[i] !== ""  && i !== splitrow+1) {
	// 			content += "<p>" + window.helpdata[i] + "</p>";
	// 		}

	// 	}

	// }
	// document.querySelector("#lightbox .container article").innerHTML += "<div>" + content + "</div>";

}

function resetAll () {
	selectedVar = [];

	setVariable();
	buildMenu ();

	var stateObj = { url: "#" };
	history.pushState(stateObj, "Qdraw", "#");

	isFilterCountryActive = false;

	if (document.querySelectorAll("#sidebar #content").length > 0) {
		document.querySelector("#sidebar #content").innerHTML = "";
	}


}


var isSidebarVisible = true;
function showAndHideSidebar () {
	console.log(isSidebarVisible)

	// Hide sidebar
	if (isSidebarVisible) {
		document.querySelector("#sidebar #legenda .close").style.backgroundImage = "url('images/arrow-toright-white.svg')";
		document.querySelector("#sidebar .container").style.width = "0px";
		document.querySelector("#sidebar").style.width = "0px";
		document.querySelector("#sidebar .container").style.display = "none";
		if(	document.querySelectorAll("#sidebar #legenda #pointer").length > 0  && isFilterCountryActive  ) { 
			document.querySelector("#sidebar #legenda #pointer").style.display = "block";
		}
			
		if(	document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0 && isFilterCountryActive ) {
			document.querySelector("#sidebar #legenda #selectedcountry").style.display = "block";
		}
	}
	// Show sidebar
	else {
		document.querySelector("#sidebar #legenda .close").style.backgroundImage = "url('images/arrow-toleft-white.svg')";
		document.querySelector("#sidebar .container").style.width = "";
		document.querySelector("#sidebar").style.width = "";
		document.querySelector("#sidebar .container").style.display = "block";
		if(	document.querySelectorAll("#sidebar #legenda #pointer").length > 0) {
			document.querySelector("#sidebar #legenda #pointer").style.display = "none";
		}
			
		if(	document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0) {
			document.querySelector("#sidebar #legenda #selectedcountry").style.display = "none";
		}
	}

	answerShowPointersWhenSidebarIsClosed ();
	




	isSidebarVisible = (isSidebarVisible ? false : true);


	 
}

var showPointersWhenSidebarIsClosed = true;
function answerShowPointersWhenSidebarIsClosed () {
	windowwidth = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;


	if (windowwidth < 570) {
		if (isSidebarVisible) {
			showPointersWhenSidebarIsClosed = false;
		}
		else {
			showPointersWhenSidebarIsClosed = true
		}
	}
	else {
		showPointersWhenSidebarIsClosed = true
	}

}


function hideLightbox (e) {

	try {
		if ( (e.target.parentNode.nodeName != "P") &&  (e.target.parentNode.className != "left") && (e.target.parentNode.className != "right")  && (e.target.parentNode.className != "container")   ) {
			document.querySelector("#lightbox").style.display = "none";
			isHelpActive = false;
			isCountyInfoActive = false;
			constructURL();
		}

	}
	catch(er) {
		if (e) {
			document.querySelector("#lightbox").style.display = "none";
			isHelpActive = false;
			isCountyInfoActive = false;
			constructURL();
		}
	}


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

		if (window.filterCountryName === "DO") {
			facepalm();
		}

		var color = "red";
		var borderwidth = 0.25;
		var fillOpacity = 1;

		euLayer.eachLayer(function(layer) {


			if (window.combinedScore[layer.feature.properties.name] !== undefined) {

				if (window.combinedScore[layer.feature.properties.name] > window.combinedScore[countryname]) {
					// Countries who perform better! :D :D :D

					var cindex = mmap(window.combinedScore[layer.feature.properties.name],window.combinedScore[countryname],10,5,0);
					color = fHues[Math.floor(cindex)];
					borderwidth = 0.5;

					//mmap(this,min,max,outmin,outmax)


				}
				else if (window.combinedScore[layer.feature.properties.name] === window.combinedScore[countryname]){
					color = fHues[Math.round(fHues.length/2)];
					// console.log(Math.round(fHues.length/2));
					borderwidth = 0.5;


					// The selected country
					if (layer.feature.properties["name"] === e.target.feature.properties.name) {
						 color = "#fff28f"; // blue // selected country
						 borderwidth = 2;
					}
				}
				else {
					var cindex = mmap(window.combinedScore[layer.feature.properties.name],0,window.combinedScore[countryname],9,5);
					color = fHues[Math.floor(cindex)];
					borderwidth = 0.5;

				}

			}


			// And finaly arange all the colours from all countries
			layer.setStyle({
				fillColor: color,
				fillOpacity: fillOpacity,
				color: '#ccc',
				weight: borderwidth
			});

		});

		selectedCountry(e);
		legenda(fHues);
		selectedcountryLegenda(e);
		constructURL();


	}

}

function selectedcountryLegenda (e) {
	answerShowPointersWhenSidebarIsClosed ();

	if (isFilterCountryActive && showPointersWhenSidebarIsClosed && (document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0) ) {

		if (!isNaN(Number(e.target.feature.properties[selectedVar[0]])) ) {
			document.querySelector("#sidebar #legenda #selectedcountry").style.display = "block";

			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;
			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "score " + score.toLocaleString();
			document.querySelector("#sidebar #legenda #selectedcountry").innerHTML = content;
		}

	}
	else {
		console.error("~ legenda pointer not availble for: " + e.target.feature.properties.name );
	}

	// document.querySelector('#sidebar .close').addEventListener("click", function(e){ var those = this; showAndHideSidebar(); }, false);


}


function selectedCountry(e) { // the text



	if (!isNaN(Number(e.target.feature.properties[selectedVar[0]])) ) {

		document.querySelector("#sidebar #content").innerHTML = "<h2>" +  e.target.feature.properties.nl_name + "</h2>"

		if (selectedVar.length === 1) {

			var index = window.subject.indexOf(selectedVar[0])
			var content = window.subjectintro[index];
			content = replaceKeys(e.target.feature.properties,content);

			document.querySelector("#sidebar #content").innerHTML += "<p>" + content + "</p>";

		}
		else {


			if (selectedVar.length <= 4) {

				var content = replaceKeys(e.target.feature.properties,window.subjectintro_selectie2ofmeer[0]);
			
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
				var content = replaceKeys(e.target.feature.properties,window.subjectintro_selectie2ofmeer[1]);
				document.querySelector("#sidebar #content").innerHTML += content;
			}
		}

		var link = "\"" + e.target.feature.properties.name + "\",\"" + e.target.feature.properties.nl_name + "\"";
		document.querySelector("#sidebar #content").innerHTML += "<a class='button' href='javascript:country(" + link + ")'>Lees meer..</a>";
	}
	else {
		console.error("~ no data availble over country " + e.target.feature.properties.name );
	}


	
}


function replaceKeys (properties,content) {
	// e.target.feature.properties

	// search and replace items in text
	var replaceKeys = [];
	Object.keys(properties).forEach(function(key) {
		replaceKeys.push(key);
	});

	for (var i = 0; i < replaceKeys.length; i++) {
		var re = new RegExp("{" + replaceKeys[i] + "}","ig");

		var value = properties[replaceKeys[i]];
		value = String(value).replace(/,/ig,".");

		if (!isNaN(value)) {
			value = Math.ceil(value * 10)/10;
			value = value.toLocaleString();

		}
		content = content.replace(re, value);
	}

	// score pointer feature
	var score = Math.ceil(window.combinedScore[properties.name] * 10)/10;
	content = content.replace(/\{_score_\}/ig, score.toLocaleString());


	return content;

}

var isCountyInfoActive = false; 

function country (name,nl_name) {
	isCountyInfoActive = true;
	constructURL();

	console.log("`! " + name + " " + nl_name);


	var content = [];

	var i = 0;
	Object.keys(window.countrydescription).forEach(function(key) {
		if ( i!== 0) {
			content.push(window.countrydescription[key][window.filterCountryName])
		}
		i++;
	});


	document.querySelector("#lightbox").style.zIndex = "2";
	document.querySelector("#lightbox").style.display = "block";

	document.querySelector("#lightbox").addEventListener("click", function(e){ hideLightbox(e) }, false);


	write2lightbox(content);

}

function facepalm () {
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

setTimeout(function(){ 
	if (window.subject.length < 1) {
		document.getElementById("introdata").innerHTML = "<div class='container'><h2>Sorry er iets misgegaan met het laden van de inhoud</h2> <p>Wacht een klein momentje of herlaad de pagina om het opnieuw te proberen</p></div>"
	}
}, 5000);


// for IE10 and lower == unsuported
if(document.all && document.compatMode) {
	setTimeout(function(){ 
		document.getElementById("introdata").innerHTML = "<div class='container'><h2>Sorry, maar met jouw versie van Internet Explorer kan mijn site niet samenwerken.</h2> <p> Bekijk de website van <a href='http://browsehappy.com/?locale=nl'>browsehappy</a> voor informatie</p></div>"
	}, 200);
}


document.addEventListener("keydown", function(e){ keyboardHandler(e); }, false);

function keyboardHandler (e) {
	if ( (isCountyInfoActive || isHelpActive) && e.keyCode === 27 ) {
		hideLightbox (true);
	}

}


// // selectedVar
// // isFilterCountryActive
// // window.filterCountryName

// var prevSelectedVar;
// var prevIsFilterCountryActive;
// var prevFilterCountryName;

// var isUserNotIdle = true;
// function idle() {
// 	var t;
//     window.onload = resetTimer;
//     window.onmousemove = resetTimer;
//     window.onmousedown = resetTimer; // catches touchscreen presses
//     window.onclick = resetTimer;     // catches touchpad clicks
//     window.onscroll = resetTimer;    // catches scrolling with arrow keys
//     window.onkeypress = resetTimer;
// 	var screensaver;

// 	function idleHelper() {
// 		isUserNotIdle = false;

// 		prevSelectedVar = selectedVar;
// 		prevIsFilterCountryActive = isFilterCountryActive;
// 		prevFilterCountryName = window.filterCountryName;

// 		selectedVar = [];
// 		screensaver = setInterval(idleActive, 500);
// 	    console.log("U bent inactief")
// 	}

//     function resetTimer() {
//         clearTimeout(t);
//         t = setTimeout(idleHelper, 2000);  // time is in milliseconds

//         if (!isUserNotIdle) {
//         	idleI = 0;
// 	     	clearInterval(screensaver);
// 			selectedVar = prevSelectedVar;
// 			isFilterCountryActive = prevIsFilterCountryActive;
// 			window.filterCountryName = prevFilterCountryName;
// 			constructURL();
// 			buildPage();
// 		}

//     	isUserNotIdle = true;


//     }
// }
// idle();


// var idleI = 0;
// var idleMode = 0;
// function idleActive () {

// 	switch(idleMode) {
// 		case 0:
// 			selectedVar.push(window.subject[idleI]);
// 			constructURL();
// 			buildPage();
// 			if (idleI <= window.subject.length-1) {
// 				idleI++;
// 			}
// 			else {
// 				idleMode++;
// 			}
// 		break;
// 		case 1: 
// 			for (var i = 0; i < window.subject.length; i++) {
// 				// window.subject[i].remove/
// 				var index = selectedVar.indexOf(selectedVar[i]);
// 				selectedVar.splice( index, 1 );

// 				if (i===window.subject.length-1) {
// 					idleMode++;
// 				}
// 			}

// 			constructURL();
// 			buildPage();

// 		break;
// 		default:
// 			console.log("def");
// 		break;
// 	}



// }




// Bijna alle dieren hebben een maandelijkse cyclus, behalve natuurlijk de weekdieren.