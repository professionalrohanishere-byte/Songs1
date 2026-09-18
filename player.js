(function () {
  const audio = document.getElementById('audio');
  const record = document.getElementById('record');
  const cover = document.getElementById('cover');
  const npTitle = document.getElementById('npTitle');
  const npArtist = document.getElementById('npArtist');
  const seek = document.getElementById('seek');
  const curTime = document.getElementById('curTime');
  const durTime = document.getElementById('durTime');
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const volume = document.getElementById('volume');
  const trackList = document.getElementById('trackList');
  const trackCount = document.getElementById('trackCount');

  const songs = (typeof SONGS !== 'undefined') ? SONGS : [];
  let currentIndex = -1;
  let isSeeking = false;

  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderShelf() {
    trackCount.textContent = songs.length
      ? `${songs.length} track${songs.length === 1 ? '' : 's'}`
      : '';

    if (!songs.length) {
      trackList.innerHTML = `<li class="shelf__empty">No songs yet — add some in songs.js.</li>`;
      return;
    }

    trackList.innerHTML = songs.map((song, i) => `
      <li class="track" data-index="${i}" role="button" tabindex="0" aria-label="Play ${song.title} by ${song.artist}">
        <span class="track__index">${i + 1}</span>
        ${song.cover
          ? `<img class="track__thumb" src="${song.cover}" alt="" />`
          : `<span class="track__thumb"></span>`}
        <span class="track__meta">
          <p class="track__title">${song.title}</p>
          <p class="track__artist">${song.artist}</p>
        </span>
        <span class="track__eq"><span></span><span></span><span></span></span>
      </li>
    `).join('');

    trackList.querySelectorAll('.track').forEach(el => {
      el.addEventListener('click', () => loadTrack(Number(el.dataset.index), true));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadTrack(Number(el.dataset.index), true);
        }
      });
    });
  }

  function highlightActive() {
    trackList.querySelectorAll('.track').forEach(el => {
      el.classList.toggle('is-playing', Number(el.dataset.index) === currentIndex);
    });
  }

  function loadTrack(index, autoplay) {
    if (!songs.length) return;
    index = (index + songs.length) % songs.length;
    currentIndex = index;
    const song = songs[index];

    audio.src = song.src;
    npTitle.textContent = song.title;
    npArtist.textContent = song.artist;

    if (song.cover) {
      cover.src = song.cover;
      cover.hidden = false;
    } else {
      cover.hidden = true;
    }

    highlightActive();

    if (autoplay) {
      audio.play().catch(() => {});
    }
  }

  function setPlayingState(isPlaying) {
    playIcon.hidden = isPlaying;
    pauseIcon.hidden = !isPlaying;
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    record.classList.toggle('is-spinning', isPlaying);
  }

  playBtn.addEventListener('click', () => {
    if (currentIndex === -1) {
      loadTrack(0, true);
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  prevBtn.addEventListener('click', () => loadTrack(currentIndex - 1, true));
  nextBtn.addEventListener('click', () => loadTrack(currentIndex + 1, true));

  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));
  audio.addEventListener('ended', () => loadTrack(currentIndex + 1, true));

  audio.addEventListener('loadedmetadata', () => {
    seek.max = audio.duration || 0;
    durTime.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (isSeeking) return;
    seek.value = audio.currentTime;
    curTime.textContent = fmtTime(audio.currentTime);
  });

  seek.addEventListener('input', () => {
    isSeeking = true;
    curTime.textContent = fmtTime(Number(seek.value));
  });
  seek.addEventListener('change', () => {
    audio.currentTime = Number(seek.value);
    isSeeking = false;
  });

  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);
  });
  audio.volume = Number(volume.value);

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
      e.preventDefault();
      playBtn.click();
    }
  });

  renderShelf();
})();
