export const addFullscreenControls = (controls: Element) => {
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
};
