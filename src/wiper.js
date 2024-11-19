import { BaseVideoPlayer } from './video-player';

export class ComparisonWiper extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        const video1 = container.getElementsByTagName('video')[0];
        const video2 = container.getElementsByTagName('video')[1];
        
        this.addVideo(video1);
        this.addVideo(video2);
        
        this.setupWiper();
        this.syncVideos(0);
        this.videoContainer = container;
    }

    setupWiper() {
        const video1 = this.videos[0];
        const video2 = this.videos[1];
        const clipperOuter = document.createElement('div');        
        const clipper = document.createElement('div');
        clipperOuter.appendChild(clipper);
        video2.parentNode.insertBefore(clipperOuter, video2);
        clipper.appendChild(video2);

        this.video2Clipped = true;
        this.animationTriggered = false;
        // clipperOuter.style.backgroundColor = 'red';
        // video1.style.display = 'none';

        const aspectRatio = video1.videoWidth / video1.videoHeight;
        this.container.style.aspectRatio = `${aspectRatio} / 1`;

        // Monitor video1 progress to trigger animation
        video1.addEventListener('timeupdate', () => {
            if (!this.animationTriggered && video2.currentTime > video2.duration * 0.5) {
                requestAnimationFrame(() => {
                    clipperOuter.style.backgroundColor = 'white';
                });
                clipperOuter.getBoundingClientRect();
                this.startAnimation(clipperOuter);
                this.startAnimation(clipper);
                this.animationTriggered = true;
            }
        });

        // Swap videos when video1 seeks to the first half
        video1.addEventListener('seeked', () => {
            if (video1.currentTime < video1.duration * 0.5) {
                this.animationTriggered = false;
                clipper.style.clipPath = null;
                clipperOuter.style.clipPath = null;

                if (this.video2Clipped) {
                    const tempVideo = video1;
                    video1.parentNode.insertBefore(video2, video1);
                    clipper.appendChild(tempVideo);
                } else {
                    const tempVideo = video2;
                    video2.parentNode.insertBefore(video1, video2);
                    clipper.appendChild(tempVideo);
                }
                this.video2Clipped = !this.video2Clipped;
                requestAnimationFrame(() => {
                    clipperOuter.style.backgroundColor = null;
                });
            }
        });

        video1.addEventListener('loadstart', () => {
            this.animationTriggered = false;
            clipper.style.clipPath = null;
            clipperOuter.style.clipPath = null;
            if (video2.parentNode === this.videoContainer) {
                const tempVideo = video2;
                video2.parentNode.insertBefore(video1, video2);
                clipper.appendChild(tempVideo);
                this.video2Clipped = true;
                this.animationTriggered = false;
            } 
        });
    }

    startAnimation(clipper) {
        const startTime = Date.now();
        const duration = 1000;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);

            const clipPath = `polygon(
                0% ${200 - progress * 200 + 0.1}%,
                ${200 - progress * 200 + 0.1}% 0%,
                0% 0%
            )`;

            clipper.style.clipPath = clipPath;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}
