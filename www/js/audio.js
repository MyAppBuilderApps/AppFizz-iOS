cordova.define("cordova/plugin/audioplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var AudioPlayer = function () {};

    /**
     * Starts the audio player intent
     *
     * @param url           The url to play
     */
    AudioPlayer.prototype.play = function(url) {
        exec(null, null, "AudioPlayer", "playAudio", [url]);
    };

    var audioPlayer = new AudioPlayer();
    module.exports = audioPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.audioPlayer) {
    window.plugins.audioPlayer = cordova.require("cordova/plugin/audioplayer");
}
