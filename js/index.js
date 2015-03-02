/*global $, THREE, AudioHelper, WebGLHelper, Uint8Array, requestAnimationFrame*/
(function () {
    "use strict";
	//define static 3D scene
	var scene = new THREE.Scene(),
	    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1E-1, 1E3),
	    renderer = new THREE.WebGLRenderer(),
        //define audio analyser/frequency array
        analyser = AudioHelper.init(512);

    if(analyser === null)
    {
        console.warn('Error initializing Web Audio API!');
        return;
    }

    var frequencyArray = new Uint8Array(analyser.frequencyBinCount),
        barArray = WebGLHelper.createBars(analyser.frequencyBinCount);
    
    //compose scene
	scene.add(new THREE.AmbientLight(0x00dd00));
    $.each(barArray, function (i, el) {
		scene.add(el);
	});
    
	camera.position.z = 10;

	//inject canvas
	renderer.setSize(window.innerWidth, window.innerHeight);
    try {
        document.body.appendChild(renderer.domElement);
    }
    catch(e) {
        console.warn('Error initializing WebGL canvas!');
        return;
    }


	//the magic
	function render() {
        requestAnimationFrame(render);

        analyser.getByteFrequencyData(frequencyArray);

        //scale bars according to frequency analyser
		$.each(barArray, function setBarScale(i, el) {
            //fix to avoid console warnings from a scale of 0
            el.scale.x = (frequencyArray[i] +.01) / 8;
		});
		
		renderer.render(scene, camera);
	}
    
    render();
}());
	