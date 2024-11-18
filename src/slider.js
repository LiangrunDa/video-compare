
export function initializeComparisonSlider(container) {
    const video = container.getElementsByTagName('video')[1];
      
    video.style.width = '200%';
    video.style.position = 'absolute';
    video.style.height = '100%';
    video.style.maxWidth = 'none';
    video.style.left = '0';
    
    const clipper = document.createElement('div');
    clipper.className = 'video-clipper';
    clipper.style.width = '50%';
    clipper.style.position = 'absolute';
    clipper.style.top = '0';
    clipper.style.bottom = '0';
    clipper.style.overflow = 'hidden';
    clipper.style.zIndex = '3';
    clipper.style.boxShadow = '0 0 0 2px white';
    
    video.parentNode.insertBefore(clipper, video);
    clipper.appendChild(video);
    console.log(clipper);
    

    const clippedVideo = clipper.getElementsByTagName("video")[0];
    const video1 = container.getElementsByTagName("video")[0];


    video1.addEventListener('timeupdate', () => {
      if (Math.abs(video1.currentTime - clippedVideo.currentTime) > 0.05) {
        clippedVideo.currentTime = video1.currentTime;
      }
    });
  
    function trackLocation(e) {
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      const rect = container.getBoundingClientRect();
      const position = ((pageX - rect.left) / container.offsetWidth) * 100;
      
      if (position <= 100) {
        clipper.style.width = position + "%";
        clippedVideo.style.width = ((100/position) * 100) + "%";
      }
    }
  
    container.addEventListener("mousemove", trackLocation, false);
    container.addEventListener("touchstart", trackLocation, false);
    container.addEventListener("touchmove", trackLocation, false);
}