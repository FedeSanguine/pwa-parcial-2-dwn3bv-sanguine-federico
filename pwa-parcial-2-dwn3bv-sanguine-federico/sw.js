const nombreCache = 'pwa-gxgames-archivos-cache';
const archivos = ['/',
                'js/main.js',
                'index.html',
                'imagenes',
                'detalle',
                'compra.html',
                'detalle.html',
                'vender.html',
                'login.html',
                'login.php',
                'css/bootstrap.min.css',
                'css/styles.css',
                'js/bootstrap.bundle.min.js',
                'js/compra.js',
                'js/detalle.js',
                'js/pedido.js',
                'js/carrito.js',
                'js/jquery-3.4.1.min.js',
                'js/popper.min.js',
                'js/sweetalert2.min.js'
];



self.addEventListener('install', precatching =>{
    self.skipWaiting();
    precatching.waitUntil(
        caches
            .open(nombreCache)
            .then(cache => {
                cache.addAll(archivos);
            })
    );
})
self.addEventListener('activate', precatching => {
    console.log('Service Worker se activo correctamente');
})
self.addEventListener("fetch", function(precatching){
   
})
self.addEventListener('push', precatching => {
    let title = precatching.data.text();
    let options = {
        body: 'Nuevo producto en la tienda -- GxGames',
        icon:   'imagenes/icon/icon-192x192.png',
        vibrate: [500,300,500,300,300,100],
        actions: [
                    {action:1, icon:'imagenes/icon/icon-192x192.png', title:'Ver producto'},
                    {action:2, icon:'imagenes/icon/icon-192x192.png', title:'Recordar mas tarde'}]
    }
    precatching.waitUntil(self.registration.showNotification(title, options));
})

self.addEventListener('notificationclick', precatching => {
    if(precatching.action == 1) {
        console.log('El usuario quiere ver el producto ahora')
        clients.openWindow('http://localhost/pwa-parcial-2-dwn3bv-sanguine-federico/')
    } else if(precatching.action == 2){
        console.log('El usuario quiere ver el producto luego')
    }

    precatching.notification.close();

})

self.addEventListener('fetch', (cargarCache) => {
    cargarCache.respondWith(
      caches.match(cargarCache.request).then((RespuestaCache) => {
        if (RespuestaCache) {
          return RespuestaCache;
        }
        let RespuestaCache2 = cargarCache.request.clone();

        return fetch(RespuestaCache2)
            .then(RespuestaCache => {
                if(!RespuestaCache || RespuestaCache.status !== 200){
                    console.log('ERROR:', RespuestaCache, RespuestaCache2);
                }

                let RespuestaCache3 = RespuestaCache.clone();
                caches.open(nombreCache)
                    .then(cache => {
                        cache.put(RespuestaCache2, RespuestaCache3);
                    })
                console.log('Server:', RespuestaCache2);
                return RespuestaCache;
            })
      }),
    );
  });
