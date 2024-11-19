import { SLIDER_CONTAINER_CLASS, WIPER_CONTAINER_CLASS } from './consts';
import './styles.css';
import { ComparisonWiper } from './wiper';
import { ComparisonSlider } from './slider';

function initVideoCompare() {
    const initialize = () => {
        const containers = document.getElementsByClassName(
            SLIDER_CONTAINER_CLASS,
        );

        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            if (container) {
                new ComparisonSlider(container);
            }
        }

        const wiperContainers = document.getElementsByClassName(
            WIPER_CONTAINER_CLASS,
        );
        for (let i = 0; i < wiperContainers.length; i++) {
            const container = wiperContainers[i];
            if (container) {
                new ComparisonWiper(container);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

initVideoCompare();
export default initVideoCompare;
