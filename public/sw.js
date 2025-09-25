self.addEventListener("install", (event) => {
  console.log("Eternal Letters Service Worker installed.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Eternal Letters Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  // Optional caching logic can go here
});
