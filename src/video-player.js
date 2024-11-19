export class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.wrappers = [];
        this.readyStates = [];
    }

    addVideo(video, wrapper) {
        const index = this.videos.length;
        this.videos.push(video);
        this.wrappers.push(wrapper);
        this.readyStates.push(false);
        wrapper.classList.add('video-wrapper');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.maxWidth = 'none';
        

        video.addEventListener('loadstart', () => this.resetReadyStates());
        video.addEventListener('canplaythrough', () => {
            this.readyStates[index] = true;
            this.checkAndPlay();
        });
    }

    resetReadyStates() {
        this.readyStates.fill(false);
        this.videos.forEach(video => video.pause());
        this.videos.forEach(video => video.currentTime = 0);
    }

    checkAndPlay() {
        if (this.readyStates.every(state => state)) {
            this.videos.forEach(video => video.play());
        }
    }

    syncVideos(sourceIndex = 0) {
        const sourceVideo = this.videos[sourceIndex];
        sourceVideo.addEventListener('timeupdate', () => {
            this.videos.forEach((video, index) => {
                if (index !== sourceIndex && Math.abs(video.currentTime - sourceVideo.currentTime) > 0.05) {
                    video.currentTime = sourceVideo.currentTime;
                }
            });
        });
    }
}