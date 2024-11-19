import { BaseVideoPlayer } from './video-player.js';

export class FourGrid extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        // Create wrappers
        const wrapper1 = document.createElement('div');
        const wrapper2 = document.createElement('div');
        const wrapper3 = document.createElement('div');
        const wrapper4 = document.createElement('div');
        
        // Get all videos
        const videos = container.getElementsByTagName('video');
        const video1 = videos[0];
        const video2 = videos[1];
        const video3 = videos[2];
        const video4 = videos[3];
        
        // Wrap videos
        video1.parentNode.insertBefore(wrapper1, video1);
        wrapper1.appendChild(video1);
        video2.parentNode.insertBefore(wrapper2, video2);
        wrapper2.appendChild(video2);
        video3.parentNode.insertBefore(wrapper3, video3);
        wrapper3.appendChild(video3);
        video4.parentNode.insertBefore(wrapper4, video4);
        wrapper4.appendChild(video4);
        
        this.initialize(video1, video2, video3, video4, wrapper1, wrapper2, wrapper3, wrapper4);
    }

    addVideoWithWrapper(video, wrapper) {
        super.addVideoWithWrapper(video, wrapper);
    }

    initialize(video1, video2, video3, video4, wrapper1, wrapper2, wrapper3, wrapper4) {
        this.addVideoWithWrapper(video1, wrapper1);
        this.addVideoWithWrapper(video2, wrapper2);
        this.addVideoWithWrapper(video3, wrapper3);
        this.addVideoWithWrapper(video4, wrapper4);
        
        this.syncVideos(0);

        video1.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video1.videoWidth * 2 / (video1.videoHeight * 2)} / 1`;
        });
    }
}