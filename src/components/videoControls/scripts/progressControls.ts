export const addProgressControls = (videoElement: HTMLVideoElement) => {
  const progressBar = document.querySelector<HTMLProgressElement>(
    '.js-video-progress-bar'
  );
  const input = document.querySelector<HTMLInputElement>(
    '.js-video-progress-seek'
  );

  if (progressBar && input) {
    const duration = Math.round(videoElement.duration);

    [progressBar, input].forEach((element) => {
      element.setAttribute('max', String(duration));
    });

    videoElement.addEventListener('timeupdate', () => {
      progressBar.value = Math.floor(videoElement.currentTime);
      input.value = String(Math.floor(videoElement.currentTime));
    });

    input.addEventListener('input', (event) => {
      if (event.target) {
        const time = input.dataset.seek ? input.dataset.seek : input.value;
        videoElement.currentTime = +time;
        progressBar.value = +time;
        input.value = time;
      }
    });
  }
};
