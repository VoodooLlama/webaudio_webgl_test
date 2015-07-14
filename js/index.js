(function () {
    "use strict";
    //define audio analyser
    var analyser = AudioHelper.init();

    //initialize scene
    if (!WebGLHelper.init() || !analyser)
    {
        return;
    }

    var freqBinCount = analyser.frequencyBinCount,
        frequencyArray = new Uint8Array(freqBinCount),
        barArray = WebGLHelper.createBars(freqBinCount);
    
    //the magic
    function render() {
        requestAnimationFrame(render);
        //retrieve byte array containing audio frequencies
        analyser.getByteFrequencyData(frequencyArray);
        console.log(frequencyArray);
        //set bar array scale according to frequency array
        $.each(barArray, function setBarScale(i, el) {
            el.scale.x = (frequencyArray[i] + 0.01) / 8;
        });

        WebGLHelper.render();
    }

    render();
    
}());