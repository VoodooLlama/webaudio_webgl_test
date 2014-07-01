/*global $, THREE, audioHelper, webGLHelper, Uint8Array, requestAnimationFrame*/
(function () {
    "use strict";
	//define static 3D scene
	var scene = new THREE.Scene(),
	    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1E-1, 1E3),
	    renderer = new THREE.WebGLRenderer(),
        
        //define audio analyser/frequency array
        analyser = audioHelper.init(512),
        frequencyData = new Uint8Array(analyser.frequencyBinCount),
        barArray = webGLHelper.createFrequencyBars(analyser.frequencyBinCount);
    
    //compose scene
	scene.add(new THREE.AmbientLight(0x00dd00));
    $.each(barArray, function (i, el) {
        //alert(el.position.x);
		scene.add(el);
	});
    
	camera.position.z = 10;

	//inject canvas
	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
	document.body.appendChild(renderer.domElement);
	
	//the magic
	function render() {
		requestAnimationFrame(render);
		
		analyser.getByteFrequencyData(frequencyData);
		
		$.each(barArray, function setFrequencyScale(i, el) {
			el.scale.x = frequencyData[i] / 8;
		});
		
		renderer.render(scene, camera);
	}
    
    render();
}());
	