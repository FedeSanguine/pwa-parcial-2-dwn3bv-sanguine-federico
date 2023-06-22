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

productos();


let carrito = [];



// ------ DECLARACION DE VARIABLES ------
let contenedorCarrito = document.getElementById('carrito-contenedor');
let botonVaciar = document.getElementById('vaciar-carrito');
botonVaciar.style.display = 'none';
let contadorCarrito = document.getElementById('contadorCarrito');
let precioTotal = document.getElementById('precioTotal');
let botonesConsolas = document.getElementsByClassName('boton-consola');
let limpiar = document.getElementById('limpiarFiltro');
let eventoInstalar;
let botonInstalar = document.getElementById('botonInstalar');
let divInstalar = document.getElementById('instalacion');
limpiar.addEventListener('click', productos);
let contadorItems = 0;




// ------ FUNCIONES ------
function productos() {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(json => {

            limpiar.style.display = 'none';

            let productos = document.getElementById('productos');
            let html = '<div id="contenedor-productos" class="row justify-content-center">';


            productos.innerHTML = '';

            json.forEach(producto => {
                html += `<div class="productoContenedor col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div class="producto card align-items-center">
                                    <img class="card-img-top img-fluid mt-3" src="${producto.imagen}" alt="${producto.nombre}">
                                        <div class="card-body d-flex flex-wrap">
                                            <h3>${producto.nombre}</h3>
                                            <p class="precioProducto col-12">$${producto.precio}</p>
                                            <p id="consolaProducto" class="col-12">${producto.consola}</p>
                                            
                                            <div class="w-100 d-flex flex-wrap col-6">
                                                <button class="col-12" id="boton-detalle" onclick="ampliarProducto(${producto.id})">Ver Detalle</button>
                                                <button onclick="agregarCarrito(${producto.id}, event)" class="col-12 boton-agregar">Agregar a Carrito</button>
                                            </div>
                                        </div>
                                </div>
                        </div>`
            });
            html += '</div>';
            productos.innerHTML = html;

        })
}

function agregarCarrito(e, boton) {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(json => {
            const existe = carrito.some(prod => prod.id === e)

            if (existe) {
                const leerCarrito = carrito.map(prod => {
                    if (prod.id === e) {
                        prod.cantidad++
                    }
                })
            } else {
                const item = json.find((prod) => prod.id === e)
                carrito.push(item);
            }
            contadorItems++;
            actualizarCarrito()
            console.log(boton.target.innerHTML)
            boton.target.innerHTML = '¡Listo!';
            boton.target.style.backgroundColor = '#12ce86'
            boton.target.style.boxShadow = '1px 2px 1px #265533'
            setTimeout(function () {
                boton.target.style.backgroundColor = '#12ce86';
                boton.target.style.boxShadow = '1px 2px 1px #d46215';
                boton.target.innerHTML = 'Agregar a Carrito';
            }, 500);
        });


}

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


function actualizarCarrito() {
    contenedorCarrito.innerHTML = '';

    let html = ''
    carrito.forEach(prod => {
        html += `<div class="productoEnCarrito">
            <div class="nombre-precio-carrito">
                <p id="nombreCarrito">${prod.nombre}</p>
                <p class="precioProducto">$${prod.precio}</p>
                <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar">Eliminar</button>
                </div>
                <div class="sumar-restar-carrito">
                <button onclick = "restarDeCarrito(${prod.id})">-</button>
                <p id="cantidad-p">Cantidad: <span id="cantidad-numero">${prod.cantidad}</span></p>
                <button onclick = "sumarDeCarrito(${prod.id})">+</button>
            </div>
        </div>`

    })
    contenedorCarrito.innerHTML = html;

    if (carrito.length === 0) {
        botonVaciar.style.display = 'none';
    } else {
        botonVaciar.style.display = 'block';
    }

    contadorCarrito.innerHTML = contadorItems;
    precioTotalCarrito.innerHTML = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad * prod.precio, 0);
}





function eliminarDelCarrito(e) {
    const item = carrito.find((prod) => prod.id === e)
    contadorItems -= item.cantidad;
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
}



const restarDeCarrito = (e) => {
    carrito.map(prod => {
        if (prod.id === e) {
            if (prod.cantidad == 1) {
                actualizarCarrito();
            } else {
                prod.cantidad--;
                contadorItems--;
                actualizarCarrito();
            }

        }
    })
}


const sumarDeCarrito = (e) => {
    carrito.map(prod => {
        if (prod.id === e) {
            prod.cantidad++;
            contadorItems++;
            actualizarCarrito();
        }
    })
}


botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    contadorItems = carrito.length;
    actualizarCarrito();
})


for (let botonConsola of botonesConsolas) {
    botonConsola.addEventListener('click', () => {
        filtrarProducto(botonConsola);
    })
}

function filtrarProducto(e) {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(json => {
            let productos = document.getElementById('productos');
            productos.innerHTML = '';
            let html = '<div id="contenedor-productos" class="row justify-content-center">';
            limpiar.style.display = 'block';
            json.forEach(producto => {

                let filtrado = producto.nombre.includes(e.innerHTML)

                if (filtrado) {
                    html += `<div class="productoContenedor col-sm-6 col-md-4 col-lg-3 col-xl-2 card-col">
                                <div class="producto card">
                                    <img class="card-img-top img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
                                        <div class="card-body d-flex flex-wrap justify-content-around">
                                            <h3>${producto.nombre}</h3>
                                            <p class="precioProducto col-12">$${producto.precio}</p>
                                            <p id="consolaProducto" class="col-12">${producto.categoria}</p>
                                            
                                            <div class="w-100 d-flex flex-wrap col-6">
                                                <button class="col-12" id="boton-detalle" onclick="ampliarProducto(${producto.id})">Ver Detalle</button>
                                                <button onclick="agregarCarrito(${producto.id}, event)" class="col-12 boton-agregar">Agregar a Carrito</button>
                                            </div>
                                        </div>
                                </div>
                            </div>`
                }

            })
            html += '</div>';
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


const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]



botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})