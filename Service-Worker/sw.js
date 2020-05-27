// // sw.js
// this.addEventListener('install', function (event) {

//   console.log('Service Worker install');
//   // event.waitUntil(
//   //   caches.open('sw_demo').then(function (cache) {
//   //     return cache.addAll(['./style.css', './index.js']);
//   //   }),
//   // );
//   this.addEventListener('fetch', function (event) {
//     console.log(event.request.url);
//     event.respondWith(
//       caches.match(event.request).then((res) => {
//         console.log('fetch:'+res)
//         return (
//           res ||
//           fetch(event.request)
//             .then((responese) => {
//               console.log('fetch:' + event.request)
//               const responeseClone = responese.clone();
//               caches.open('sw_demo').then((cache) => {
//                 cache.put(event.request, responeseClone);
//               });
//               return responese;
//             })
//             .catch((err) => {
//               console.log(err);
//             })
//         );
//       }),
//     );
//   });
// });

// const cacheNames = ['sw_demo']; // Cahce Stroage 白名单
// // 更新sw
// this.addEventListener('activate', function (event) {
//   console.log('Service Worker activate');
//   event.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all[
//         keys.map((key) => {
//           if (!cacheNames.includes(key)) {
//             console.log(key);
//             return caches.delete(key); // 删除不在白名单中的 Cache Stroage
//           }
//         })
//       ];
//     }),
//   );
// });
// // sw.js
// this.addEventListener('message', function (event) {
//   console.log(event.data); // this message is from page
// });



// serviceWorker.js
this.addEventListener('install', e => {
  // 当确定要访问某些资源时，提前请求并添加到缓存中。
  // 这个模式叫做“预缓存”
  e.waitUntil(
    caches.open('service-worker-test-precache').then(cache => {
      return cache.addAll(['/index.js', '/style.css'])
    })
  )
})

this.addEventListener('fetch', e => {
  // 缓存中能找到就返回，找不到就网络请求，之后再写入缓存并返回。
  // 这个称为 CacheFirst 的缓存策略。
  return e.respondWith(
    caches.open('service-worker-test-precache').then(cache => {
      return cache.match(e.request).then(matchedResponse => {
        return matchedResponse || fetch(e.request).then(fetchedResponse => {
          cache.put(e.request, fetchedResponse.clone())
          return fetchedResponse
        })
      })
    })
  )
})
