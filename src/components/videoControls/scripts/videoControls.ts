import '../styles/style.scss';

export const init = (videoElement: HTMLVideoElement) => {
  const controls = document.querySelector('.js-controls');

  if (controls) {
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

    const fullscreen = document.querySelector('.js-controls-fullscreen');
    const modal = document.querySelector<HTMLDialogElement>('#video-modal');
    if (fullscreen && modal) {
      fullscreen.addEventListener('click', (event) => {
        event.stopPropagation();
        const container = modal.classList.contains('active')
          ? document.querySelector('.js-video-container')
          : modal.querySelector('.js-modal-container');
        if (container) {
          container.appendChild(controls);
          modal.classList.toggle('active');
        }
      });
    }
  }
};
