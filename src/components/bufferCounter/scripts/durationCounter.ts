import Hls from 'hls.js';

export const addDurationCounterEvents = (hls: Hls) => {
  const durationCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-length-count'
  );

  if (durationCounter) {
    hls.on(Hls.Events.BUFFER_APPENDED, (event: string, data) => {
      const chunkDuration = data.frag.duration;
      durationCounter.innerText = (
        +durationCounter.innerText + chunkDuration
      ).toLocaleString();
    });
  }
};
