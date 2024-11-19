import { BaseVideoPlayer } from './video-player';

export class ComparisonWiper extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        
        const video1 = container.getElementsByTagName('video')[1];
        const video2 = container.getElementsByTagName('video')[0];
        const wrapper1 = document.createElement('div');
        const wrapper2 = document.createElement('div');

        video1.parentNode.insertBefore(wrapper1, video1);
        wrapper1.appendChild(video1);
        video2.parentNode.insertBefore(wrapper2, video2);
        wrapper2.appendChild(video2);
        
        this.addVideoWithWrapper(video1, wrapper1);
        this.addVideoWithWrapper(video2, wrapper2);
        
        this.setupWiper();
        this.syncVideos(0);
    }

    setupWiper() {
        const video1 = this.videos[0];
        const video2 = this.videos[1];
        const wrapper1 = this.wrappers[0];
        const wrapper2 = this.wrappers[1];
        const clipperOuter = document.createElement('div');
        clipperOuter.classList.add('vc-wiper-clipper-outer');
        const clipper = document.createElement('div');
        clipper.classList.add('vc-wiper-clipper');
        clipperOuter.appendChild(clipper);
        wrapper2.parentNode.insertBefore(clipperOuter, wrapper2);
        clipper.appendChild(wrapper2);

        this.video2Clipped = true;
        this.animationTriggered = false;

        video1.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video1.videoWidth / video1.videoHeight} / 1`;
        });
        
        // Monitor video1 progress to trigger animation
        video1.addEventListener('timeupdate', () => {
            if (!this.animationTriggered && video2.currentTime > video2.duration * 0.5) {
                console.log('triggering animation');
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
                    const tempVideo = wrapper1;
                    wrapper1.parentNode.insertBefore(wrapper2, wrapper1);
                    clipper.appendChild(tempVideo);
                } else {
                    const tempVideo = wrapper2;
                    wrapper2.parentNode.insertBefore(wrapper1, wrapper2);
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
                const tempVideo = wrapper2;
                wrapper2.parentNode.insertBefore(wrapper1, wrapper2);
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
