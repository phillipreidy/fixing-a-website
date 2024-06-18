let player;

// Insert YouTube API script
function initYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
 
// Create player for given video or default
function onYouTubeIframeAPIReady() {
    const defaultVideoId = 'usg5ZkFJIi4';
    const videoId = new URL(window.location.href).searchParams.get('video');
    
    // Create player
    player = new window.YT.Player('player', {
        width: '100%',
        height: '100%',
        videoId: videoId || defaultVideoId,
        events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }
    });

    // Set menu item active
    const menuItem = document.querySelector(`#video-section .sidebar li[data-video-id="${videoId}"]`)
    menuItem.classList.add('selected');
}

initYouTubeAPI();