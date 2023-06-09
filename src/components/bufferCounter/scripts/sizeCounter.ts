import Hls from 'hls.js';

import { bytesToSizeString } from '@utils/helpers.ts';

const CHUNKS_QUEUE_SIZE = 11;

type Chunk = {
  id: number;
  start: number;
  end: number;
  size: number;
};

export const addSizeCounterEvents = (hls: Hls) => {
  const videoSizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-size-video-count'
  );
  const audioSizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-size-audio-count'
  );
  const totalSizeCounter = document.querySelector<HTMLSpanElement>(
    '.js-buffer-total-size-count'
  );

  const chunksInBuffer: { [key: string]: Chunk } = {};
  const chunksQueue: Array<Chunk> = [];

  if (videoSizeCounter && audioSizeCounter) {
    hls.on(Hls.Events.BUFFER_APPENDED, (event: string, data) => {
      // Обновить запись о размере последнего чанка
      const container =
        data.type === 'video' ? videoSizeCounter : audioSizeCounter;
      const chunkSize = data.chunkMeta.size;
      container.innerText = bytesToSizeString(chunkSize);

      // Сохранить видео чанк
      if (data.type === 'video' && totalSizeCounter) {
        const start = data.frag.startDTS;
        const end = data.frag.endDTS;

        if (!chunksInBuffer[`${start} - ${end}`]) {
          // Добавить новый чанк в очередь
          const newChunk = (chunksInBuffer[`${start} - ${end}`] = {
            id: chunksQueue.length,
            start,
            end,
            size: data.chunkMeta.size,
          });
          chunksQueue.push(newChunk);

          // Удалить первый чанк в очереди, если она переполнена
          if (chunksQueue.length > CHUNKS_QUEUE_SIZE) {
            delete chunksInBuffer[
              `${chunksQueue[0].start} - ${chunksQueue[0].end}`
            ];
            chunksQueue.shift();
          }
        } else {
          // Переместить чанк в конец очереди
          const currentChunk = chunksInBuffer[`${start} - ${end}`];
          chunksQueue.splice(currentChunk.id, 1);
          chunksQueue.push(currentChunk);
        }
      }
    });
  }

  // Раз в секунду обновить размер видео буфера
  setInterval(() => {
    const currentRange = hls.media?.buffered;
    if (currentRange && totalSizeCounter) {
      // Рассчитать размер видео буфера
      let size = 0;
      for (let i = 0; i < currentRange.length; i++) {
        // Подобрать подходящие чанки из очереди
        const relevantChunks = Object.values(chunksInBuffer).filter(
          (chunk) =>
            chunk.start >= currentRange.start(i) &&
            chunk.end <= currentRange.end(i)
        );

        // Рассчитать общий размер всех чанков
        relevantChunks.forEach((chunk) => {
          size += chunk.size;
        });
      }
      totalSizeCounter.innerText = bytesToSizeString(size);
    }
  }, 1000);
};
