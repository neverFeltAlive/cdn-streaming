import Hls from 'hls.js';

import { bytesToSizeString } from '@utils/helpers.ts';

export const addSizeCounterEvents = (hls: Hls) => {
  const videoSizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-size-video-count'
  );
  const audioSizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-size-audio-count'
  );

  if (videoSizeCounter && audioSizeCounter) {
    hls.on(Hls.Events.BUFFER_APPENDED, (event: string, data) => {
      const container =
        data.type === 'video' ? videoSizeCounter : audioSizeCounter;
      const chunkSize = data.chunkMeta.size;
      container.innerText = bytesToSizeString(chunkSize);
    });
  }
};
