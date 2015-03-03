/*global $, AudioContext, webkitAudioContext, Audio*/
//creates audio analyser, binds to audio element
// fft: fftSize for the audio analyser (MUST BE A POWER OF TWO)
// returns: analyser object
var AudioHelper =  (function () {
        "use strict";
        var context,
            _settings = {
                audioSource: "http://javanese.imslp.info/files/imglnks/usimg/6/69/IMSLP74221-PMLP04611-pachelbel_canonind.mp3",
                fftSize: 512,
                smoothing: .8
            };

        //creates Web Audio API context
        //returns: context or null if unsupported
        function _createContext() {
            //create audio context
            var context;
            if (typeof AudioContext !== "undefined") {
                context = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
                context = new webkitAudioContext();
            } else {
                console.warn('Web Audio API not supported!');
                context = null;
            }
            return context;
        }

        //creates and injects audio element into body
        //returns: Audio element
        function _injectAudio() {
            //inject audio tag
            var audio = new Audio();
            audio.src = _settings.audioSource;
            audio.autoplay = true;
            audio.id = "audioPlayer";
            document.body.appendChild(audio);
            
            return audio;
        }

        //sets up audio context and source, connects audio nodes
        //returns: analyser node
        function initializeAudioAnalyser() {

            //create audio context and analyser
            context = _createContext();
            var analyserNode = context.createAnalyser();
            analyserNode.fftSize = _settings.fftSize;
            analyserNode.smoothingTimeConstant = _settings.smoothing;

            //inject Audio element into DOM
            var audio = _injectAudio(),
            //bind analyser to audio source
            src = context.createMediaElementSource(audio);
            src.connect(analyserNode);
            analyserNode.connect(context.destination);
            
            return analyserNode;
        }
        
        return {
            init: initializeAudioAnalyser
        };
    })();