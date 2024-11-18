import { initializeComparisonSlider } from './slider';
import { SLIDER_CONTAINER_CLASS, SLIDER_CLIPPER_CLASS } from './consts';
import './styles.css';

function initVideoCompare() {
  const initialize = () => {
    const containers = document.getElementsByClassName(SLIDER_CONTAINER_CLASS);
    
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];       
      if (container) {
        initializeComparisonSlider(container);
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
