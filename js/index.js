/*global $, THREE, AudioHelper, WebGLHelper, Uint8Array, requestAnimationFrame*/
(function () {
    "use strict";
    //initialize 3d scene
    var scene = new THREE.Scene(),
        settings = WebGLHelper.settings,
        camera = new THREE.PerspectiveCamera(settings.fov, settings.aspect, settings.near, settings.far),
        renderer = new THREE.WebGLRenderer(),
        //define audio analyser/initialize scene
        analyser = AudioHelper.init();
        if(analyser === null)
        {
            return;
        }
        var frequencyArray = new Uint8Array(analyser.frequencyBinCount),
        barArray = WebGLHelper.createBars(analyser.frequencyBinCount),
        i = 0;
    
    //prepare scene
    scene.add(new THREE.AmbientLight(0x00dd00));
    while (++i < barArray.length) {
        scene.add(barArray[i]);
    }
    camera.position.z = settings.positionZ;

    //inject WebGL canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
    try {
        document.body.appendChild(renderer.domElement);
    }
    catch(e) {
        console.warn('Error initializing WebGL canvas!');
    }
    
	//the magic
	function render() {
		requestAnimationFrame(render);
		
		analyser.getByteFrequencyData(frequencyArray);
		
		$.each(barArray, function setBarScale(i, el) {
			el.scale.x = (frequencyArray[i] + 0.01) / 8;
		});
		
		renderer.render(scene, camera);
	}
    
    render();
}());