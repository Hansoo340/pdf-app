const CACHE_NAME = "pdf-app-v1";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "pdf/book.pdf"
  // 아이콘도 캐시하려면 아래 줄의 주석을 풀어주세요:
  // "icons/icon-192.png",
  // "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 있으면 캐시에서 응답, 없으면 네트워크에서 가져오기
      return response || fetch(event.request);
    })
  );
});
