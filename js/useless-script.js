
// // Nice idea but it fails completly
// function svgParser (object) {
// 		// ((.)[0-9]*(\..[0-9]*))

// 						var object = document.getElementById(d["properties"]["name"]);


// 	svgThisCountry = object.getAttribute('d');
// 	console.log(svgThisCountry);

// 	svgThisCountryA = svgThisCountry.split(",");

// 	var	svgObject = [];
// 	for (var i = 0; i < svgThisCountryA.length; i++) {
// 		if (svgThisCountryA[i].indexOf("L") > -1) {
// 			var obj =  svgThisCountryA[i].split("L")

// 			svgObject.push(obj[0])
// 			svgObject.push(obj[obj.length-1])
// 			// console.log(obj);
// 		}
// 		else if(svgThisCountryA[i].indexOf("M") > -1){
// 			var obj =  svgThisCountryA[i].split("M")
// 			svgObject.push(obj[1])
// 			// console.log(obj[1]);
// 		}
// 		else {
// 			console.log(svgThisCountryA[i])
// 			svgObject.push(svgThisCountryA[i])
// 		}
		
// 	}

// 	for (var i = 0; i < svgObject.length; i++) {
// 		i++;

// 		console.log(svgObject[i] + " " + i )
// 	};



// }