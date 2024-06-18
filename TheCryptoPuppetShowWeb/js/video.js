var player;
    
    function initYouTubeAPI() {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function onYouTubeIframeAPIReady() {
        changeEpisode('YvJxhWcX_VU');
    }

    function changeEpisode(videoId) {
        if (player) {
            player.loadVideoById(videoId);
            $('#episodes-list li').removeClass('selected');
            $(`#episodes-list li[data-video-id="${videoId}"]`).addClass('selected');
        } else {
            createPlayer(videoId);
        }
    }

    function createPlayer(videoId) {
        player = new YT.Player('player', {
            height: '1000',
            width: '1000',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
    }

initYouTubeAPI();