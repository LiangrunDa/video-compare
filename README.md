# Video Compare

A simple javascript video comparison library for both slider and wiper.

## Usage

Load the library from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/video-compare@0.0.2/dist/video-compare.min.js"></script>
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

## Features

- Support synchronization of the two videos
- Eliminate the need to wrap the second video in a div from developer's side
- Multiple distribution formats for easy integration