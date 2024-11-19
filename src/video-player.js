export class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.wrappers = [];
        this.readyStates = [];
        this.captions = [];
    }

    addVideo(video) {
        const index = this.videos.length;
        this.videos.push(video);
        this.readyStates.push(false);
        video.addEventListener('loadstart', () => this.resetReadyStates());
        video.addEventListener('canplaythrough', () => {
            this.readyStates[index] = true;
            this.checkAndPlay();
        });
    }

    addCaption(video, wrapper) {
        // Add caption if vc-caption attribute exists
        const caption = video.getAttribute('vc-caption');
        if (caption) {
            const captionDiv = document.createElement('span');
            captionDiv.textContent = caption;
            captionDiv.style.position = 'absolute';
            captionDiv.style.bottom = '10px';
            captionDiv.style.right = '10px';
            captionDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            captionDiv.style.color = 'white';
            captionDiv.style.padding = '5px 10px';
            captionDiv.style.borderRadius = '4px';
            captionDiv.style.minHeight = 'fit-content';
            captionDiv.style.lineHeight = '1.4';
            captionDiv.style.wordBreak = 'break-word';
            captionDiv.style.maxWidth = '80%';
            wrapper.appendChild(captionDiv);
            this.captions.push(captionDiv);

            // Watch for changes to vc-caption attribute
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'vc-caption') {
                        const newCaption = video.getAttribute('vc-caption');
                        captionDiv.textContent = newCaption;
                    }
                });
            });

            observer.observe(video, {
                attributes: true,
                attributeFilter: ['vc-caption']
            });
        }
    }

    addVideoWithWrapper(video, wrapper) {
        this.addVideo(video);
        this.wrappers.push(wrapper);
        wrapper.classList.add('video-wrapper');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.maxWidth = 'none';
        this.addCaption(video, wrapper);
        
    }

    resetReadyStates() {
        this.readyStates.fill(false);
        this.videos.forEach(video => video.pause());
        this.videos.forEach(video => video.currentTime = 0);
    }

    checkAndPlay() {
        if (this.readyStates.every(state => state)) {
            this.videos.forEach(video => video.play());
        }
    }

    syncVideos(sourceIndex = 0) {
        const sourceVideo = this.videos[sourceIndex];
        sourceVideo.addEventListener('timeupdate', () => {
            this.videos.forEach((video, index) => {
                if (index !== sourceIndex && Math.abs(video.currentTime - sourceVideo.currentTime) > 0.05) {
                    video.currentTime = sourceVideo.currentTime;
                }
            });
        });
    }
}