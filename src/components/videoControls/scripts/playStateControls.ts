export const addPlayStateControls = (
  controls: Element,
  videoElement: HTMLVideoElement
) => {
  const playButton = document.querySelector('.js-controls-play');
  if (playButton) {
    playButton.addEventListener('click', () => {
      videoElement.play();
      controls.classList.add('active');
    });
  }

  const pauseButton = document.querySelector('.js-controls-pause');
  if (pauseButton) {
    pauseButton.addEventListener('click', () => {
      videoElement.pause();
      controls.classList.remove('active');
    });
  }
};
