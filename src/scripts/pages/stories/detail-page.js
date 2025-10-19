import { AddStoryPresenter } from '../../presenters/add-story-presenter.js';
import { GeoMapManager } from '../../models/map-model.js';

export default class StoryDetailFormView {
  constructor() {
    this.presenter = new AddStoryPresenter(this);
    this.mapModel = new GeoMapManager();

    this._formId = 'detailstory-form-v2';
    this._statusId = 'detailstory-status-v2';
    this._videoId = 'detail-camera-video-v2';
    this._canvasId = 'detail-camera-canvas-v2';
    this._photoId = 'detail-photo-preview-v2';
    this._miniMapId = 'detail-mini-map-v2';
    this._latId = 'detail-lat-v2';
    this._lonId = 'detail-lon-v2';
    this._openBtn = 'detail-open-camera-v2';
    this._captureBtn = 'detail-capture-v2';
    this._closeBtn = 'detail-close-camera-v2';
  }

  async render() {
    return `
      <div class="add-story-page" data-view="detail-v2">
        <div class="add-story-container">
          <div class="add-story-card">
            <h1 class="add-story-title">Detail / Tambah Cerita (Form)</h1>
            <form id="${this._formId}" class="add-story-form" enctype="multipart/form-data" novalidate>
              <div class="form-group">
                <label for="detail-desc-v2">Deskripsi</label>
                <textarea id="detail-desc-v2" name="description" required placeholder="Ceritakan momen..." ></textarea>
              </div>

              <div class="camera-section">
                <label class="camera-label" id="detail-camera-label-v2">Foto</label>
                <div class="camera-controls">
                  <button id="${this._openBtn}" type="button" class="btn btn-outline">Buka Kamera</button>
                  <button id="${this._captureBtn}" type="button" class="btn btn-primary" disabled>Ambil Foto</button>
                  <button id="${this._closeBtn}" type="button" class="btn btn-outline" disabled>Tutup Kamera</button>
                </div>
                <video id="${this._videoId}" playsinline class="camera-preview" style="display:none;"></video>
                <canvas id="${this._canvasId}" class="camera-canvas" style="display:none;"></canvas>
                <img id="${this._photoId}" alt="Preview foto" class="photo-preview" style="display:none;" />
              </div>

              <div class="location-section">
                <label class="location-label">Lokasi (Opsional)</label>
                <div class="location-inputs">
                  <div class="form-group">
                    <label for="${this._latId}">Latitude</label>
                    <input id="${this._latId}" name="lat" type="number" step="any" />
                  </div>
                  <div class="form-group">
                    <label for="${this._lonId}">Longitude</label>
                    <input id="${this._lonId}" name="lon" type="number" step="any" />
                  </div>
                </div>
                <p class="map-instruction">Klik peta untuk memilih koordinat</p>
                <div id="${this._miniMapId}" class="mini-map"></div>
              </div>

              <button class="btn btn-primary submit-btn" type="submit">Submit</button>
            </form>

            <p id="${this._statusId}" role="status" class="add-story-message" style="min-height:1.25rem; margin-top:10px;"></p>
          </div>
        </div>
      </div>
    `;
  }

  showLoading(msg = 'Processing...') {
    const el = document.getElementById(this._statusId);
    if (el) el.textContent = msg;
  }
  showSuccess(msg = 'Success') {
    const el = document.getElementById(this._statusId);
    if (el) el.textContent = msg;
  }
  showError(msg = 'Error') {
    const el = document.getElementById(this._statusId);
    if (el) el.textContent = msg;
  }

  navigateToHome() {
    setTimeout(() => (window.location.hash = '#/'), 800);
  }

  async afterRender() {
    const form = document.getElementById(this._formId);
    const latInput = document.getElementById(this._latId);
    const lonInput = document.getElementById(this._lonId);

    const openBtn = document.getElementById(this._openBtn);
    const captureBtn = document.getElementById(this._captureBtn);
    const closeBtn = document.getElementById(this._closeBtn);
    const videoEl = document.getElementById(this._videoId);
    const canvasEl = document.getElementById(this._canvasId);
    const photoEl = document.getElementById(this._photoId);
    const miniMapEl = document.getElementById(this._miniMapId);

    let media = null;
    let capturedFile = null;
    let marker = null;

    const stopMedia = () => {
      if (media) {
        media.getTracks().forEach(t => t.stop());
        media = null;
      }
      if (videoEl) videoEl.style.display = 'none';
      captureBtn.disabled = true;
      closeBtn.disabled = true;
    };

    openBtn?.addEventListener('click', async () => {
      try {
        media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoEl.srcObject = media;
        await videoEl.play();
        videoEl.style.display = 'block';
        captureBtn.disabled = false;
        closeBtn.disabled = false;
      } catch (err) {
        this.showError('Tidak dapat mengakses kamera: ' + (err?.message || err));
      }
    });

    captureBtn?.addEventListener('click', async () => {
      try {
        const w = videoEl.videoWidth;
        const h = videoEl.videoHeight;
        canvasEl.width = w;
        canvasEl.height = h;
        const ctx = canvasEl.getContext('2d');
        ctx.drawImage(videoEl, 0, 0, w, h);

        await new Promise(resolve => {
          canvasEl.toBlob(blob => {
            if (!blob) return resolve();
            capturedFile = new File([blob], `photo-${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' });
            photoEl.src = URL.createObjectURL(blob);
            photoEl.style.display = 'block';
            resolve();
          }, 'image/jpeg', 0.9);
        });
      } finally {
        stopMedia();
      }
    });

    closeBtn?.addEventListener('click', stopMedia);
    window.addEventListener('hashchange', stopMedia, { once: true });

    if (window.L && miniMapEl) {
      try {
        const map = this.mapModel.create(this._miniMapId, { center: [-2.5, 118], zoom: 4.5 });
        this.mapModel.addTiles('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' });

        map.on('click', ev => {
          const { lat, lng } = ev.latlng;
          latInput.value = lat.toFixed(6);
          lonInput.value = lng.toFixed(6);

          if (marker) marker.setLatLng([lat, lng]);
          else marker = this.mapModel.placeMarker([lat, lng]);
        });
      } catch (err) {
        console.error('Detail mini-map error', err);
      }
    }

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const desc = form.description.value?.trim();
      const lat = latInput.value ? parseFloat(latInput.value) : undefined;
      const lon = lonInput.value ? parseFloat(lonInput.value) : undefined;

      if (!desc) {
        this.showError('Deskripsi wajib diisi');
        return;
      }

      try {
        this.showLoading('Mengirim...');
        await this.presenter.addStory({
          description: desc,
          photoFile: capturedFile,
          lat,
          lon
        });
      } catch (err) {
        this.showError(err?.message || 'Gagal mengirim');
      }
    });
  }
}
