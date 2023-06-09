import Hls from 'hls.js';

import '../styles/style.scss';
import { addFullscreenControls } from './fulllscreenControls.ts';
import { addPlayStateControls } from './playStateControls.ts';
import { addProgressControls } from './progressControls.ts';

export const init = (videoElement: HTMLVideoElement, hls: Hls) => {
  const controls = document.querySelector('.js-controls');

  if (controls) {
    addPlayStateControls(controls, videoElement);
    addFullscreenControls(controls);

    hls.on(Hls.Events.LEVEL_LOADED, () => {
      addProgressControls(videoElement);
    });
  }
};
