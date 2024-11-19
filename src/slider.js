import { BaseVideoPlayer } from './video-player';

export class ComparisonSlider extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        // Create wrappers for videos
        const wrapper1 = document.createElement('div');
        const wrapper2 = document.createElement('div');
        const video1 = container.getElementsByTagName('video')[1];
        const video2 = container.getElementsByTagName('video')[0];
        
        // Wrap videos
        video1.parentNode.insertBefore(wrapper1, video1);
        wrapper1.appendChild(video1);
        video2.parentNode.insertBefore(wrapper2, video2);
        wrapper2.appendChild(video2);
        
        this.addVideoWithWrapper(video1, wrapper1);
        this.addVideoWithWrapper(video2, wrapper2);
        
        this.setupSlider();
        this.syncVideos(0);
    }

    setupSlider() {
        const wrapper2 = this.wrappers[1];
        
        wrapper2.style.width = '200%';
        wrapper2.style.position = 'absolute';
        wrapper2.style.height = '100%';
        wrapper2.style.maxWidth = 'none';
        wrapper2.style.left = '0';

        const clipper = document.createElement('div');
        clipper.style.width = '50%';
        clipper.style.position = 'absolute';
        clipper.style.top = '0';
        clipper.style.bottom = '0';
        clipper.style.overflow = 'hidden';
        clipper.style.zIndex = '3';
        clipper.style.boxShadow = '0 0 0 2px white';

        wrapper2.parentNode.insertBefore(clipper, wrapper2);
        clipper.appendChild(wrapper2);

        if (this.captions.length > 1) {
            this.captions[1].style.right = null;
            this.captions[1].style.left = '10px';
        }

        const video = this.videos[0];
        video.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video.videoWidth / video.videoHeight} / 1`;
        });

        const trackLocation = (e) => {
            const pageX = e.touches ? e.touches[0].pageX : e.pageX;
            const rect = this.container.getBoundingClientRect();
            const position = ((pageX - rect.left) / this.container.offsetWidth) * 100;

            if (position <= 100) {
                clipper.style.width = position + '%';
                wrapper2.style.width = (100 / position) * 100 + '%';
            }
        };

        this.container.addEventListener('mousemove', trackLocation, false);
        this.container.addEventListener('touchstart', trackLocation, false);
        this.container.addEventListener('touchmove', trackLocation, false);
    }
}

export class ThreeVideoComparison extends ComparisonSlider {
    constructor(container) {
        super(container);
        
        // Get the third video
        const video3 = container.getElementsByTagName('video')[2];
        this.addVideo(video3);
        // this.addCaption(video3);
        // this.captions[2].style.bottom = null;
        // this.captions[2].style.top = '10px';

        // Add the third video to the second wrapper
        this.wrappers[0].appendChild(video3);
        video3.style.width = '20%';
        video3.style.height = '20%';
        video3.style.position = 'absolute';
        video3.style.top = '0';
        video3.style.right = '0';
        video3.style.zIndex = '4';

        // Sync the third video with others
        this.syncVideos(0);
    }
}