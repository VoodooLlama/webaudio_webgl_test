//Helper functions for WebGL
/*global THREE*/
var WebGLHelper = (function () {
    "use strict";
    var settings = {
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 1E-1,
        far: 1E3,
        positionZ: 10,
        cubeColor: 0xffffff
    };
    var cubeSettings = {
        size: 8E-2,
        color: "0xffffff"
    }

    //return new cube mesh according to params
    // size: cube height/width/length
    // color: hex color value
    // returns: cube mesh object    
    function _createCubeMesh() {
        var geoCube = new THREE.BoxGeometry(cubeSettings.size, cubeSettings.size, cubeSettings.size),
            matCube = new THREE.MeshPhongMaterial({color: cubeSettings.color});
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
        return barArray;
    }
    
    return {
        createBars: createBarArray,
        settings: settings
    };
})();