import Hls, { BufferAppendedData } from 'hls.js';

import { bytesToSizeString } from '@utils/helpers.ts';

export const addSizeCounterEvents = (hls: Hls) => {
  const sizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-size-count'
  );

  let currentSize = 0;

  if (sizeCounter) {
    hls.on(
      Hls.Events.BUFFER_APPENDED,
      (event: string, data: BufferAppendedData) => {
        const chunkSize = data.chunkMeta.size;
        currentSize += chunkSize;
        sizeCounter.innerText = bytesToSizeString(currentSize);
      }
    );
  }
};
