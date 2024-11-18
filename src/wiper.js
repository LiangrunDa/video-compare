export function initializeComparisonWiper(container) {
    const video = container.getElementsByTagName('video')[1];
      
    video.style.width = '100%';
    video.style.position = 'absolute';
    video.style.height = '100%';
    video.style.maxWidth = 'none';
    video.style.left = '0';
    
    const clipper = document.createElement('div');
    clipper.style.width = '100%';
    clipper.style.position = 'absolute';
    clipper.style.top = '0';
    clipper.style.bottom = '0';
    clipper.style.overflow = 'hidden';
    clipper.style.zIndex = '3';
    
    video.parentNode.insertBefore(clipper, video);
    clipper.appendChild(video);
    console.log(clipper);

    const clippedVideo = clipper.getElementsByTagName("video")[0];
    const video1 = container.getElementsByTagName("video")[0];

    let animationTriggered = false;

    video1.addEventListener('timeupdate', () => {
      if (Math.abs(video1.currentTime - clippedVideo.currentTime) > 0.05) {
        clippedVideo.currentTime = video1.currentTime;
      }

      if (!animationTriggered && clippedVideo.currentTime > (clippedVideo.duration * 0.5)) {
        startAnimation(clipper);
        animationTriggered = true;
      }
    });

    video1.addEventListener('seeked', () => {
      if (video1.currentTime < (video1.duration * 0.5)) {
        animationTriggered = false;
        clipper.style.clipPath = null;
      }
    });
}

function startAnimation(clipper) {
    const box = clipper;
    const startTime = Date.now();
    const duration = 1000; 
    
    function animate() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      const clipPath = `polygon(
        0% ${200 - progress * 200}%,
        ${200 - progress * 200}% 0%,
        0% 0%
      )`;
      
      box.style.clipPath = clipPath;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }