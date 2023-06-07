import Hls from 'hls.js';

import { secondsToTimeString } from '@utils/helpers.ts';

import '../styles/style.scss';

export const init = (hls: Hls) => {
  const current = document.querySelector<HTMLSpanElement>(
    '.js-video-counter-current'
  );
  const all = document.querySelector<HTMLSpanElement>('.js-video-counter-all');

  if (hls.media) {
    if (current) {
      hls.media.addEventListener('timeupdate', () => {
        if (hls.media?.currentTime) {
          current.innerText = secondsToTimeString(
            Math.floor(hls.media.currentTime)
          );
        }
      });

      hls.media.addEventListener('play', () => current.classList.add('active'));

      hls.media.addEventListener('pause', () =>
        current.classList.remove('active')
      );
    }

    if (all) {
      hls.on(Hls.Events.LEVEL_LOADED, () => {
        if (hls.media) {
          all.innerText = secondsToTimeString(hls.media.duration);
        }
      });
    }
  }
};
