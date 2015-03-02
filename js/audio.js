/*global $, AudioContext, webkitAudioContext*/
//creates audio analyser, binds to audio element
// fft: fftSize for the audio analyser (MUST BE A POWER OF TWO)
// returns: analyser object connected to context media
var AudioHelper =  {
        init: function initializeAudioAnalyser(fft) {
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

            //inject audio element
            $( "<audio></audio>", {
                "class": "audio",
                "autoplay": true,
                "src": "http://javanese.imslp.info/files/imglnks/usimg/6/69/IMSLP74221-PMLP04611-pachelbel_canonind.mp3",
                canplay: function bindAudioSource( event ) {
                    src = context.createMediaElementSource(this);
                    src.connect(analyser);
                    analyser.connect(context.destination);
                }
            })
            .appendTo( "body" );

            return analyser;
        }
    };