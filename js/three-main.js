        //New scene and camera
			var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 1000 );
        
        //New Renderer
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

        //Add lighting
            scene.add(new THREE.AmbientLight(0x333333));
            
           
        //Create a sphere to make visualization easier.
            var geometry = new THREE.SphereGeometry(10,32,32);
            //For ellipsoid testing: geometry.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.0, 1.5 ) ); Try 6378137.0, 6356752.314140
            var material = new THREE.MeshPhongMaterial({
                    wireframe: true,
                    transparent: true
                });
            var sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
            
        //Draw the GeoJSON
            var test_json = $.getJSON("data/countries_states.geo.json", function (data) { 
                drawThreeGeo(data, 10, 'sphere', {
                    color: 'green'
                })    
            });          
            
            
        //Set the camera position
            camera.position.z = 20;            
            
        //Enable controls
            var controls = new THREE.TrackballControls(camera);
            
        //Render the image
            function render() {
                controls.update();
                requestAnimationFrame(render);
                //square.rotation.y += 0.001;      
                renderer.render(scene, camera);
            }
            
            render();





// // three-main

// 	// set the scene size
// 	var WIDTH = 400,
// 	    HEIGHT = 300;

// 	// set some camera attributes
// 	var VIEW_ANGLE = 45,
// 	    ASPECT = WIDTH / HEIGHT,
// 	    NEAR = 0.1,
// 	    FAR = 10000;

// 	// get the DOM element to attach to
// 	// - assume we've got jQuery to hand
// 	var $container = $('#container');

// 	// create a WebGL renderer, camera
// 	// and a scene
// 	var renderer = new THREE.WebGLRenderer();
// 	var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
// 	                                ASPECT,
// 	                                NEAR,
// 	                                FAR  );
// 	var scene = new THREE.Scene();

// 	// the camera starts at 0,0,0 so pull it back
// 	camera.position.z = 300;

// 	// start the renderer
// 	renderer.setSize(WIDTH, HEIGHT);

// 	// attach the render-supplied DOM element
// 	$container.append(renderer.domElement);

// 	// create the sphere's material
// 	var sphereMaterial = new THREE.MeshLambertMaterial(
// 	{
// 	    color: 0xCC0000
// 	});

// 	// set up the sphere vars
// 	var radius = 50, segments = 16, rings = 16;

// 	// create a new mesh with sphere geometry -
// 	// we will cover the sphereMaterial next!
// 	var sphere = new THREE.Mesh(
// 	   new THREE.SphereGeometry(radius, segments, rings),
// 	   sphereMaterial);

// 	// add the sphere to the scene
// 	scene.add(sphere);

// 	// and the camera
// 	scene.add(camera);

// 	// create a point light
// 	var pointLight = new THREE.PointLight( 0xFFFFFF );

// 	// set its position
// 	pointLight.position.x = 10;
// 	pointLight.position.y = 50;
// 	pointLight.position.z = 130;

// 	// add to the scene
// 	scene.add(pointLight);

// 	// draw!
// 	renderer.render(scene, camera);