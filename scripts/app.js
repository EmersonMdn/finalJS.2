
class Producto{
    constructor(producto, cantidad){
        this.id = producto.id;
		this.marca = producto.marca;
		this.precio = producto.precio;
		this.cantidad = cantidad;
		this.precioTotal = producto.precio;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}

const productos = document.getElementById('listaProducts');
let carrito = [];

for (const comida of comidas) {
    let post = document.createElement('div');
    post.className = 'col-12 col-sm-6 col-md-4 col-lg-3 post_productos'
    post.innerHTML =`<div id='${comida.id}'>  
                        <img src="${comida.imagen}" alt=""> 
                        <h6>${comida.nombre}</h6>
                        <p id='boton${comida.id}' class='btn-comprar'>COMPRAR $${comida.precio}</p>
                    </div>`;
                    
    productos.append(post);
    let boton = document.getElementById(`boton${comida.id}`);
    
    boton.addEventListener('click', ()=> addCart(comida.id));
}

function obtenerPrecioTotal(array) {
	return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

const addCart = (idProducto) => {
    let productosOnCart = carrito.find((elemento) => elemento.id === idProducto);

    if(productosOnCart){
        let index = carrito.findIndex((elemento) => elemento.id === productosOnCart.id);
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else{
        carrito.push(new Producto(comidas[idProducto],1))
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1400,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregado al carro'
      })
    
    imprimirCarro(carrito);
}

const imprimirCarro = (array) =>{
    let lista = document.getElementById('lista-carrito');
    lista.innerHTML='';

    lista.className = '';
    
    let precioFinal = obtenerPrecioTotal(array);
    
    let producto = document.createElement('div');
    producto.className = 'tabla-carrito';

    producto.innerHTML = `<table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                        </tr>
                        </thead>
                        <tbody id='bodyTable'>  
                        </tbody>
                    </table>
                    <p>Precio final: $${precioFinal}</p>`;

    lista.append(producto);

    let listaTable = document.getElementById('bodyTable');

    array.forEach(element => {
        let datos = document.createElement('tr')
        datos.innerHTML= `  <td>${element.cantidad}</td>
                            <td>${element.marca}</td>
                            <td>$${element.precioTotal}</td>`;

        listaTable.append(datos);
    });
}