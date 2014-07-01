/*global AudioContext, webkitAudioContext*/
//creates audio analyser, binds to audio element
// fft: fftSize for the audio analser (MUST BE A POWER OF TWO)
// returns: analyser object
var audioHelper = {
        init: function (fft) {
            "use strict";
            //create audio context
            var context, analyser, src;
            if (typeof AudioContext !== "undefined") {
                context = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
                context = new webkitAudioContext();
            } else {
                return null;
            }

            //create audio analyser from context
            analyser = context.createAnalyser();
            analyser.fftSize = fft;

            //add event listener to analyser which connects to the source when ready to play
            $("audio").bind('canplay', function bindAudioSource() {
                src = context.createMediaElementSource(this);
                src.connect(analyser);
                analyser.connect(context.destination);
            });

            return analyser;
        }
    };