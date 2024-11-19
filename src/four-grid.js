import { BaseVideoPlayer } from './video-player.js';

export class FourGrid extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        const videos = container.getElementsByTagName('video');
        this.initialize(videos);
    }

    initialize(videos) {
        for (const video of videos) {
            this.addVideoWithWrapper(video);
        }
        
        this.syncVideos(0);

        videos[0].addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${videos[0].videoWidth * 2 / (videos[0].videoHeight * 2)} / 1`;
        });
    }
}