export class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.readyStates = [];
    }

    addVideo(video) {
        const index = this.videos.length;
        this.videos.push(video);
        this.readyStates.push(false);

        video.addEventListener('loadstart', () => this.resetReadyStates());
        video.addEventListener('canplaythrough', () => {
            this.readyStates[index] = true;
            this.checkAndPlay();
        });
    }

    resetReadyStates() {
        console.log('resetReadyStates');
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