import Hls from 'hls.js';

import '../styles/style.scss';
import { addDurationCounterEvents } from './durationCounter.ts';
import { addSizeCounterEvents } from './sizeCounter.ts';

export const init = (hls: Hls) => {
  addSizeCounterEvents(hls);
  addDurationCounterEvents(hls);
};
