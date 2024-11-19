import { BaseVideoPlayer } from './video-player.js';

export class SideBySide extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.gap = '0px';
        
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

    addVideo(video, wrapper) {
        super.addVideo(video, wrapper);
        wrapper.style.width = '50%';
        wrapper.style.height = 'auto';
        wrapper.style.maxWidth = '50%';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
    }

    initialize(leftVideo, rightVideo, leftWrapper, rightWrapper) {
        this.addVideo(leftVideo, leftWrapper);
        this.addVideo(rightVideo, rightWrapper);
        this.syncVideos(0);
    }
}
