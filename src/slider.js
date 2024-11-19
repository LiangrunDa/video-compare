import { BaseVideoPlayer } from './video-player';

export class ComparisonSlider extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        const video1 = container.getElementsByTagName('video')[0];
        const video2 = container.getElementsByTagName('video')[1];
        
        this.addVideo(video1);
        this.addVideo(video2);
        
        this.setupSlider();
        this.syncVideos(0);
    }

    setupSlider() {
        const video2 = this.videos[1];
        
        video2.style.width = '200%';
        video2.style.position = 'absolute';
        video2.style.height = '100%';
        video2.style.maxWidth = 'none';
        video2.style.left = '0';

        const clipper = document.createElement('div');
        clipper.style.width = '50%';
        clipper.style.position = 'absolute';
        clipper.style.top = '0';
        clipper.style.bottom = '0';
        clipper.style.overflow = 'hidden';
        clipper.style.zIndex = '3';
        clipper.style.boxShadow = '0 0 0 2px white';

        video2.parentNode.insertBefore(clipper, video2);
        clipper.appendChild(video2);

        const trackLocation = (e) => {
            const pageX = e.touches ? e.touches[0].pageX : e.pageX;
            const rect = this.container.getBoundingClientRect();
            const position = ((pageX - rect.left) / this.container.offsetWidth) * 100;

            if (position <= 100) {
                clipper.style.width = position + '%';
                video2.style.width = (100 / position) * 100 + '%';
            }
        };

        this.container.addEventListener('mousemove', trackLocation, false);
        this.container.addEventListener('touchstart', trackLocation, false);
        this.container.addEventListener('touchmove', trackLocation, false);
    }
}
