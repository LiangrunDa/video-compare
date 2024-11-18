import { initializeComparisonSlider } from './slider';
import { SLIDER_CONTAINER_CLASS, WIPER_CONTAINER_CLASS } from './consts';
import './styles.css';
import { initializeComparisonWiper } from './wiper';

function initVideoCompare() {
  const initialize = () => {
    const containers = document.getElementsByClassName(SLIDER_CONTAINER_CLASS);
    
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];       
      if (container) {
        initializeComparisonSlider(container);
      }
    }

    const wiperContainers = document.getElementsByClassName(WIPER_CONTAINER_CLASS);
    for (let i = 0; i < wiperContainers.length; i++) {
      const container = wiperContainers[i];       
      if (container) {
        initializeComparisonWiper(container);
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
