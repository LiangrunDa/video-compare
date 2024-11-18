export function initializeComparisonWiper(container) {
    const video1 = container.getElementsByTagName('video')[0];
    const video2 = container.getElementsByTagName('video')[1];
    const clipper = document.createElement('div');

    video2.parentNode.insertBefore(clipper, video2);
    clipper.appendChild(video2);

    let video2Clipped = true;
    let animationTriggered = false;

    video1.addEventListener('timeupdate', () => {
        if (Math.abs(video1.currentTime - video2.currentTime) > 0.05) {
            video2.currentTime = video1.currentTime;
        }

        if (!animationTriggered && video2.currentTime > video2.duration * 0.5) {
            startAnimation(clipper);
            animationTriggered = true;
        }
    });

    video1.addEventListener('seeked', () => {
        if (video1.currentTime < video1.duration * 0.5) {
            animationTriggered = false;
            clipper.style.clipPath = null;

            if (video2Clipped) {
                const tempVideo = video1;
                video1.parentNode.insertBefore(video2, video1);
                clipper.appendChild(tempVideo);
            } else {
                const tempVideo = video2;
                video2.parentNode.insertBefore(video1, video2);
                clipper.appendChild(tempVideo);
            }
            video2Clipped = !video2Clipped;
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
        0% ${200 - progress * 200 + 0.1}%,
        ${200 - progress * 200 + 0.1}% 0%,
        0% 0%
      )`;

        box.style.clipPath = clipPath;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}
