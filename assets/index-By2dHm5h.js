var Q=n=>{throw TypeError(n)};var j=(n,t,e)=>t.has(n)||Q("Cannot "+e);var I=(n,t,e)=>(j(n,t,"read from private field"),e?e.call(n):t.get(n)),T=(n,t,e)=>t.has(n)?Q("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),A=(n,t,e,i)=>(j(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e),Y=(n,t,e)=>(j(n,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const dt={BASE_URL:"https://story-api.dicoding.dev/v1",DATABASE_NAME:"story-app-database",DATABASE_VERSION:1,OBJECT_STORE_NAME:"stories"};class H{constructor(t=dt.BASE_URL){this.baseUrl=t}async _request(t,e={}){const i=await fetch(`${this.baseUrl}${t}`,e);let s;try{s=await i.json()}catch{s=null}if(!i.ok){const r=(s==null?void 0:s.message)||`Request failed with status ${i.status}`,a=new Error(r);throw a.status=i.status,a.payload=s,a}return s}async signUp(t){return this._request("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async signIn(t){return this._request("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async listStories({token:t,page:e=1,size:i=10,location:s=0}={}){const r=new URLSearchParams;r.set("page",e),r.set("size",i),r.set("location",s);const a=t?{Authorization:`Bearer ${t}`}:{};return this._request(`/stories?${r.toString()}`,{headers:a})}async readStory(t,e){if(!t)throw new Error("Story id is required");const i=e?{Authorization:`Bearer ${e}`}:{};return this._request(`/stories/${t}`,{headers:i})}async createStory({authToken:t,text:e,file:i,lat:s,lon:r}){if(!t)throw new Error("authToken required to create story");const a=new FormData;return e!=null&&a.append("description",e),i&&a.append("photo",i),s!=null&&a.append("lat",String(s)),r!=null&&a.append("lon",String(r)),this._request("/stories",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:a})}async createStoryGuest({text:t,file:e,lat:i,lon:s}){const r=new FormData;return t!=null&&r.append("description",t),e&&r.append("photo",e),i!=null&&r.append("lat",String(i)),s!=null&&r.append("lon",String(s)),this._request("/stories/guest",{method:"POST",body:r})}async subscribePush({authToken:t,subscription:e}){var s,r;if(!t)throw new Error("Token required");const i={endpoint:e.endpoint,keys:{p256dh:(s=e.keys)==null?void 0:s.p256dh,auth:(r=e.keys)==null?void 0:r.auth}};return this._request("/notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})}async unsubscribePush({authToken:t,endpoint:e}){if(!t)throw new Error("Token required");return this._request("/notifications/subscribe",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({endpoint:e})})}}class J{constructor(t=window.localStorage){this.storage=t,this.storageKey="app_auth_token"}readToken(){return this.storage.getItem(this.storageKey)}saveToken(t){t&&this.storage.setItem(this.storageKey,t)}clearToken(){this.storage.removeItem(this.storageKey)}hasToken(){return!!this.readToken()}}class gt{constructor(t="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"){this.vapidKey=t}async askPermission(){const t=await Notification.requestPermission();if(t!=="granted")throw new Error("Notification permission denied by user");return t}async getWorkerRegistration(){const t=await navigator.serviceWorker.getRegistration();if(!t)throw new Error("No service worker registration found");return t}_base64ToUint8Array(t){const e="=".repeat((4-t.length%4)%4),i=(t+e).replace(/-/g,"+").replace(/_/g,"/"),s=atob(i),r=new Uint8Array(s.length);for(let a=0;a<s.length;++a)r[a]=s.charCodeAt(a);return r}async ensureSubscription(t){const e=t||await this.getWorkerRegistration();let i=await e.pushManager.getSubscription();return i||(i=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this._base64ToUint8Array(this.vapidKey)})),i}async getActiveSubscription(){return(await this.getWorkerRegistration()).pushManager.getSubscription()}async removeSubscription(){const e=await(await this.getWorkerRegistration()).pushManager.getSubscription();if(!e)throw new Error("No active push subscription found");const i=e.endpoint;return await e.unsubscribe(),i}}const q=(n,t)=>t.some(e=>n instanceof e);let X,tt;function ft(){return X||(X=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vt(){return tt||(tt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const N=new WeakMap,R=new WeakMap,C=new WeakMap;function yt(n){const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",a)},r=()=>{e(S(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",a)});return C.set(t,n),t}function wt(n){if(N.has(n))return;const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",a),n.removeEventListener("abort",a)},r=()=>{e(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",a),n.addEventListener("abort",a)});N.set(n,t)}let V={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return N.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return S(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function lt(n){V=n(V)}function bt(n){return vt().includes(n)?function(...t){return n.apply(K(this),t),S(this.request)}:function(...t){return S(n.apply(K(this),t))}}function It(n){return typeof n=="function"?bt(n):(n instanceof IDBTransaction&&wt(n),q(n,ft())?new Proxy(n,V):n)}function S(n){if(n instanceof IDBRequest)return yt(n);if(R.has(n))return R.get(n);const t=It(n);return t!==n&&(R.set(n,t),C.set(t,n)),t}const K=n=>C.get(n);function _t(n,t,{blocked:e,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(n,t),l=S(a);return i&&a.addEventListener("upgradeneeded",c=>{i(S(a.result),c.oldVersion,c.newVersion,S(a.transaction),c)}),e&&a.addEventListener("blocked",c=>e(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",o=>s(o.oldVersion,o.newVersion,o))}).catch(()=>{}),l}const Et=["get","getKey","getAll","getAllKeys","count"],Lt=["put","add","delete","clear"],F=new Map;function et(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(F.get(t))return F.get(t);const e=t.replace(/FromIndex$/,""),i=t!==e,s=Lt.includes(e);if(!(e in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Et.includes(e)))return;const r=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let o=c.store;return i&&(o=o.index(l.shift())),(await Promise.all([o[e](...l),s&&c.done]))[0]};return F.set(t,r),r}lt(n=>({...n,get:(t,e,i)=>et(t,e)||n.get(t,e,i),has:(t,e)=>!!et(t,e)||n.has(t,e)}));const St=["continue","continuePrimaryKey","advance"],nt={},z=new WeakMap,ut=new WeakMap,kt={get(n,t){if(!St.includes(t))return n[t];let e=nt[t];return e||(e=nt[t]=function(...i){z.set(this,ut.get(this)[t](...i))}),e}};async function*Bt(...n){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...n)),!t)return;t=t;const e=new Proxy(t,kt);for(ut.set(e,t),C.set(e,K(t));t;)yield e,t=await(z.get(e)||t.continue()),z.delete(e)}function it(n,t){return t===Symbol.asyncIterator&&q(n,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&q(n,[IDBIndex,IDBObjectStore])}lt(n=>({...n,get(t,e,i){return it(t,e)?Bt:n.get(t,e,i)},has(t,e){return it(t,e)||n.has(t,e)}}));const{DATABASE_NAME:Tt,DATABASE_VERSION:Mt,OBJECT_STORE_NAME:P}=dt,D=_t(Tt,Mt,{upgrade(n){n.createObjectStore(P,{keyPath:"id"})}}),st={async getStory(n){return n?(await D).get(P,n):null},async getAllStories(){return(await D).getAll(P)},async putStory(n){if(n.hasOwnProperty("id"))return(await D).put(P,n)},async deleteStory(n){if(n)return(await D).delete(P,n)}};class Pt{constructor(t){this.view=t,this._api=new H,this._auth=new J,this._notifier=new gt,this._current=1,this._limit=10}async loadStories(){this.view.showLoading();const t=this._auth.readToken();if(!t){this.view.showGuestView();return}this.view.showAuthenticatedView();try{const e=this.view.getLocationToggle()?1:0,i=await this._api.listStories({token:t,page:this._current,size:this._limit,location:e}),s=Array.isArray(i==null?void 0:i.listStory)?i.listStory:[];this.view.displayStories(s),this.view.renderPagination(this._current>1,s.length===this._limit),s.length>0&&(this.view.renderMap(s),s.forEach(r=>{st.putStory(r)}))}catch(e){console.error("Gagal mengambil data dari jaringan, mencoba dari cache...",e);const i=await st.getAllStories();i&&i.length>0?(this.view.displayStories(i),this.view.renderPagination(!1,!1),this.view.getLocationToggle()&&this.view.renderMap(i)):this.view.showError((e==null?void 0:e.message)||"Gagal memuat stories. Periksa koneksi internet Anda.")}}async onPageChange(t){t==="prev"&&this._current>1?this._current-=1:t==="next"&&(this._current+=1),await this.loadStories()}async onLocationToggle(){this._current=1,await this.loadStories()}async subscribeWebPush(){try{await this._notifier.askPermission();const t=await this._notifier.getWorkerRegistration(),e=await this._notifier.ensureSubscription(t),i=this._auth.readToken();if(!i)throw new Error("Login terlebih dahulu untuk berlangganan notifikasi");const s=e.toJSON?e.toJSON():e,r=await this._api.subscribePush({authToken:i,subscription:s});this.view.showMessage("Berhasil subscribe: "+((r==null?void 0:r.message)||"OK"))}catch(t){this.view.showMessage((t==null?void 0:t.message)||"Gagal subscribe")}}async unsubscribeWebPush(){try{const t=await this._notifier.removeSubscription(),e=this._auth.readToken();if(!e)throw new Error("Login diperlukan untuk berhenti berlangganan");const i=await this._api.unsubscribePush({authToken:e,endpoint:t});this.view.showMessage("Berhenti berlangganan: "+((i==null?void 0:i.message)||"OK"))}catch(t){this.view.showMessage((t==null?void 0:t.message)||"Gagal unsubscribe")}}}class Z{constructor(){this._map=null}ensureLeaflet(){if(typeof window>"u"||!window.L)throw new Error("Leaflet is not available in the current environment.");return window.L}create(t,e={}){const i=this.ensureLeaflet(),s={center:[-2.5,118],zoom:4.5,zoomControl:!0,...e};return this._map=i.map(t,s),this._map}addTiles(t,e={},i=!0){const s=this.ensureLeaflet(),r={maxZoom:19,attribution:"© OpenStreetMap contributors",...e},a=s.tileLayer(t,r);return i&&this._map&&a.addTo(this._map),a}placeMarker(t,e=null,i={}){const s=this.ensureLeaflet();if(!this._map)throw new Error("Map instance not created");const r=s.marker(t,i).addTo(this._map);return e&&r.bindPopup(e),r}createLayerGroup(t=!0){const i=this.ensureLeaflet().layerGroup();return t&&this._map&&i.addTo(this._map),i}addLayerSwitcher(t={},e={},i={}){const s=this.ensureLeaflet();if(!this._map)throw new Error("No map instance");const r={collapsed:!1,...i};return s.control.layers(t,e,r).addTo(this._map)}destroy(){this._map&&(this._map.remove(),this._map=null)}getInstance(){return this._map}}class xt{constructor(){this.presenter=new Pt(this),this.mapModel=new Z,this._mapId="stories-map-mvp",this._storiesListId="stories-list-mvp",this._paginationId="pagination-mvp",this._locationToggleId="location-toggle-mvp"}async render(){return`
      <section class="container">
        <div class="page-header" role="banner">
          <h1 id="page-title">Stories</h1>
          <p class="page-subtitle">Temukan dan bagikan cerita menarik dari komunitas</p>
        </div>

        <div class="toolbar">
          <label for="${this._locationToggleId}">
            <span class="sr-only">Toggle shown stories by location</span>
            <input id="${this._locationToggleId}" type="checkbox" /> Tampilkan lokasi
          </label>

          <div>
            <a href="#/add-story" class="btn">Add Story</a>
            <a id="home-login-btn" href="#/login" class="btn">Login</a>
            <a id="home-register-btn" href="#/register" class="btn">Register</a>
          </div>
        </div>

        <ul id="${this._storiesListId}" class="stories-grid" aria-live="polite"></ul>

        <nav id="${this._paginationId}" aria-label="Pagination"></nav>

        <div id="${this._mapId}" class="mini-map" style="height:360px;"></div>

        <div style="margin-top:20px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
          <button id="push-subscribe" class="btn">Subscribe Push</button>
          <button id="push-unsubscribe" class="btn">Unsubscribe Push</button>
        </div>
      </section>
    `}showLoading(){const t=document.getElementById(this._storiesListId);t&&(t.innerHTML="<p>Loading...</p>")}showGuestView(){const t=document.querySelector(".main-content");t&&(t.innerHTML=`
      <div class="welcome-page">
        <div class="welcome-hero">
          <h1>Selamat Datang di Dicoding Story</h1>
          <p>Platform berbagi cerita terbaik untuk komunitas developer Indonesia</p>
          <div class="welcome-buttons">
            <a href="#/register" class="btn btn-primary">Daftar Sekarang</a>
            <a href="#/login" class="btn btn-outline">Masuk</a>
          </div>
        </div>
      </div>
    `)}showAuthenticatedView(){var t,e,i;(t=document.querySelector("#home-login-btn"))==null||t.setAttribute("aria-hidden","true"),(e=document.querySelector("#home-register-btn"))==null||e.setAttribute("aria-hidden","true"),(i=document.querySelector(".page-header"))==null||i.classList.remove("hidden")}displayStories(t){const e=document.getElementById(this._storiesListId);e&&(e.innerHTML=t.map(i=>`
      <li class="story-card">
        <a class="story-link" href="#/stories/${i.id}">
          <img src="${i.photoUrl}" alt="Foto oleh ${i.name}" loading="lazy" />
          <div class="story-content">
            <h3>${i.name}</h3>
            <p>${i.description}</p>
            <time style="font-size:12px;color:#666;" datetime="${i.createdAt}">${new Date(i.createdAt).toLocaleString("id-ID")}</time>
          </div>
        </a>
      </li>
    `).join(""))}renderPagination(t,e){const i=document.getElementById(this._paginationId);if(!i)return;i.innerHTML="";const s=(r,a,l)=>{const c=document.createElement("button");return c.textContent=r,c.disabled=!!a,c.addEventListener("click",l),c};i.appendChild(s("Prev",!t,()=>this.presenter.onPageChange("prev"))),i.appendChild(s("Next",!e,()=>this.presenter.onPageChange("next")))}renderMap(t=[]){const e=document.getElementById(this._mapId);if(!(!e||!window.L))try{this.mapModel.destroy(),e.innerHTML="";const i=this.mapModel.create(this._mapId,{center:[-2.5,118],zoom:4.5}),s=this.mapModel.addTiles("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}),r=this.mapModel.addTiles("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",{subdomains:"abcd",maxZoom:20,attribution:"© CARTO"}),a=this.mapModel.addTiles("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),l=this.mapModel.createLayerGroup();t.filter(d=>typeof d.lat=="number"&&typeof d.lon=="number").forEach(d=>{this.mapModel.placeMarker([d.lat,d.lon],`<strong>${d.name}</strong><br/>${d.description}`)});const c={OSM:s,"Carto Light":r,Topo:a},o={Stories:l};this.mapModel.addLayerSwitcher(c,o)}catch(i){console.error("Map error:",i),e.innerHTML="<p>Error loading map. Please refresh.</p>"}}getLocationToggle(){var t;return!!((t=document.getElementById(this._locationToggleId))!=null&&t.checked)}showError(t){const e=document.getElementById(this._storiesListId);e&&(e.innerHTML=`<p role="alert">${t}</p>`)}showMessage(t){const e=document.createElement("div");e.textContent=t,e.style.position="fixed",e.style.right="16px",e.style.bottom="16px",e.style.padding="10px 14px",e.style.borderRadius="8px",e.style.background="var(--g-2, #6a8a52)",e.style.color="white",document.body.appendChild(e),setTimeout(()=>e.remove(),2200)}navigateToHome(){setTimeout(()=>window.location.hash="#/",800)}navigateToLogin(){setTimeout(()=>window.location.hash="#/login",800)}async afterRender(){const t=document.getElementById(this._locationToggleId),e=document.getElementById("push-subscribe"),i=document.getElementById("push-unsubscribe");t&&t.addEventListener("change",()=>this.presenter.onLocationToggle()),e&&e.addEventListener("click",()=>this.presenter.subscribeWebPush()),i&&i.addEventListener("click",()=>this.presenter.unsubscribeWebPush()),await this.presenter.loadStories()}}class ht{constructor(t){this.view=t,this._api=new H,this._auth=new J}async login(t){var e;try{this.view.showLoading("Memproses login...");const i=await this._api.signIn({email:t.email,password:t.password}),s=(e=i==null?void 0:i.loginResult)==null?void 0:e.token;if(!s)throw new Error("Terima respons tanpa token dari server");this._auth.saveToken(s),this.view.showSuccess("Login berhasil. Mengarahkan ke halaman utama..."),this.view.navigateToHome()}catch(i){const s=(i==null?void 0:i.message)||"Gagal login";this.view.showError(s)}}async register(t){try{this.view.showLoading("Mendaftarkan akun..."),await this._api.signUp({name:t.name,email:t.email,password:t.password}),this.view.showSuccess("Registrasi berhasil. Silakan login."),this.view.navigateToLogin()}catch(e){const i=(e==null?void 0:e.message)||"Gagal registrasi";this.view.showError(i)}}logout(){this._auth.clearToken(),this.view.navigateToLogin()}}class At{constructor(){this.presenter=new ht(this),this._formId="form-login",this._statusId="status-login"}async render(){return`
      <div class="auth-page" data-view="signin">
        <div class="auth-container">
          <div class="auth-card" role="region" aria-labelledby="signin-title">
            <h1 id="signin-title" class="auth-title">Sign in</h1>

            <form id="${this._formId}" class="auth-form" novalidate aria-describedby="${this._statusId}">
              <div class="form-group">
                <label for="signin-email">Email</label>
                <input id="signin-email" name="email" type="email" inputmode="email" required autocomplete="email" />
              </div>

              <div class="form-group">
                <label for="signin-pass">Password</label>
                <input id="signin-pass" name="password" type="password" minlength="8" required autocomplete="current-password" />
              </div>

              <div class="form-actions" style="display:flex; gap:12px; align-items:center;">
                <button class="btn btn-primary" type="submit" aria-label="Sign in">Sign in</button>
                <a class="btn btn-outline" href="#/forgot">Forgot?</a>
              </div>
            </form>

            <p class="auth-link" style="margin-top:12px;">Belum punya akun? <a href="#/register">Daftar</a></p>

            <div id="${this._statusId}" role="status" aria-live="polite" class="auth-message" style="min-height:1.25rem; margin-top:10px;"></div>
          </div>
        </div>
      </div>
    `}showLoading(t="Processing..."){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t))}showSuccess(t="Logged in"){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t),e.classList.remove("error"),e.classList.add("success"))}showError(t="Failed to login"){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t),e.classList.remove("success"),e.classList.add("error"))}navigateToHome(){setTimeout(()=>{window.location.hash="#/"},900)}async afterRender(){const t=document.getElementById(this._formId);t&&t.addEventListener("submit",async e=>{e.preventDefault();const i=new FormData(t),s={email:(i.get("email")||"").toString().trim(),password:(i.get("password")||"").toString()};if(!s.email){this.showError("Email harus diisi");return}if(!s.password||s.password.length<8){this.showError("Password minimal 8 karakter");return}try{this.showLoading("Logging in..."),await this.presenter.login({email:s.email,password:s.password})}catch(r){this.showError((r==null?void 0:r.message)||"Terjadi kesalahan")}})}}class Dt{constructor(){this.presenter=new ht(this),this._formId="form-register",this._statusId="status-register"}async render(){return`
      <div class="auth-page" data-view="signup">
        <div class="auth-container">
          <div class="auth-card" role="region" aria-labelledby="signup-title">
            <h1 id="signup-title" class="auth-title">Create account</h1>

            <form id="${this._formId}" class="auth-form" novalidate aria-describedby="${this._statusId}">
              <div class="form-group">
                <label for="reg-name">Nama lengkap</label>
                <input id="reg-name" name="name" type="text" required autocomplete="name" />
              </div>

              <div class="form-group">
                <label for="reg-email">Email</label>
                <input id="reg-email" name="email" type="email" required autocomplete="email" />
              </div>

              <div class="form-group">
                <label for="reg-pass">Password</label>
                <input id="reg-pass" name="password" type="password" minlength="8" required autocomplete="new-password" />
              </div>

              <div class="form-actions">
                <button class="btn btn-primary" type="submit">Daftar</button>
              </div>
            </form>

            <p class="auth-link" style="margin-top:12px;">Sudah punya akun? <a href="#/login">Masuk</a></p>

            <div id="${this._statusId}" role="status" aria-live="polite" class="auth-message" style="min-height:1.25rem; margin-top:10px;"></div>
          </div>
        </div>
      </div>
    `}showLoading(t="Processing..."){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t))}showSuccess(t="Registration successful"){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t),e.classList.remove("error"),e.classList.add("success"))}showError(t="Registration failed"){const e=document.getElementById(this._statusId);e&&(e.textContent=String(t),e.classList.remove("success"),e.classList.add("error"))}navigateToLogin(){setTimeout(()=>{window.location.hash="#/login"},900)}async afterRender(){const t=document.getElementById(this._formId);t&&t.addEventListener("submit",async e=>{e.preventDefault();const i=new FormData(t),s={name:(i.get("name")||"").toString().trim(),email:(i.get("email")||"").toString().trim(),password:(i.get("password")||"").toString()};if(!s.name){this.showError("Nama harus diisi");return}if(!s.email){this.showError("Email harus diisi");return}if(!s.password||s.password.length<8){this.showError("Password minimal 8 karakter");return}try{this.showLoading("Mendaftarkan akun..."),await this.presenter.register({name:s.name,email:s.email,password:s.password})}catch(r){this.showError((r==null?void 0:r.message)||"Terjadi kesalahan saat mendaftar")}})}}class mt{constructor(t){this.view=t,this._storyService=new H,this._authStore=new J}async addStory(t){try{this.view.showLoading("Mengirim story...");const e=this._authStore.readToken();if(!e)throw rt("Silakan login terlebih dahulu untuk menambahkan story",401);if(t!=null&&t.photoFile&&!(t.photoFile instanceof File))throw rt("File foto tidak valid.",400);const i={authToken:e,text:t.description,file:t.photoFile,lat:t.lat,lon:t.lon};await this._storyService.createStory(i),this.view.showSuccess("Story berhasil dikirim 🎉"),this.view.navigateToHome()}catch(e){const i=e&&e.message?e.message:"Gagal mengirim story";this.view.showError(i)}}}function rt(n,t=500){const e=new Error(n);return e.status=t,e}class $t{constructor(){this.presenter=new mt(this),this.mapModel=new Z,this._formId="detailstory-form-v2",this._statusId="detailstory-status-v2",this._videoId="detail-camera-video-v2",this._canvasId="detail-camera-canvas-v2",this._photoId="detail-photo-preview-v2",this._miniMapId="detail-mini-map-v2",this._latId="detail-lat-v2",this._lonId="detail-lon-v2",this._openBtn="detail-open-camera-v2",this._captureBtn="detail-capture-v2",this._closeBtn="detail-close-camera-v2"}async render(){return`
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
    `}showLoading(t="Processing..."){const e=document.getElementById(this._statusId);e&&(e.textContent=t)}showSuccess(t="Success"){const e=document.getElementById(this._statusId);e&&(e.textContent=t)}showError(t="Error"){const e=document.getElementById(this._statusId);e&&(e.textContent=t)}navigateToHome(){setTimeout(()=>window.location.hash="#/",800)}async afterRender(){const t=document.getElementById(this._formId),e=document.getElementById(this._latId),i=document.getElementById(this._lonId),s=document.getElementById(this._openBtn),r=document.getElementById(this._captureBtn),a=document.getElementById(this._closeBtn),l=document.getElementById(this._videoId),c=document.getElementById(this._canvasId),o=document.getElementById(this._photoId),d=document.getElementById(this._miniMapId);let h=null,u=null,p=null;const w=()=>{h&&(h.getTracks().forEach(g=>g.stop()),h=null),l&&(l.style.display="none"),r.disabled=!0,a.disabled=!0};if(s==null||s.addEventListener("click",async()=>{try{h=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),l.srcObject=h,await l.play(),l.style.display="block",r.disabled=!1,a.disabled=!1}catch(g){this.showError("Tidak dapat mengakses kamera: "+((g==null?void 0:g.message)||g))}}),r==null||r.addEventListener("click",async()=>{try{const g=l.videoWidth,m=l.videoHeight;c.width=g,c.height=m,c.getContext("2d").drawImage(l,0,0,g,m),await new Promise(v=>{c.toBlob(y=>{if(!y)return v();u=new File([y],`photo-${Date.now()}.jpg`,{type:y.type||"image/jpeg"}),o.src=URL.createObjectURL(y),o.style.display="block",v()},"image/jpeg",.9)})}finally{w()}}),a==null||a.addEventListener("click",w),window.addEventListener("hashchange",w,{once:!0}),window.L&&d)try{const g=this.mapModel.create(this._miniMapId,{center:[-2.5,118],zoom:4.5});this.mapModel.addTiles("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}),g.on("click",m=>{const{lat:f,lng:v}=m.latlng;e.value=f.toFixed(6),i.value=v.toFixed(6),p?p.setLatLng([f,v]):p=this.mapModel.placeMarker([f,v])})}catch(g){console.error("Detail mini-map error",g)}t==null||t.addEventListener("submit",async g=>{var y;g.preventDefault();const m=(y=t.description.value)==null?void 0:y.trim(),f=e.value?parseFloat(e.value):void 0,v=i.value?parseFloat(i.value):void 0;if(!m){this.showError("Deskripsi wajib diisi");return}try{this.showLoading("Mengirim..."),await this.presenter.addStory({description:m,photoFile:u,lat:f,lon:v})}catch(b){this.showError((b==null?void 0:b.message)||"Gagal mengirim")}})}}class Ct{constructor(){this.presenter=new mt(this),this.mapModel=new Z,this._formId="addstory-form-v2",this._latId="input-lat-v2",this._lonId="input-lon-v2",this._miniMapId="mini-map-v2",this._statusId="addstory-status-v2",this._videoId="camera-video-v2",this._canvasId="camera-canvas-v2",this._photoId="photo-preview-v2",this._openBtnId="open-camera-v2",this._captureBtnId="capture-photo-v2",this._closeBtnId="close-camera-v2",this._fileUploadId="file-upload-v2"}async render(){return`
      <div class="add-story-page" data-view="add-v2">
        <div class="add-story-container">
          <div class="add-story-card">
            <h1 class="add-story-title">Tambah Cerita</h1>
            <form id="${this._formId}" class="add-story-form" enctype="multipart/form-data" novalidate>
              <div class="form-group">
                <label for="desc-v2">Deskripsi</label>
                <textarea id="desc-v2" name="description" required placeholder="Ceritakan momen coding Anda..."></textarea>
              </div>

              <section class="camera-section" aria-labelledby="camera-label-v2">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h3 id="camera-label-v2" class="camera-label">Foto (opsional)</h3>
                  <small class="map-instruction">Bisa ambil dari kamera atau upload</small>
                </div>

                <!-- File Upload Input -->
                <div class="file-upload-section" style="margin:8px 0;">
                  <label for="file-upload-v2" class="btn btn-outline" style="display:inline-block; cursor:pointer;">
                    📁 Upload File
                    <input id="file-upload-v2" type="file" accept="image/*" style="display:none;" />
                  </label>
                </div>

                <div class="camera-controls" style="margin:8px 0;">
                  <button id="${this._openBtnId}" type="button" class="btn btn-outline">📷 Buka Kamera</button>
                  <button id="${this._captureBtnId}" type="button" class="btn btn-primary" disabled>Ambil</button>
                  <button id="${this._closeBtnId}" type="button" class="btn btn-outline" disabled>Tutup</button>
                </div>

                <video id="${this._videoId}" playsinline class="camera-preview" style="display:none;"></video>
                <canvas id="${this._canvasId}" class="camera-canvas" style="display:none;"></canvas>
                <img id="${this._photoId}" alt="Preview foto" class="photo-preview" style="display:none; margin-top:8px; max-width:100%; border-radius:8px;"/>
              </section>

              <section class="location-section" aria-labelledby="loc-label-v2">
                <h3 id="loc-label-v2" class="location-label">Lokasi (opsional)</h3>
                <div class="location-inputs" style="margin-bottom:8px;">
                  <div class="form-group">
                    <label for="${this._latId}">Latitude</label>
                    <input id="${this._latId}" name="lat" type="number" step="any" placeholder="Contoh: -6.200000" />
                  </div>
                  <div class="form-group">
                    <label for="${this._lonId}">Longitude</label>
                    <input id="${this._lonId}" name="lon" type="number" step="any" placeholder="Contoh: 106.816666" />
                  </div>
                </div>
                <p class="map-instruction">Klik peta di bawah untuk mengisi koordinat</p>
                <div id="${this._miniMapId}" class="mini-map" style="margin-top:8px;"></div>
              </section>

              <div style="margin-top:14px;">
                <button class="btn btn-primary submit-btn" type="submit">Kirim Cerita</button>
              </div>
            </form>

            <div id="${this._statusId}" role="status" class="add-story-message" style="margin-top:12px; min-height:1.25rem;"></div>
          </div>
        </div>
      </div>
    `}showLoading(t="Mengirim..."){const e=document.getElementById(this._statusId);e&&(e.textContent=t)}showSuccess(t="Berhasil!"){const e=document.getElementById(this._statusId);e&&(e.textContent=t,e.classList.remove("error"),e.classList.add("success"))}showError(t="Gagal"){const e=document.getElementById(this._statusId);e&&(e.textContent=t,e.classList.remove("success"),e.classList.add("error"))}navigateToHome(){setTimeout(()=>window.location.hash="#/",800)}async afterRender(){const t=document.getElementById(this._formId),e=document.getElementById(this._latId),i=document.getElementById(this._lonId),s=document.getElementById(this._openBtnId),r=document.getElementById(this._captureBtnId),a=document.getElementById(this._closeBtnId),l=document.getElementById(this._fileUploadId),c=document.getElementById(this._videoId),o=document.getElementById(this._canvasId),d=document.getElementById(this._photoId),h=document.getElementById(this._miniMapId);let u=null,p=null,w=null;const g=()=>{u&&(u.getTracks().forEach(m=>m.stop()),u=null),c&&(c.style.display="none"),r.disabled=!0,a.disabled=!0};if(s==null||s.addEventListener("click",async()=>{try{u=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),c.srcObject=u,await c.play(),c.style.display="block",r.disabled=!1,a.disabled=!1}catch(m){this.showError("Gagal membuka kamera: "+((m==null?void 0:m.message)||m))}}),r==null||r.addEventListener("click",async()=>{try{const m=c.videoWidth,f=c.videoHeight;o.width=m,o.height=f,o.getContext("2d").drawImage(c,0,0,m,f),await new Promise(y=>{o.toBlob(b=>{if(!b)return y();p=new File([b],`capture-${Date.now()}.jpg`,{type:b.type||"image/jpeg"}),d.src=URL.createObjectURL(b),d.style.display="block",y()},"image/jpeg",.9)})}catch{this.showError("Gagal mengambil foto")}finally{g()}}),a==null||a.addEventListener("click",()=>g()),window.addEventListener("hashchange",g,{once:!0}),l==null||l.addEventListener("change",m=>{const f=m.target.files[0];if(f){p=f;const v=URL.createObjectURL(f);d.src=v,d.style.display="block",g()}}),window.L&&h)try{const m=this.mapModel.create(this._miniMapId,{center:[-2.5,118],zoom:4.5});this.mapModel.addTiles("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}),m.on("click",f=>{const{lat:v,lng:y}=f.latlng;e.value=v.toFixed(6),i.value=y.toFixed(6),w?w.setLatLng([v,y]):w=this.mapModel.placeMarker([v,y])})}catch(m){console.error("Mini-map error",m)}t==null||t.addEventListener("submit",async m=>{var b;m.preventDefault();const f=(b=t.description.value)==null?void 0:b.trim(),v=e.value?parseFloat(e.value):void 0,y=i.value?parseFloat(i.value):void 0;if(!f){this.showError("Deskripsi wajib diisi");return}try{this.showLoading("Mengirim cerita..."),await this.presenter.addStory({description:f,photoFile:p,lat:v,lon:y})}catch(O){this.showError((O==null?void 0:O.message)||"Terjadi kesalahan saat mengirim")}})}}const k={home:new xt,login:new At,register:new Dt,storyDetail:new $t,addStory:new Ct},Ot={"/":k.home,"/login":k.login,"/register":k.register,"/stories":k.home,"/stories/:id":k.storyDetail,"/add-story":k.addStory};function jt(){const n=(location.hash||"").replace(/^#/,"").trim();return n===""?"/":n}function Rt(n){const t=n.replace(/\/+$/,"").replace(/^\/+/,"");if(!t)return{resource:null,id:null};const e=t.split("/");return{resource:e[0]||null,id:e[1]||null}}function Ft({resource:n,id:t}){return n?t?`/${n}/:id`:`/${n}`:"/"}function Ut(){const n=jt(),t=Rt(n);return Ft(t)}var x,B,E,$,pt;class Wt{constructor({navigationDrawer:t,drawerButton:e,content:i}){T(this,$);T(this,x);T(this,B);T(this,E);A(this,E,t),A(this,B,e),A(this,x,i),Y(this,$,pt).call(this)}async displayPage(){const t=Ut(),e=Ot[t],i=async()=>{I(this,x).innerHTML=await e.render(),await e.afterRender()};document.startViewTransition?await document.startViewTransition(i).finished:await i()}}x=new WeakMap,B=new WeakMap,E=new WeakMap,$=new WeakSet,pt=function(){I(this,B).addEventListener("click",()=>{I(this,E).classList.toggle("open")}),document.body.addEventListener("click",t=>{const e=t.target;!I(this,E).contains(e)&&!I(this,B).contains(e)&&I(this,E).classList.remove("open"),I(this,E).querySelectorAll("a").forEach(i=>{i.contains(e)&&I(this,E).classList.remove("open")})})};try{self["workbox:window:7.2.0"]&&_()}catch{}function at(n,t){return new Promise(function(e){var i=new MessageChannel;i.port1.onmessage=function(s){e(s.data)},n.postMessage(t,[i.port2])})}function qt(n){var t=function(e,i){if(typeof e!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var r=s.call(e,i);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n,"string");return typeof t=="symbol"?t:t+""}function Nt(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,qt(i.key),i)}}function G(n,t){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,i){return e.__proto__=i,e},G(n,t)}function ot(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,i=new Array(t);e<t;e++)i[e]=n[e];return i}function Vt(n,t){var e=typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(s,r){if(s){if(typeof s=="string")return ot(s,r);var a=Object.prototype.toString.call(s).slice(8,-1);return a==="Object"&&s.constructor&&(a=s.constructor.name),a==="Map"||a==="Set"?Array.from(s):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?ot(s,r):void 0}}(n))||t){e&&(n=e);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}try{self["workbox:core:7.2.0"]&&_()}catch{}var U=function(){var n=this;this.promise=new Promise(function(t,e){n.resolve=t,n.reject=e})};function W(n,t){var e=location.href;return new URL(n,e).href===new URL(t,e).href}var M=function(n,t){this.type=n,Object.assign(this,t)};function L(n,t,e){return e?t?t(n):n:(n&&n.then||(n=Promise.resolve(n)),t?n.then(t):n)}function Kt(){}var zt={type:"SKIP_WAITING"};function ct(n,t){return n&&n.then?n.then(Kt):Promise.resolve()}var Gt=function(n){function t(l,c){var o,d;return c===void 0&&(c={}),(o=n.call(this)||this).nn={},o.tn=0,o.rn=new U,o.en=new U,o.on=new U,o.un=0,o.an=new Set,o.cn=function(){var h=o.fn,u=h.installing;o.tn>0||!W(u.scriptURL,o.sn.toString())||performance.now()>o.un+6e4?(o.vn=u,h.removeEventListener("updatefound",o.cn)):(o.hn=u,o.an.add(u),o.rn.resolve(u)),++o.tn,u.addEventListener("statechange",o.ln)},o.ln=function(h){var u=o.fn,p=h.target,w=p.state,g=p===o.vn,m={sw:p,isExternal:g,originalEvent:h};!g&&o.mn&&(m.isUpdate=!0),o.dispatchEvent(new M(w,m)),w==="installed"?o.wn=self.setTimeout(function(){w==="installed"&&u.waiting===p&&o.dispatchEvent(new M("waiting",m))},200):w==="activating"&&(clearTimeout(o.wn),g||o.en.resolve(p))},o.yn=function(h){var u=o.hn,p=u!==navigator.serviceWorker.controller;o.dispatchEvent(new M("controlling",{isExternal:p,originalEvent:h,sw:u,isUpdate:o.mn})),p||o.on.resolve(u)},o.gn=(d=function(h){var u=h.data,p=h.ports,w=h.source;return L(o.getSW(),function(){o.an.has(w)&&o.dispatchEvent(new M("message",{data:u,originalEvent:h,ports:p,sw:w}))})},function(){for(var h=[],u=0;u<arguments.length;u++)h[u]=arguments[u];try{return Promise.resolve(d.apply(this,h))}catch(p){return Promise.reject(p)}}),o.sn=l,o.nn=c,navigator.serviceWorker.addEventListener("message",o.gn),o}var e,i;i=n,(e=t).prototype=Object.create(i.prototype),e.prototype.constructor=e,G(e,i);var s,r,a=t.prototype;return a.register=function(l){var c=(l===void 0?{}:l).immediate,o=c!==void 0&&c;try{var d=this;return L(function(h,u){var p=h();return p&&p.then?p.then(u):u(p)}(function(){if(!o&&document.readyState!=="complete")return ct(new Promise(function(h){return window.addEventListener("load",h)}))},function(){return d.mn=!!navigator.serviceWorker.controller,d.dn=d.pn(),L(d.bn(),function(h){d.fn=h,d.dn&&(d.hn=d.dn,d.en.resolve(d.dn),d.on.resolve(d.dn),d.dn.addEventListener("statechange",d.ln,{once:!0}));var u=d.fn.waiting;return u&&W(u.scriptURL,d.sn.toString())&&(d.hn=u,Promise.resolve().then(function(){d.dispatchEvent(new M("waiting",{sw:u,wasWaitingBeforeRegister:!0}))}).then(function(){})),d.hn&&(d.rn.resolve(d.hn),d.an.add(d.hn)),d.fn.addEventListener("updatefound",d.cn),navigator.serviceWorker.addEventListener("controllerchange",d.yn),d.fn})}))}catch(h){return Promise.reject(h)}},a.update=function(){try{return this.fn?L(ct(this.fn.update())):L()}catch(l){return Promise.reject(l)}},a.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},a.messageSW=function(l){try{return L(this.getSW(),function(c){return at(c,l)})}catch(c){return Promise.reject(c)}},a.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&at(this.fn.waiting,zt)},a.pn=function(){var l=navigator.serviceWorker.controller;return l&&W(l.scriptURL,this.sn.toString())?l:void 0},a.bn=function(){try{var l=this;return L(function(c,o){try{var d=c()}catch(h){return o(h)}return d&&d.then?d.then(void 0,o):d}(function(){return L(navigator.serviceWorker.register(l.sn,l.nn),function(c){return l.un=performance.now(),c})},function(c){throw c}))}catch(c){return Promise.reject(c)}},s=t,(r=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&Nt(s.prototype,r),Object.defineProperty(s,"prototype",{writable:!1}),s}(function(){function n(){this.Pn=new Map}var t=n.prototype;return t.addEventListener=function(e,i){this.jn(e).add(i)},t.removeEventListener=function(e,i){this.jn(e).delete(i)},t.dispatchEvent=function(e){e.target=this;for(var i,s=Vt(this.jn(e.type));!(i=s()).done;)(0,i.value)(e)},t.jn=function(e){return this.Pn.has(e)||this.Pn.set(e,new Set),this.Pn.get(e)},n}());(async function(){document.readyState==="loading"&&await new Promise(a=>document.addEventListener("DOMContentLoaded",a,{once:!0}));const t=document.querySelector("#app-main"),e=document.querySelector("#menu-toggle"),i=document.querySelector("#side-navigation");if(!t){console.error("Main content element not found");return}const s=new Wt({content:t,drawerButton:e,navigationDrawer:i});async function r(){try{if(typeof s.displayPage=="function"){await s.displayPage();return}if(typeof s.renderPage=="function"){await s.renderPage();return}console.warn("No render method found on app instance")}catch(a){console.error("Error rendering page:",a)}}if(await r(),window.addEventListener("hashchange",async()=>{try{await r()}catch(a){console.error("Failed to render page on hashchange",a)}}),"serviceWorker"in navigator){const a=new Gt("/sw.js");try{await a.register(),console.log("Service worker registered successfully")}catch(l){console.error("Service worker registration failed:",l)}}})();
