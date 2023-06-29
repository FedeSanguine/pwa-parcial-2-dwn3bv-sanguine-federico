


window.addEventListener('DOMContentLoaded', function () {
    const parametro = new URLSearchParams(location.search);
    const productoId = parametro.get('id');
    var productos = JSON.parse(localStorage.getItem('productos'));
    const producto = productos.find(item =>productoId == item.id);

    console.log(producto);

   const detalleProducto = document.getElementById('detalle-producto')
   detalleProducto.innerHTML = `
   <div class="container m-auto mb-5">

   <div class="card-deck mb-3 text-center">
           
           <div class="card mb-4 shadow-sm">
               <div class="card-header">
                   <h4 class="my-0 font-weight-bold">${producto.nombre}</h4>
               </div>
               <div class="card-body m-auto">
                   <img src="${producto.imagen}" class="card-img-top w-30">
                   <h1 class="card-title pricing-card-title precio">ARS$ <span class="">${producto.precio}</span></h1>

                   <ul class="list-unstyled mt-3 mb-4">
                       <li></li>
                       <li>Formato: Fisico</li>
                       <li>Consola: ${producto.consola}</li>
                       <li>Descripcion: ${producto.descripcion}</li>
                   </ul>                           
               </div>
           </div>
                    
   </div>
</div>
`;
   
});


