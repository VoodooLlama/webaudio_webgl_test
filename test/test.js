module("WebGLHelper");
QUnit.test("Create array containing bar meshes", function(assert) {
    var seed = 32,
    barArray = [];
    function validateType(i, el)
    {
           assert.ok(el instanceof THREE.Mesh, "Bar " + (i + 1) + " is an instance of type THREE.Mesh"); 
    }
    barArray = WebGLHelper.createBars(seed);
    assert.equal($.type(barArray), "array", "Object returned is an array");
    assert.equal(barArray.length, seed, "Bar array length is equivalent to seed: " + seed);
    $.each(barArray, function(i, el) {
        validateType(i, el);
    });
});

module("AudioHelper");
QUnit.test("Create AudioContext analyser and inject Audio player", function(assert) {
    var actual = AudioHelper.init();
    var audio = document.getElementById('audioPlayer');
    var boolAudioInstance = audio instanceof Audio;
    assert.ok(boolAudioInstance, "Audio successfully injected");
    if(boolAudioInstance)
    {
        audio.pause();
    }
    assert.ok(actual instanceof AnalyserNode, "Analyser is an instance of type AnalyserNode");
});