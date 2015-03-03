//Helper functions to initialize and render WebGL scene elements
var WebGLHelper = (function () {
    "use strict";
    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        _settings = {
            fov: 75,
            aspect: window.innerWidth / window.innerHeight,
            near: 1E-1,
            far: 1E3,
            positionZ: 10,
            cubeColor: 0xffffff
        },
        camera = new THREE.PerspectiveCamera(_settings.fov, _settings.aspect, _settings.near, _settings.far),
        _cubeSettings = {
            size: 8E-2,
            color: "0xffffff"
        };

    //initialize WebGL scene
    // returns: boolean representing whether initialization was successful
    function initializeScene() {
        //set up scene elements
        scene.add(new THREE.AmbientLight(0x00ff00));
        camera.position.z = _settings.positionZ;

        renderer.setSize(window.innerWidth, window.innerHeight);

        //attempt to inject WebGL canvas
        try {
            document.body.appendChild(renderer.domElement);
        }
        catch(e) {
            document.write('Error initializing WebGL canvas!');
            return false;
        }

        //resize renderer on window resize
        $(window).on('resize', function resizeWindow()
        {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
        });
        return true;
    }

    //return new cube mesh according to params
    // size: cube height/width/length
    // color: hex color value
    // returns: cube mesh object    
    function _createCubeMesh() {
        var geoCube = new THREE.BoxGeometry(_cubeSettings.size, _cubeSettings.size, _cubeSettings.size),
            matCube = new THREE.MeshPhongMaterial({color: _cubeSettings.color});
        return new THREE.Mesh(geoCube, matCube);
    }
    
    //create and position bars representing audio frequency waveform
    // count: amount of bars to create (should be seeded by analyser frequency interval count)
    // returns: array containing Three.js meshes
    function createBarArray(count) {
        var barArray = [],
            twoPI = Math.PI * 2,
            interval,
            cube,
            i = 0;
        while (++i <= count) {
            cube = _createCubeMesh();
            interval = i / count;
            
            //position in a circle        
            cube.position.x = 5 * Math.cos(twoPI * interval);
            cube.position.y = 5 * Math.sin(twoPI * interval);

            //orient to origin
            cube.rotation.z = twoPI * interval;
            barArray.push(cube);
        }
        _addBarArrayToScene(barArray);
        return barArray;
    }

    //add each generated 3d bar to the scene
    function _addBarArrayToScene(bars) {
        $.each(bars, function addBarsToScene(i, el) {
            scene.add(el);
        });
    }

    //render the scene
    function render()
    {
        renderer.render(scene, camera);
    }
    
    return {
        init: initializeScene,
        createBars: createBarArray,
        render: render
    };
})();