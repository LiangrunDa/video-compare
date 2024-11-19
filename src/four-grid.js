import { BaseVideoPlayer } from './video-player.js';

export class FourGrid extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        // Get all videos
        const videos = container.getElementsByTagName('video');
        const video1 = videos[0];
        const video2 = videos[1];
        const video3 = videos[2];
        const video4 = videos[3];
        
        this.initialize(video1, video2, video3, video4);
    }

    initialize(video1, video2, video3, video4) {
        this.addVideoWithWrapper(video1);
        this.addVideoWithWrapper(video2);
        this.addVideoWithWrapper(video3);
        this.addVideoWithWrapper(video4);
        
        this.syncVideos(0);

        video1.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video1.videoWidth * 2 / (video1.videoHeight * 2)} / 1`;
        });
    }
}