//Helper functions for WebGL
/*global THREE*/
var WebGLHelper = {
    
    //return new cube mesh according to params
    // size: cube height/width/length
    // color: hex color value
    // returns: cube mesh object    
    _createCubeMesh: function (size, color) {
        "use strict";
        var geoCube = new THREE.BoxGeometry(size, size, size),
            matCube = new THREE.MeshLambertMaterial({color: color});
        return new THREE.Mesh(geoCube, matCube);
    },
    
    //create and position bars representing audio frequency waveform
    // count: amount of bars to create (should be seeded by analyser frequency interval count)
    // returns: array containing Three.js meshes
    createFrequencyBars: function (count) {
        "use strict";
        var barArray = [],
            twoPI = Math.PI * 2,
            interval,
            cube,
            i;
        for (i = 0; i < count; i += 1) {
            cube = this._createCubeMesh(8E-2, "0xffffff");
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
};