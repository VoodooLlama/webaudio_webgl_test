(function() {
	//define static 3D scene
	var scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1E3),
	renderer = new THREE.WebGLRenderer(),
	ambientLight = new THREE.AmbientLight(0x00dd00);
	scene.add(ambientLight);

	//set initial camera positioning
	camera.position.z = 10;
		
	//inject canvas
	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
	document.body.appendChild(renderer.domElement);
	
	//create audio analyser
	var analyser = setupAudio(512);
	if (analyser == null)
	{
		return;
	}

	//define analyser frequency array
	var frequencyData = new Uint8Array(analyser.frequencyBinCount),

	//define frequency bars
	barArray = createFrequencyBars(analyser.frequencyBinCount);
	$.each(barArray, function(i, el) {
		scene.add(el);
	});

	//create and position bars representing audio frequency waveform
	// _count: amount of bars to create (should be seeded by analyser frequency interval count)
	// returns: array containing Three.js meshes
	function createFrequencyBars(_count)
	{
		var barArray = [];
		for(var i = 0; i < _count; i++)
		{
			var cube = createCubeMesh(.08, "0xffffff");
			//position in a circle
			cube.position.x = 5 * Math.cos((2 * Math.PI) * (i / _count));
			cube.position.y = 5 * Math.sin((2 * Math.PI) * (i / _count));
			//orient to origin
			cube.rotation.z = (2 * Math.PI) * (i / _count);
			barArray.push(cube);
		}
		return barArray;
	}

	//create cube mesh
	// _size: cube height/width/length
	// _color: hex color value
	// returns: cube mesh object
	function createCubeMesh(_size, _color)
	{
		var geoCube = new THREE.BoxGeometry(_size,_size,_size),
		matCube = new THREE.MeshLambertMaterial({color: _color});

		return new THREE.Mesh(geoCube, matCube);
	}


	//creates audio analyser, binds to audio element
	// _fft: fftSize for the audio analser (MUST BE A POWER OF TWO)
	// returns: analyser object
	function setupAudio(_fft)
	{
		//create audio context
		if(typeof AudioContext !== "undefined")
		{
			var context = new AudioContext();
		}
		else if(typeof webAudioContext !== "undefined")
		{
			var context = new webkitAudioContext();
		}
		else
		{
			console.warn("Requires a modern web browsers which support WebGL and WebAudio.");
			return null;
		}

		//create audio analyser from context
		var analyser = context.createAnalyser();
		analyser.fftSize = _fft;

		//add event listener to analyser which connects to the source when ready to play
		$("audio").bind('canplay', function() {
			var src = context.createMediaElementSource(this);
			src.connect(analyser);
			analyser.connect(context.destination);
		});

		return analyser;
	}

	//the magic
	function animate() {
		requestAnimationFrame(render);
		
		analyser.getByteFrequencyData(frequencyData);
		
		$.each(barArray, function(i, el) {
			el.scale.x = frequencyData[i] / 8;
		});
		
		renderer.render(scene, camera);
	};
	
	render();	
})();
	