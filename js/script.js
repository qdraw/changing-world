
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



// Different Loop i use in this code:

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


// Map style
var style = {
	"clickable": false,
	"color": "#00D",
	"fillColor": "#fff",
	"weight": 0,
	"opacity": 1,
	"fillOpacity": 1
};

// country codes in absolute mode
var hues = [
	'hsl(192,100%,15%)', // best
	'hsl(192,100%,20%)', 
	'hsl(192,100%,25%)', 
	'hsl(192,100%,30%)', 
	'hsl(192,100%,40%)', 
	'hsl(192,100%,50%)', 
	'hsl(192,100%,60%)', 
	'hsl(192,100%,70%)', 
	'hsl(192,100%,80%)', 
	'hsl(192,100%,90%)'// worst
];

// country codes in relative mode
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

// Loading GeoJSON data as tiles
var geojsonURL = 'data/vectiles-water-areas/{z}/{x}/{y}.json';
var geojsonTileLayer = new L.TileLayer.GeoJSON(geojsonURL, 
	{
		clipTiles: true,
		unique: function (feature) {
			return feature.id; 
		}
	}, 
	{
		style: style
	}
);

// Allow the user only in the area
var southWest = L.latLng(3.337953961416485, -118.47656249),
	northEast = L.latLng(81.17449100425956, 112.8515625),
	bounds = L.latLngBounds(southWest, northEast);

// the map variable
var map = L.map('map',{ 
	zoomControl:false,
	maxBounds: bounds,
	minZoom: 4,
	maxZoom: 5 
	})
	.addLayer(geojsonTileLayer)
	.setView([55, 0], 4);

// Create a layer of state features, and when it's done
// loading, run loadData
var euLayer = L.mapbox.featureLayer()
	.loadURL('data/europe.geo.json')
	.addTo(map)
	.on('ready', loadData);
	// Source: https://geojson-maps.kyd.com.au/

// The variables used to store dynamic loaded data
window.subject = [];
window.subjectui = [];
window.subjectcolor = [];
window.subjectintro = [];
window.subjectintro_selectie2ofmeer = [];
window.ishightolow = [];
window.sidebarheader = [];
window.helpdata = [];
window.introdata = [];
window.countrydescription = {};

// When this project is over, I will probly lose access to the Google Spreadsheet, when i place it to Archive mode load a local json file.
var archiveMode = true;
function loadData () {
	if (!archiveMode) {
		// Tabletop loads here the spreadsheet data async.
		var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1v9Dsd5LwlLrSd5jzO7_QfTECU3TEtnlK44omvdYCJ8E/pubhtml';
		Tabletop.init( { key: public_spreadsheet_url,
						callback: processData,
						simpleSheet: false } );
		}
	else {
		loadJSON("data/backup.json",
			function(data) { processData(data); },
			function(xhr) { console.error(xhr); }
		);
	}

}

// The normal XMLHttpRequest to load json files and parse it
function loadJSON(path, success, error){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
}

window.ranges = {};
// callback function from loadData
function processData (data, tabletop) {
	
	// to create a backup
	// backupDataJSON (data);
	// return;

	Object.keys(data.datatableoptions.elements).forEach(function(key) {
		// Check first if it isn't emthy
		if (data.datatableoptions.elements[key].subject !== "") {
			window.subject.push(data.datatableoptions.elements[key].subject);
		}
		window.subjectui.push(data.datatableoptions.elements[key].subjectui);
		window.subjectcolor.push(data.datatableoptions.elements[key].subjectcolor);
		window.ishightolow.push(data.datatableoptions.elements[key].ishightolow);
		window.sidebarheader.push(data.datatableoptions.elements[key].sidebarheader);
		window.introdata.push(data.datatableoptions.elements[key].introdata);
		window.helpdata.push(data.datatableoptions.elements[key].helpdata);
	});

	// The text to have more information (read more)
	window.countrydescription = data.countrydescription.elements;

	// used to be the way to sort the data > now it is 0-10
	for (var i = 0; i < window.subject.length; i++) {
		window.ranges[window.subject[i]] = { min: Infinity, max: -Infinity };
	}

	joinData(data.datatable.elements, euLayer);
}

// a function to show all the merged tabletop google drive content on the screen; disabled by default.
function backupDataJSON (data) {

	var received = [];
	tojson = JSON.stringify(data, function(key, val) {
	   if (typeof val == "object") {
			if (received.indexOf(val) >= 0)
				return;
			received.push(val);
		}
		return val;
	});
	var body  = document.getElementsByTagName('body')[0];
	var div  = document.createElement('div');

	body.appendChild(div);
	body.textContent = tojson;
}


// Join the data in the map;
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
			
			// Very inported feature to replace data to valid integers/floats
			data[i][window.subject[j]] = data[i][window.subject[j]].replace(/,/i, "."); 
			data[i][window.subject[j]] = Number(data[i][window.subject[j]]);


			// Place range data in variable
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
		// ignore it goes wrong
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
	// refresh the page without refreshing ~  all features when the page is loaded

	// read values from the url
	buildURLout = buildURL();
	if (buildURLout.length !== 0) {
		selectedVar = buildURLout[0];
		isFilterCountryActive = false;
		if (buildURLout[1].length > 0) {
			isFilterCountryActive = true;
			window.filterCountryName = buildURLout[1];
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



window.combinedScore = {};

function setVariable() {

	if (selectedVar.length > 0) {

		// hide welcome screen
		if (document.querySelectorAll("#introdata").length > 0) {
			document.querySelector("#introdata").style.zIndex = "-1";
		}

		// the total score reset // this is NOT window.combinedScore;
		var combinedScore = {};

		euLayer.eachLayer(function(layer) {

			// Calculate the average of the selected subjects
			
			for (var i = 0; i < selectedVar.length; i++) {

				if (combinedScore[layer.feature.properties.name] !== undefined) {
					combinedScore[layer.feature.properties.name] += layer.feature.properties[selectedVar[i]];
				}
				else {
					combinedScore[layer.feature.properties.name] = layer.feature.properties[selectedVar[i]];
				}

			}
			
			if (selectedVar.length !== 0) {
				combinedScore[layer.feature.properties.name] = Number(combinedScore[layer.feature.properties.name] / selectedVar.length);
				window.combinedScore = combinedScore;
			}

			// make a color based on the combinedScore;
			var colorindex = hues.length + (Math.round(combinedScore[layer.feature.properties.name]) * -1);

			// place the color to all countries;
			layer.setStyle({
				fillColor: hues[colorindex],
				fillOpacity: 1,
				color: '#fff',
				weight: 0.25
			});

			// 	// // YEAH, eventListeners; 
			// Atach an event to all countries (caniuse IE9+)
			layer.addEventListener("mouseover", function(e){ var those = this; mousemove(e,those); }, false);
			layer.addEventListener("click", function(e){ filterCountry(e); }, false);


		});

	}//e/fi
	else {
		// Welcome screen, Hello, is it me you're looking for?

		// reset content screen
		if (document.querySelectorAll("#sidebar #content").length > 0) {
			document.querySelector("#sidebar #content").innerHTML = "";
		}


		if (document.querySelectorAll("#introdata").length > 0) {

			// No welcome screen for mobile
			var	windowwidth = window.innerWidth  || document.documentElement.clientWidth 	|| document.body.clientWidth;
			if (windowwidth > 570) {
				document.querySelector("#introdata").style.display = "block";
			}


			// reset welcome screen;
			document.querySelector("#introdata").style.zIndex = "1";
			document.querySelector("#introdata .container").innerHTML = "";

			// feature to display first row in <h2> and the rest in <p>
			for (var i = 0; i <  window.introdata.length; i++) {

				if (i === 0) {
					document.querySelector("#introdata .container").innerHTML += "<h2>" + window.introdata[i] + "</h2>";
				}
				if (window.helpdata[i] !== ""  && i !== 0) {
					document.querySelector("#introdata .container").innerHTML += "<p>" + window.introdata[i] + "</p>";
				} 
			}
		}

		// reset all countries to grey
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
	//  line 415, col 65, Expected an assignment or function call and instead saw an expression.
	isFilterCountryActive ? directFilterCountry() : legenda(hues);

	// and the sunset arrives
	hidePreloader();
}

function hidePreloader () {
	document.querySelector(".preloader").style.zIndex = "-1";
}

// rebuild and build for the first time the left menu
function buildMenu () {
	
	document.querySelector("#sidebar #menu").innerHTML = "";


	// #sidebar #menu
	for (var i = 0; i <  window.subject.length; i++) {
		document.querySelector("#sidebar #menu").innerHTML += "<label class='none' id='label_" + window.subject[i] +"'><input type='checkbox' id='" + window.subject[i] +"' name='checkbox' value='" + window.subject[i] +"'><span class='checkbox'></span> <span class='p'> </span> <span class='txt'>" + window.subjectui[i] + "</span><span class='i' style='background-image: url(images/" + window.subject[i] + ".svg)'></span></label>";
	}

	// the backgroud progress bars
	updateMenuProgress ();

	for (i = 0; i <  window.subject.length; i++) {
		document.querySelector('#sidebar #menu #' + window.subject[i] ).addEventListener("click", function(e){ var those = this; readVariable(those); }, false);
		// line 440, col 151, Don't make functions within a loop.
	}

	if (selectedVar.length > 0) {
		for (i = 0; i < selectedVar.length; i++) {
			readVariable(undefined);
		}
	}


	document.querySelector('#sidebar .help').addEventListener("click", function(e){ var those = this; help(those); }, false);
	document.querySelector('#sidebar .resetAll').addEventListener("click", function(e){ var those = this; resetAll(those); }, false);

}

// To update the progress bars inside the menu;
function updateMenuProgress () {
	if (document.querySelectorAll("#sidebar #menu label").length > 0) {

		for (i = 0; i <  window.subject.length; i++) {
			if (isFilterCountryActive) {

				var value;
				euLayer.eachLayer(function(layer) {
					if(window.filterCountryName === layer.feature.properties.name){
						value = layer.feature.properties[window.subject[i]];
					}
				});
				// line 464, col 18, Don't make functions within a loop.

				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .p").style.width = mmap(value,0,10,0,76) + "%";
				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .p").style.backgroundColor = "hsl(192,100%," + mmap(value,0,10,80,15) + "%)";
				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .p").style.opacity = "0.8";

				// window.subjectcolor[2].replace("0.7",mmap(value,0,10,0.2,0.8));
				// console.log(window.subjectcolor[i]);
				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .i").style.background = "#CCC";
				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .i").innerHTML = value.toLocaleString('nl-NL');
			}
			else {
				document.querySelector("#sidebar #menu #label_" + window.subject[i] + " .i").style.background = "background-image: url(images/" + window.subject[i] + ".svg)";
			}
		}	
	}


}


function buildSidebarHeader () {
	for (var i = 0; i <  window.sidebarheader.length; i++) {
		if (i === 0) {
			document.querySelector("#sidebar #header").innerHTML = "<h1>" + window.sidebarheader[i] + "</h1>";
		}
		else if (window.sidebarheader[i] !== "") {
			document.querySelector("#sidebar #header").innerHTML += "<p><i>" + window.sidebarheader[i] + "</i></p>";
		} 
	}
}

function buildURL() {

	// Usage in the browser navigation bar:
	// #
	// #subject=gini_score,freedom_score

	// #subject=gini_score,freedom_score&country=DE

	// #subject=gini_score,freedom_score&info=1
	// #subject=gini_score,freedom_score&country=DE&info=1

	// #&help=1
	// #subject=gini_score,freedom_score&help=1
	// #subject=gini_score,freedom_score&country=DE&help=1

	// is it # or #any-value?
	if (location.hash.length > 0) {

		// the subject that will be returned
		var urlsubject = [];
		// the country
		var urlcountry = "";


		// make a list of all countries using the ISO 3166-2 code
		var listOfAllCounties = [];
		Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
			listOfAllCounties.push(euLayer.getGeoJSON()[key].properties.name);
		});

		// search for seperators
		if (location.hash.search("&") > 0) {
			// make an array of the url
			var hash = location.hash.split("&");
			// loop though the array
			for (var i = 0; i < hash.length; i++) {
				if (hash[i].search("#subject=") !== -1) {
					urlsubject = hash[i].replace("#subject=","");
					urlsubject = urlsubject.split(",");
				}

				if (hash[i].search("country=") !== -1) {
					urlcountry = hash[i].replace("country=","");

					// on error use the netherlands
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
						// without time out you will see undefined in the UI;
						setTimeout(function(){ 
							country ();
						}, 1);
						//  line 559, col 26, Don't make functions within a loop.
					}
				}	
			}
		}
		else {
			// display only the subjects;
			if (location.hash.search("#subject=") !== -1) {
				urlsubject = location.hash.replace("#subject=","");
				urlsubject = urlsubject.split(",");
			}

		}

		// controle; voor subject; ignore non existing subjects
		for (var j = 0; j < urlsubject.length; j++) {
			if (window.subject.indexOf(urlsubject[j]) === -1) {
				var index = urlsubject.indexOf(urlsubject[j]);
				urlsubject.splice( index, 1 );
			}
		}

		return [urlsubject,urlcountry];
	}
	else {
		// no value
		return [];
	}
}

var prevURL;
function constructURL() {
	// Please check: buildURL() for usage;

	if (history.pushState) { // for old browsers like: IE9/IE10

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

		// Check if this function isn't repeated excuded;
		if (url !== prevURL) {
			var stateObj = { url: url };
			history.pushState(stateObj, "Qdraw", url);
		}
		prevURL = url;
	}


}




window.onhashchange = function() {
	if (window.innerDocClick) {
		// Thanks: http://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser
		window.innerDocClick = false;

		console.log("innerDocClick");
		buildPage();


	} else {
		if (window.location.hash != '#undefined') {
			buildPage();

		} else {
			// Go back to (for expample) Google;
			history.pushState("", document.title, window.location.pathname);
			location.reload();
		}
	}
};


var selectedVar = [];
function readVariable (those) {
	// those is this of the eventListerer


	// When you click on the checkbox


	// There used to be a reset;	
	// isFilterCountryActive = false;

	var i;
	
	if (those !== undefined) {
		
		if ( selectedVar.indexOf(those.id) === -1 ) {
			console.log(those.id);
			selectedVar.push(those.id);
		}
		else {
			var index = selectedVar.indexOf(those.id);
			// delete storeActiveVar[index]; // replace this item of the list with: ""
			selectedVar.splice( index, 1 ); // delete this item of the array;
		}

		// reset all checkboxes to none;
		for (i = 0; i < window.subject.length; i++) {
			document.querySelector("#menu #label_" + window.subject[i]).className = "none";
		}

		// set the selected checkboxes to active;
		for (i = 0; i < selectedVar.length; i++) {
			document.querySelector("#menu #label_" + selectedVar[i]).className = "active";
		}
	}
	else {
		// direct input; for example using a url (no reset needed);
		for (i = 0; i < selectedVar.length; i++) {
			document.querySelector("#menu #label_" + selectedVar[i]).className = "active";
		}		
	}

	// exept for direct input;	> create an unique url;
	if (those !== undefined) {
		constructURL();
	}

	setVariable(selectedVar);
}

// display the legenda; (no updates required)
function legenda (hues) {

	// reset html
	document.querySelector("#sidebar #legenda").innerHTML = " <a onclick='showAndHideSidebar()' class='close'></a>		<span class='pointer' id='selectedcountry'></span> <span class='pointer' id='pointer'></span>";

	for (var i = 0; i < hues.length; i++) {
		document.querySelector("#sidebar #legenda").innerHTML +=  "  <div style='background-color:" + hues[i] + "'></div>";
	}

}



function mousemove(e,those) { // legenda updates 

	// Thanks (https://www.mapbox.com/mapbox.js/example/v1.0.0/choropleth/)

	if (selectedVar.length > 0) {
		
		var top;

		if (!isFilterCountryActive) { // display pointer absolute
			top = mmap(window.combinedScore[e.target.feature.properties.name],0,10,0,100);
			top = (100 + (top * -1) + 0 /*fix*/ );

		} 
		else{ // display pointer relative
		
			if (window.combinedScore[e.target.feature.properties.name] > window.combinedScore[window.filterCountryName]) {
				// Countries who perform better! :D :D :D
				top = mmap(window.combinedScore[e.target.feature.properties.name],window.combinedScore[window.filterCountryName],10,0,50);
				top = 50 - top;
			}
			else { // Worse countries :(
				top = mmap(window.combinedScore[e.target.feature.properties.name],0,window.combinedScore[window.filterCountryName],0,50);
				top = 100 - top;
			}
		}

		// corection used for close button;
		top = top - 5;

		// corection used for top and bottom of the screen;
		if (top < 3) {
			top = 3;
		}
		if (top > 87) {
			top = 87;
		}

		// feature for mobile only
		answerShowPointersWhenSidebarIsClosed ();

		if (document.querySelectorAll("#sidebar #legenda #pointer").length > 0 && !isNaN(window.combinedScore[e.target.feature.properties.name])  && showPointersWhenSidebarIsClosed) {
			// if element exist, is a valid number and, is allow to show (for mobile);

			document.querySelector("#sidebar #legenda #pointer").style.display = "block";
			document.querySelector("#sidebar #legenda #pointer").style.top = top + "vh"; // using view height ~ http://caniuse.com/#search=vh
			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10; // to 5.4 instead of 5.44444;

			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "cijfer: " + score.toLocaleString('nl-NL'); // special javascript method;
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

	document.querySelector("#lightbox").innerHTML = "<div class='container'></div>";

	var contentHTML = "<div class='close'></div>";
		
	// there are two rows; the split feature = {_splitrow_};
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
	
		for (i = splitrow+1; i <  contentArray.length; i++) {
			if (i === splitrow+1) {
				content = "<h2>" + contentArray[i] + "</h2>";
			}
			if (contentArray[i] !== ""  && i !== splitrow+1) {
				content += "<p>" + contentArray[i] + "</p>";
			}
		}
		contentHTML += "<div class='right'>" + content + "</div>";
	}

	// get all data of the selected country
	var properties = {};
	Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
		if (window.filterCountryName === euLayer.getGeoJSON()[key].properties.name) {
			properties = euLayer.getGeoJSON()[key].properties;
		}
	});

	// replace the placeholder with data;
	contentHTML = replaceKeys(properties,contentHTML);
	document.querySelector("#lightbox .container").innerHTML = contentHTML;
}

// reset button
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

	if(	document.querySelectorAll("#sidebar #legenda #pointer").length > 0) {
		document.querySelector("#sidebar #legenda #pointer").style.display = "none";
	}
		
	if(	document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0) {
		document.querySelector("#sidebar #legenda #selectedcountry").style.display = "none";
	}

}


var isSidebarVisible = true;
function showAndHideSidebar () {
	console.log(isSidebarVisible);

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
	windowwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	// for mobile view;

	if (windowwidth < 570) {
		if (isSidebarVisible) {
			showPointersWhenSidebarIsClosed = false;
		}
		else {
			showPointersWhenSidebarIsClosed = true;
		}
	}
	else {
		showPointersWhenSidebarIsClosed = true;
	}

}


function hideLightbox (e) {

	try {
		if ( (e.target.parentNode.nodeName != "P") &&  (e.target.parentNode.className != "subject") &&  (e.target.parentNode.className != "left") && (e.target.parentNode.className != "right")  && (e.target.parentNode.className != "container")  ||  e.target.className === "close") {
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


// direct api for use the url to go to one country
function directFilterCountry() {
	if (isFilterCountryActive) {

		// making an object;
		var e = {};
		e.target = {};
		e.target.feature = {};
		e.target.feature.properties = {};
	
		euLayer.eachLayer(function(layer) {
			if(layer.feature.properties.name === window.filterCountryName)	{
				e.target.feature.properties = layer.feature.properties;
			}
		});
		filterCountry(e);
	}
}


var isFilterCountryActive = false;
function filterCountry(e) { // to use after an eventListerer;
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
		var cindex;

		euLayer.eachLayer(function(layer) {


			if (window.combinedScore[layer.feature.properties.name] !== undefined) {

				if (window.combinedScore[layer.feature.properties.name] > window.combinedScore[countryname]) {
					// Countries who perform better! :D :D :D
					cindex = mmap(window.combinedScore[layer.feature.properties.name],window.combinedScore[countryname],10,5,0);
					color = fHues[Math.floor(cindex)];
					borderwidth = 0.5;
				}
				else if (window.combinedScore[layer.feature.properties.name] === window.combinedScore[countryname]){
					// equal countries;
					color = fHues[Math.round(fHues.length/2)];
					borderwidth = 0.5;

					// The selected country
					if (layer.feature.properties.name === e.target.feature.properties.name) {
						 color = "#fff28f"; // blue // selected country
						 borderwidth = 2;
					}
				}
				else {
					// bad countries;
					cindex = mmap(window.combinedScore[layer.feature.properties.name],0,window.combinedScore[countryname],9,5);
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

		// and adjust all values again;
		selectedCountry(e);
		legenda(fHues);
		selectedcountryLegenda(e);
		constructURL();
		updateMenuProgress ();
	}

}

function selectedcountryLegenda (e) {
	answerShowPointersWhenSidebarIsClosed ();

	// the static pointer in realative mode;
	if (isFilterCountryActive && showPointersWhenSidebarIsClosed && (document.querySelectorAll("#sidebar #legenda #selectedcountry").length > 0) ) {

		if (!isNaN(Number(e.target.feature.properties[selectedVar[0]])) ) {
			document.querySelector("#sidebar #legenda #selectedcountry").style.display = "block";

			var score = Math.ceil(window.combinedScore[e.target.feature.properties.name] * 10)/10;
			var content = "<b>" + e.target.feature.properties.nl_name + "</b> <br />" + "cijfer: " + score.toLocaleString('nl-NL');
			document.querySelector("#sidebar #legenda #selectedcountry").innerHTML = content;
		}

	}
	else {
		console.error("~ legenda pointer not availble for: " + e.target.feature.properties.name );
	}
}


function selectedCountry(e) { // the text in the sidebar
	if (!isNaN(Number(e.target.feature.properties[selectedVar[0]])) ) {
		var value = Math.ceil( window.combinedScore[e.target.feature.properties.name] * 10)/10;
		value = value.toLocaleString('nl-NL');
		document.querySelector("#sidebar #content").innerHTML = "<h2>" + e.target.feature.properties.nl_name + "</h2><div class='readmore' onclick='country()'>Lees meer over " +  e.target.feature.properties.nl_name +" </div>" + " " + " <span class='score'>" + value + " </span>";
	}
	else {
		console.error("~ no data availble over country " + e.target.feature.properties.name );
	}
}


function replaceKeys (properties,content) {
	// You don't have to enter all values in the text, use the shortcuts for this: if you select {name} == NL {nl_name} will be: Nederland; 

	// search and replace items in text
	replaceKeysArray = [];
	Object.keys(properties).forEach(function(key) {
		replaceKeysArray.push(key);
	});

	for (var i = 0; i < replaceKeysArray.length; i++) {
		var re = new RegExp("{" + replaceKeysArray[i] + "}","ig");

		var value = properties[replaceKeysArray[i]];
		value = String(value).replace(/,/ig,".");

		if (!isNaN(value)) {
			value = Math.ceil(value * 10)/10;
			value = value.toLocaleString('nl-NL');

		}
		content = content.replace(re, value);
	}

	// score direct feature
	var score = Math.ceil(window.combinedScore[properties.name] * 10)/10;
	content = content.replace(/\{_score_\}/ig, score.toLocaleString('nl-NL'));

	return content;
}


// behind the readmore button
var isCountyInfoActive = false; 
function country () {

	var listOfAllCounties = [];
	var listOfAllCounties_nl_name = [];
	Object.keys(euLayer.getGeoJSON()).forEach(function(key) {
		listOfAllCounties.push(euLayer.getGeoJSON()[key].properties.name);
		listOfAllCounties_nl_name.push(euLayer.getGeoJSON()[key].properties.nl_name);
	});

	var name = window.filterCountryName;
	var nl_name = listOfAllCounties_nl_name[listOfAllCounties.indexOf(name)];

	isCountyInfoActive = true;
	constructURL();

	console.log("`! " + name + " " + nl_name);

	var content = [];

	var i = 0;
	Object.keys(window.countrydescription).forEach(function(key) {
		if ( i!== 0) {
			// ignore the first row;
			content.push(window.countrydescription[key][window.filterCountryName]);
		}
		i++;
	});


	document.querySelector("#lightbox").style.zIndex = "2";
	document.querySelector("#lightbox").style.display = "block";

	document.querySelector("#lightbox").addEventListener("click", function(e){ hideLightbox(e); }, false);

	write2lightbox(content);
}

/// I dont going to explain this ;)
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

// If the site is fubar;
setTimeout(function(){ 
	if (window.subject.length < 1) {
		document.getElementById("introdata").innerHTML = "<div class='container'><h2>Sorry er iets misgegaan met het laden van de inhoud</h2> <p>Wacht een klein momentje of herlaad de pagina om het opnieuw te proberen</p></div>";
	}
}, 5000);

// For local users, firefox does handle this correct;
var isFF = 'MozAppearance' in document.documentElement.style;
if (window.location.protocol === "file:") {
	if (isFF) {
		console.error("Please use a webserver to test this visalisation");
	}
	else {
		alert("Please use a webserver to test this visalisation or use firefox");
		console.error("Please use a webserver to test this visalisation");
	}
}

// ineedrick;
var storeKeys = [],
	easteregg = "73,78,69,69,68,82,73,67,75";

document.addEventListener("keydown", function(e){ keyboardHandler(e); }, false);
function keyboardHandler (e) {
	
	// 27 == esc || 32 === space bar
	if ( (isCountyInfoActive || isHelpActive) && (e.keyCode === 27 || e.keyCode === 32) ) {
		hideLightbox (true);
	}

	// I Need Rick; Thats it;
	storeKeys.push(e.keyCode);
	if (storeKeys.toString().indexOf(easteregg) >= 0) {

		selectedVar = [window.subject[0]];
		window.filterCountryName = "DO";
		isFilterCountryActive = true;

		facepalm();
		country();

		storeKeys = [];
	}
}


// The screensaver, who doen't save your screen;
// Please wait 3,14 minutes to activate this;

// All used variables
// selectedVar
// isFilterCountryActive
// window.filterCountryName

var prevSelectedVar;
var prevIsFilterCountryActive;
var prevFilterCountryName;
var prevDocumentTitle;

var isUserActive = true;
function idle() {
	var t;
	// Thanks: http://stackoverflow.com/questions/667555/detecting-idle-time-in-javascript-elegantly

	// reset the screensaver if you do something;
	window.onload = resetTimer;
	window.onmousemove = resetTimer;
	window.onmousedown = resetTimer; // catches touchscreen presses
	window.onclick = resetTimer;     // catches touchpad clicks
	window.onscroll = resetTimer;    // catches scrolling with arrow keys
	window.onkeypress = resetTimer;
	var screensaver;

	function idleHelper() {
		isUserActive = false;

		prevSelectedVar = selectedVar;
		prevIsFilterCountryActive = isFilterCountryActive;
		prevFilterCountryName = window.filterCountryName;

		selectedVar = [];
		isFilterCountryActive = false;
		idleMode = 0;

		prevDocumentTitle = document.title;
		document.querySelector("#lightbox").style.zIndex = "2";
		document.querySelector("#lightbox").innerHTML = "<div class='rotating'><p>Beweeg je muis<br /> om verder te gaan</p><img src='images/history.svg' height='100px' width='100px'></div>";
		document.querySelector("#lightbox").style.display = "block";

		screensaver = setInterval(idleActive, 2000); // speed of slides
		console.log("~~~ Your inactive");
	}

	function resetTimer() {
		clearTimeout(t);
		t = setTimeout(idleHelper, 188400);  // time is in milliseconds 188400 == 3,14 minute

		if (!isUserActive) {
			console.log("~!isUserActive");
			window.location.reload(false); // true - Reloads the current page from the server

			// never excuted code:
			document.title = prevDocumentTitle;
			idleI = 0;
			clearInterval(screensaver);
			selectedVar = prevSelectedVar;
			document.querySelector("#lightbox").style.display = "none";

			isFilterCountryActive = prevIsFilterCountryActive;
			window.filterCountryName = prevFilterCountryName;
			constructURL();
			buildPage();
		}

		isUserActive = true;
	}
}

// no screensaver for mobile devices or very small screens;
var	windowwidth = window.innerWidth  || document.documentElement.clientWidth 	|| document.body.clientWidth;
if (windowwidth > 570) {
	idle();
}



// The screensaver animation;
var idleI = 0;
var idleMode = 0;
var index;
function idleActive () {

	switch(idleMode) {
		case 0:
			document.title = "~ " + prevDocumentTitle;

			if (idleI <= window.subject.length-1) {
				selectedVar.push(window.subject[idleI]);
				constructURL();
				buildPage();
				idleI++;
			}
			else {
				idleMode++;

				selectedVar = [];
				for (var i = 0; i < window.subject.length; i++) {
					selectedVar.push(window.subject[i]);
				}
			}
		break;
		case 1: 

			if (idleI > 0) {
				index = selectedVar.indexOf(selectedVar[idleI]);
				selectedVar.splice( index, 1 );

				constructURL();
				buildPage();

				idleI = idleI-2;
			}
			else {
				idleMode++;	
				idleI = window.subject.length-2;
			}

		break;

		case 2: 

			if (idleI > 0) {
				index = selectedVar.indexOf(selectedVar[idleI]);
				selectedVar.splice( index, 1 );

				constructURL();
				buildPage();

				idleI = idleI-2;
			}
			else {
				idleMode++;	
			}

		break;

		case 3:
			if (!isFilterCountryActive) {

				isFilterCountryActive = true;
				window.filterCountryName = "NL";

				idleI = 0;
				idleMode = 0;
				// selectedVar = [];

				// console.log(selectedVar);
			}
			else {
				idleMode++;	
			}

		break;
		case 4:
			if (idleI <= window.subject.length-1) {
				selectedVar.push(window.subject[idleI]);
				constructURL();
				buildPage();
				idleI++;
			}
			else {
				idleI = 0;
				idleMode++;	
			}			

		break;

		case 5:
			var listOfAllCounties = [];
			euLayer.eachLayer(function(layer) {
				if (!isNaN(layer.feature.properties[window.subject[0]]) && layer.feature.properties.name !== "DO" ) {
					listOfAllCounties.push(layer.feature.properties.name);
				}
			});
			// listOfAllCounties = ["UA", "RU", "SK"];

			if (idleI <= listOfAllCounties.length-1) {
				window.filterCountryName = listOfAllCounties[idleI];
				constructURL();
				buildPage();
				idleI++;
			}
			else {

				selectedVar = [];
				window.filterCountryName = "BE";
				isFilterCountryActive = false;

				idleI = 0;

				idleMode = 0;	
			}
		break;

		default:
			console.log("default");
		break;
	}



}




// Bijna alle dieren hebben een maandelijkse cyclus, behalve natuurlijk de weekdieren.