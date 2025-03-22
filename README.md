# Video Compare

A simple javascript video comparison library for both slider and wiper.

## Usage

Load the library from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/video-compare@0.0.6/dist/video-compare.min.js"></script>
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

For more example, please check the [demo page](https://liangrunda.github.io/video-compare/) and [source code](https://github.com/liangrunda/video-compare/tree/main/example).

## Features

- Support synchronization of the multiple videos
- Simple and easy to use - just add the class name to the container
- Multiple video comparison modes: slider, wiper, four grid, side by side and three video comparison