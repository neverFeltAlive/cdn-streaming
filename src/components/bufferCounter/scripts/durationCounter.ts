import Hls from 'hls.js';

const getBufferLength = (ranges: TimeRanges | undefined) => {
  if (!ranges) return 0;

  let length = 0;
  for (let i = 0; i < ranges.length; i++) {
    length += ranges.end(i) - ranges.start(i);
  }

  return length;
};

export const addDurationCounterEvents = (hls: Hls) => {
  const durationCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-length-count'
  );

  if (durationCounter) {
    hls.on(Hls.Events.BUFFER_APPENDED, () => {
      durationCounter.innerText = getBufferLength(
        hls.media?.buffered
      ).toLocaleString();
    });
  }
};
