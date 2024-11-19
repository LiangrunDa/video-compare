import { BaseVideoPlayer } from './video-player';

export class ComparisonSlider extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        const video1 = container.getElementsByTagName('video')[1];
        const video2 = container.getElementsByTagName('video')[0];

        this.addVideoWithWrapper(video1);
        this.addVideoWithWrapper(video2);
        
        this.setupSlider();
        this.syncVideos(0);
    }

    setupSlider() {
        const wrapper2 = this.wrappers[1];
        const clipper = document.createElement('div');
        clipper.classList.add('vc-slider-clipper');

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
        this.addCaption(video3, this.wrappers[0]);
        if (this.captions.length > 2) {
            this.captions[2].style.bottom = null;
            this.captions[2].style.top = '5px';
            this.captions[2].style.right = '5px';
            this.captions[2].style.zIndex = '5';
            this.captions[2].style.fontSize = '10px';
            this.captions[2].style.padding = '2px 4px';
            this.captions[2].style.borderRadius = '2px';
            this.captions[2].style.minHeight = 'fit-content';
            this.captions[2].style.lineHeight = '1.4';
            this.captions[2].style.wordBreak = 'break-word';
            this.captions[2].style.maxWidth = '80%';
        }


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