window.addEventListener('DOMContentLoaded', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    const productosDetalle = [
    {
        id:1,
        nombre: "Mortal Kombat 11",
        foto: "imagenes/productos/mk11.jpg",
        valor: "5850",
        consola: "PS4",
        descripcion: "Juego de pelea, uno o dos jugadores"
    },
    {
        id:2,
        nombre: "Fifa 22",
        foto: "imagenes/productos/fifa.jpg",
        valor: "9000",
        consola: "PS4",
        descripcion: "Juego de futbol de uno o dos jugadores con modo online"
    },
    {
        id:3,
        nombre: "Elden Ring",
        foto: "imagenes/productos/elden.jpg",
        valor: "9500",
        consola: "PS4",
        descripcion: "Juego de accion y aventura de mundo abierto"
    },
    {
        id:4,
        nombre: "Call of duty Modern",
        foto: "imagenes/productos/cod.png",
        valor: "8000",
        consola: "Xbox One",
        descripcion: "Juego de disparos y accion de un jugador con modo online"
    },
    {
        id:5,
        nombre: "GTA V",
        foto: "imagenes/productos/gta.png",
        valor: "7500",
        consola: "Xbox One",
        descripcion: "Juego de accion y aventura de mundo abierto"
    },
    {
        id:6,
        nombre: "Battlefield V",
        foto: "imagenes/productos/battle.png",
        valor: "5000",
        consola: "Xbox One",
        descripcion: "Juego de accion y disparos de un jugador"
    },

];
    localStorage.setItem('productosDetalle',JSON.stringify(productosDetalle));
    
let eventoInstalar;
let botonInstalar = document.getElementById('botonInstalar');
let divInstalar = document.getElementById('instalacion');

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

})



window.addEventListener('online', function(){
    let header = document.querySelector(".encabezado");
    let metaT = document.querySelector("meta[name=theme-color]");
    let proce = document.querySelector(".proce");

    
    if(this.navigator.onLine){
        metaT.setAttribute("content", "#343a40")
        header.classList.remove("offline")

        caches.open("pwa-gxgames-archivos-cache").then(cache => {
            cache.add("compra.html")
        })

        proce.classList.remove("none")
     }
})
window.addEventListener('offline', function(){
    let header = document.querySelector(".encabezado");
    let metaT = document.querySelector("meta[name=theme-color]");
    let proce = document.querySelector(".proce");


        if(!this.navigator.onLine){
            metaT.setAttribute("content", "red")
            header.classList.add("offline")

            caches.open("pwa-gxgames-archivos-cache").then(cache => {
                cache.delete("compra.html")
            })

            proce.classList.add("none")
        }
})

const obtenerDataVender = async () => {
    try {
      let url = 'https://jsonplaceholder.typicode.com/users/';
      const response = await fetch(url);
      const dataVender = await response.json();
      mostrarData(dataVender);
    } catch (error) {
      console.log(error);
    }
  };
  
  const mostrarData = (dataVender) => {
    console.log(dataVender);
    let body = "";
    for (let i = 0; i < dataVender.length; i++) {
      body += `<tr><td>${dataVender[i].id}</td><td>${dataVender[i].name}</td><td>${dataVender[i].email}</td></tr>`;
    }
    document.getElementById('dataVender').innerHTML = body;
    console.log(body);
  };
  
  obtenerDataVender();




  let formulario = document.getElementById('formulario');
  let respuesta = document.getElementById('respuesta');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('me diste un click')

    var datos = new FormData(formulario);

    console.log(datos)
    console.log(datos.get('usuario'))
    console.log(datos.get('pass'))

    fetch('login.php',{
        method: 'POST',
        body: datos
    })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data === 'error'){
                respuesta.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Llena todos los campos
                </div>
                `
            }else{
                respuesta.innerHTML = `
                <div class="alert alert-primary" role="alert">
                    ${data}
                </div>
                `
            }
        } )
})







