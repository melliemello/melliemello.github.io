var APP = (function () {
    var app = {},
        playlist = [],
        player;

    app.init = function(){
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'x5Dpz6w_jz4',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange() {
        alert('changed');
    }



    return app;
}());

function onYouTubeIframeAPIReady() {
    APP.init();
}