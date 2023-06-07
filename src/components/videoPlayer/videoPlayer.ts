import Hls from 'hls.js';

import './style.scss';

const VIDEO_SOURCE =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8';

export const init = () => {
  if (!Hls.isSupported()) return;

  const videoElement = document.querySelector<HTMLVideoElement>('#hls-player');

  if (!videoElement) return;

  const hlsPlayer = new Hls();

  hlsPlayer.loadSource(VIDEO_SOURCE);
  hlsPlayer.attachMedia(videoElement);
};
