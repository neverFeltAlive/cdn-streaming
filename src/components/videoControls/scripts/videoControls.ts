import '../styles/style.scss';
import { addFullscreenControls } from './fulllscreenControls.ts';
import { addPlayStateControls } from './playStateControls.ts';

export const init = (videoElement: HTMLVideoElement) => {
  const controls = document.querySelector('.js-controls');

  if (controls) {
    addPlayStateControls(controls, videoElement);
    addFullscreenControls(controls);
  }
};
