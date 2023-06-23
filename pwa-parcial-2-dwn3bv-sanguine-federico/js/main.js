window.addEventListener('DOMContentLoaded', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
})

window.addEventListener('online', function(){
    let main = document.querySelector(".modal-contenedor");
    let metaT = document.querySelector("meta[name=theme-color]");
    let proce = document.querySelector(".proce");
    let advertencia = document.querySelector(".advertencia");
    
    if(this.navigator.onLine){
        metaT.setAttribute("content", "#343a40")
        main.classList.remove("offline")

        caches.open("pwa-gxgames-archivos-cache").then(cache => {
            cache.add("compra.html")
        })

        proce.classList.remove("none")
        advertencia.classList.add("none")
     }
})
window.addEventListener('offline', function(){
    let main = document.querySelector(".modal-contenedor");
    let metaT = document.querySelector("meta[name=theme-color]");
    let proce = document.querySelector(".proce");
    let advertencia = document.querySelector(".advertencia");

        if(!this.navigator.onLine){
            metaT.setAttribute("content", "red")
            main.classList.add("offline")

            caches.open("pwa-gxgames-archivos-cache").then(cache => {
                cache.delete("compra.html")
            })

            proce.classList.add("none")

            advertencia.classList.remove("none")
        }
})



function ampliarProducto(e) {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(json => {
            let productos = document.getElementById('productos');
            productos.innerHTML = '';
            let producto = json.find(prod => prod.id === e);

            let html = `<button onclick="productos()" id="boton-volver-amplio">Volver</button>
                        <div id="producto-amplio">
                            <div class="contenedor-producto-amplio d-flex justify-content-center align-items-center row">
                                
                                <div class="col-xs-6 col-md-5 text-center">
                                    <img class="img-fluid img-ampliada" src="${producto.imagen}" alt="${producto.nombre}">
                                </div>
                                    
                                
                                <div class="d-flex flex-wrap col-xs-6 col-md-7 justify-content-between detalle-datos">
                                    <h3 id="nombreDetalle">${producto.nombre}</h3>
                                    <p id="descripcionDetalle">${producto.descripcion}</p>
                                    <p class="col-12 precioDetalle">$${producto.precio}</p>
                                    <p id="consolaDetalle">Categoría: ${producto.consola}</p>
                                        
                                    <button onclick="agregarCarrito(${producto.id}, event)" class="boton-agregar boton-detalle">Agregar a Carrito</button>
                                </div>

                            </div>
                        </div>`

            productos.innerHTML = html;

        })


}



function instalarApp() {
    if (eventoInstalar) {
        eventoInstalar.prompt();
        eventoInstalar.userChoice
            .then(respuesta => {
                if (respuesta.outcome == 'accepted') {
                    console.log('El usuario acepto instalar la app');
                    divInstalar.style.display = 'none';
                } else {
                    console.log('El usuario no acepto instalar la app');
                }
            })
    }
}

function mostrarBtnInstalar() {
    if (botonInstalar != undefined) {
        divInstalar.style.display = 'block';
        botonInstalar.addEventListener('click', instalarApp)
    }
}
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    eventoInstalar = e;
    mostrarBtnInstalar();
})




