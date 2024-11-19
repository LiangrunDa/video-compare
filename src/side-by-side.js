import { BaseVideoPlayer } from './video-player.js';

export class SideBySide extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        // Create wrappers
        const wrapper1 = document.createElement('div');
        const wrapper2 = document.createElement('div');
        const video1 = container.getElementsByTagName('video')[0];
        const video2 = container.getElementsByTagName('video')[1];
        
        // Wrap videos
        video1.parentNode.insertBefore(wrapper1, video1);
        wrapper1.appendChild(video1);
        video2.parentNode.insertBefore(wrapper2, video2);
        wrapper2.appendChild(video2);
        
        this.initialize(video1, video2, wrapper1, wrapper2);
    }

    addVideoWithWrapper(video, wrapper) {
        super.addVideoWithWrapper(video, wrapper);
    }

    initialize(leftVideo, rightVideo, leftWrapper, rightWrapper) {
        this.addVideoWithWrapper(leftVideo, leftWrapper);
        this.addVideoWithWrapper(rightVideo, rightWrapper);
        this.syncVideos(0);

        leftVideo.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${leftVideo.videoWidth * 2 / leftVideo.videoHeight} / 1`;
        });
    }
}
