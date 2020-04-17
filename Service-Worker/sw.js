// sw.js
this.addEventListener('install', function (event) {
  console.log('Service Worker install');
  // event.waitUntil(
  //   caches.open('sw_demo').then(function (cache) {
  //     return cache.addAll(['./style.css', './index.js']);
  //   }),
  // );
  this.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then((res) => {
        return (
          res ||
          fetch(event.request)
            .then((responese) => {
              const responeseClone = responese.clone();
              caches.open('sw_demo').then((cache) => {
                cache.put(event.request, responeseClone);
              });
              return responese;
            })
            .catch((err) => {
              console.log(err);
            })
        );
      }),
    );
  });
});

const cacheNames = ['sw_demo']; // Cahce Stroage 白名单
// 更新sw
this.addEventListener('activate', function (event) {
  console.log('Service Worker activate');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all[
        keys.map((key) => {
          if (!cacheNames.includes(key)) {
            console.log(key);
            return caches.delete(key); // 删除不在白名单中的 Cache Stroage
          }
        })
      ];
    }),
  );
});
// sw.js
this.addEventListener('message', function (event) {
  console.log(event.data); // this message is from page
});
