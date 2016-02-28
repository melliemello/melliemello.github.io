var VideoApp = (function () {
    var app = {},
        playlist = [],
        currentIndex = 0,
        player,
        iframe,
        hasChanged = false;

    app.init = function(initial_playlist){
        playlist = initial_playlist,
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });

    }

    function onPlayerReady(event) {
        player.loadPlaylist({playlist,
                            index:0,
                            startSeconds:0})
    }

    function onPlayerStateChange(event) {
        var state = event.data;

        if (state === 0 && hasChanged) {
            hasChanged = false;
            player.loadPlaylist({playlist,
                            index:0,
                            startSeconds:0})
        }
    }

    app.playFullscreen = function(){
        iframe = document.getElementById('player');
        // player.playVideo();

        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
        }
    }

    app.changePlaylist = function(videoData) {
        playlist = videoData;
        hasChanged = true;
    }

    return app;
}());

var UI = (function () {
    var ui = {},
        videoIds,
        videos = {},
        $videoList,
        $controlPanel;

    ui.init = function(videoData) {
        var url;
        videoIds = videoData,
        counter = 0;

        $videoList = $('#video_list');
        $controlPanel = $('#control_panel');

        _getVideoTitle(videos, 0);
        _initControlPanel();
    }

    function _getVideoTitle(videos, counter) {
        var url,
            videoId = videoIds[counter];

        if (counter === videoIds.length) {
            _buildVideoList();
            return;
        }

        url = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=AIzaSyCEw2SfekRZIMXcO511RI9vclQfhQM5R_c&fields=items(snippet(title))&part=snippet'

        $.getJSON(url, function(data){
            videos[videoId] = {};
            videos[videoId]['title'] = data.items[0].snippet.title;
            videos[videoId]['thumbSrc'] = 'http://img.youtube.com/vi/' + videoId + '/0.jpg';
            counter++;
            _getVideoTitle(videos, counter);
        });
    }

    function _buildVideoList() {
        var videoId;

        for (var i = 0, len = videoIds.length; i < len; i++) {
            videoId = videoIds[i];
            $videoList.append('<li class="video-list_item clearfix" data-video_id="' + videoId + '">'+ '<div class="image-container" style="background-image: url(' + videos[videoId]['thumbSrc'] + ');"></div>' + videos[videoId]['title'] + '</li>')
        }
    }

    function _initControlPanel() {
        $controlPanel.on('click', '.control_panel_trigger', function(){
            $controlPanel.toggleClass('active');
        })
    }

    ui.getOrderedList = function() {
        var newList = [];
        $videoList.find('li').each(function(){
            newList.push($(this).attr('data-video_id'));
        });

        return newList;
    }

    return ui;
}());


/////////////////
// VIDEO DB DATA
var videoData = ['QibaFmAbvOk', 'KmzFDEu2RoA', 'GwDpCiKBRHQ'];

function onYouTubeIframeAPIReady() {
    VideoApp.init(videoData);
}

$(document).ready(function(){
    UI.init(videoData);
    var $button = $("#change"),
        $fullscreenButton = $('#play_fullscreen');

    var videoList = document.getElementById('video_list');
    var sortable = Sortable.create(videoList, {
        onStart: function(e) {
            $(e.item).addClass('active');
        },
        onEnd: function(e) {
            $(e.item).removeClass('active');
        }
    });

    $button.on('click', function(e) {
        e.preventDefault()
        VideoApp.changePlaylist(UI.getOrderedList());
        $('#messages').html('<i class="fa fa-info-circle"></i>&nbsp;You have changed the playlist order.<br/> List will be updated after the current video has ended.');
        setTimeout(function(){
            $('#messages').html('');
        }, 6000);
    });

    $fullscreenButton.on('click', function(){
        VideoApp.playFullscreen();
    });

    // $fullscreenButton.trigger('click');
});

