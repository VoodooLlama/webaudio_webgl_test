/*global $, THREE, AudioHelper, WebGLHelper, Uint8Array, requestAnimationFrame*/
(function () {
    "use strict";
	//define static 3D scene
	var scene = new THREE.Scene(),
	    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1E-1, 1E3),
	    renderer = new THREE.WebGLRenderer(),
        //define audio analyser/frequency array
        analyser = AudioHelper.init(512),
        frequencyArray = new Uint8Array(analyser.frequencyBinCount),
        barArray = WebGLHelper.createBars(analyser.frequencyBinCount);
    
    //compose scene
	scene.add(new THREE.AmbientLight(0x00dd00));
    $.each(barArray, function (i, el) {
		scene.add(el);
	});
    
	camera.position.z = 10;

	//inject canvas
	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
	document.body.appendChild(renderer.domElement);
	
	//the magic
	function render() {
        requestAnimationFrame(render);

        analyser.getByteFrequencyData(frequencyArray);
		
		$.each(barArray, function setBarScale(i, el) {
			el.scale.x = frequencyArray[i] / 8;
            //fix to avoid console warnings from a scale of 0
            if(el.scale.x <= 0)
            {
                el.scale.x = 0.01;
            }
		});
		
		renderer.render(scene, camera);
	}
    
    render();
}());
	