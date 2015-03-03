(function () {
    "use strict";
    //define audio analyser/initialize scene
    var analyser = AudioHelper.init();
    if(analyser === null)
    {
        return;
    }
    if (!WebGLHelper.init())
    {
        return;
    }

    var frequencyArray = new Uint8Array(analyser.frequencyBinCount),
        barArray = WebGLHelper.createBars(analyser.frequencyBinCount);
    
    //the magic:
    function render() {
        requestAnimationFrame(render);
        //retrieve byte array containing audio frequencies
        analyser.getByteFrequencyData(frequencyArray);

        //set bar array scale according to frequency array
        $.each(barArray, function setBarScale(i, el) {
            el.scale.x = (frequencyArray[i] + 0.01) / 8;
        });

        WebGLHelper.render();
    }
    
    render();
}());