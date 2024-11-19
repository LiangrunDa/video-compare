import { BaseVideoPlayer } from './video-player.js';

export class SideBySide extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.gap = '0px';
        const video1 = container.getElementsByTagName('video')[0];
        const video2 = container.getElementsByTagName('video')[1];
        this.initialize(video1, video2);
    }

    addVideo(video) {
        super.addVideo(video);
        video.style.width = '50%';
        video.style.height = 'auto';
        video.style.maxWidth = '50%';
        video.style.objectFit = 'contain';
    }

    initialize(leftVideo, rightVideo) {
        this.addVideo(leftVideo);
        this.addVideo(rightVideo);
        this.syncVideos(0);
    }
}
