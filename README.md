# Video Compare

A simple javascript video comparison library for both slider and wiper.

## Usage

Load the library from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/video-compare@0.0.3/dist/video-compare.min.js"></script>
```

Use the following HTML structure to initialize the video comparison slider:

```html
<div class="vc-slider-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
</div>
```

Use the following HTML structure to initialize the video comparison wiper:

```html
<div class="vc-wiper-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
</div>
```

Use the following HTML structure to initialize the video comparison four grid:

```html
<div class="vc-four-grid-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video3.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video4.mp4">
    </video>
</div>
```

Use the following HTML structure to initialize the video comparison side by side:

```html
<div class="vc-side-by-side-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
</div>
```

Use the following HTML structure to initialize the video comparison three video comparison:

```html
<div class="vc-three-video-comparison-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video3.mp4">
    </video>
</div>
```

## Features

- Support synchronization of the multiple videos
- Simple and easy to use - just add the class name to the container
- Multiple video comparison modes: slider, wiper, four grid, side by side and three video comparison