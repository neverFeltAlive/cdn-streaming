import Hls from 'hls.js';

import { initBufferCounter } from '@components/bufferCounter';
import { initVideoPlayer } from '@components/videoCounter';

import '../styles/style.scss';

const VIDEO_SOURCE =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8';

export const init = () => {
  if (!Hls.isSupported()) return;

  const videoElement = document.querySelector<HTMLVideoElement>('#hls-player');

  if (!videoElement) return;

  const hls = new Hls();

  hls.loadSource(VIDEO_SOURCE);
  hls.attachMedia(videoElement);

  initBufferCounter(hls);
  initVideoPlayer(hls);
};
