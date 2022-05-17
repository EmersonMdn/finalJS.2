
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

let todoProducts = comidas.concat(juguetes);

for (const producto of todoProducts) {
    let post = document.createElement('div');
    post.className = 'col-12 col-sm-6 col-md-4 col-lg-3 post_productos'
    post.innerHTML =`<div id='${producto.id}'>  
                        <img src="${producto.imagen}" alt=""> 
                        <h6>${producto.nombre}</h6>
                        <p id='btn${producto.id}' class='btn-comprar'>COMPRAR $${producto.precio}</p>
                    </div>`;
                    
    productos.append(post);
    let boton = document.getElementById(`btn${producto.id}`);
    
    boton.addEventListener('click', ()=> addCart(producto.id));
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
        carrito.push(new Producto(todoProducts[idProducto],1))
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1400,
        timerProgressBar: true
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregado al carro'
      })
    
    localStorage.setItem('cart', JSON.stringify(carrito));

    imprimirCarro(carrito);
    console.log(carrito)
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
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                        </tr>
                        </thead>
                        <tbody id='bodyTable'>  
                        </tbody>
                    </table>
                    <p>Precio final: $${precioFinal}</p>
                    <button id='vaciarBtn' class="btn btn-outline-dark" type="button">Vacíar carrito</button>
                    <button id='comprarBtn' class="btn btn-outline-dark" type="button">Completar compra</button>`;

    lista.append(producto);

    let vaciarCarro = document.getElementById('vaciarBtn');
    vaciarCarro.addEventListener('click', () => vaciarCarrito());
    

    let finalizarCompra = document.getElementById('comprarBtn');
    finalizarCompra.addEventListener('click', () => comprar());



    let listaTable = document.getElementById('bodyTable');

    array.forEach(element => {
        let datos = document.createElement('tr')
        datos.innerHTML= `  <td>x${element.cantidad} ${element.marca}</td>
                            <td>$${element.precioTotal}</td>`;

        listaTable.append(datos);
    });
}

const vaciarCarrito = () => {
    let lista = document.getElementById('lista-carrito');
    Swal.fire({
        title: 'Seguro?',
        text: "Se vaciara el carro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar...'
      }).then((result) => {
        if (result.isConfirmed) {

            lista.innerHTML='';
            carrito = [];
            localStorage.removeItem('cart')
            Swal.fire(
                'Listo!',
                'Se ha borrado todo',
                'success'
            )
        }
      })
}

const comprar = () =>{
    let carroPagar = document.getElementById('carritoFinal');
    document.getElementById('cartPage').className = 'container';
    document.getElementById('mainPage').className = 'oculto';
    
    imprimirTodo(carrito);
}

const imprimirTodo = (array) => {
    let lista = document.getElementById('carritoFinal');
    lista.innerHTML = '';

    let div = document.createElement('div');

    div.innerHTML = `<table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                        </tr>
                        </thead>
                        <tbody id='bodyTablet'>
                        
                        </tbody>
                    </table>`;
    lista.append(div);

    let listaTable = document.getElementById('bodyTablet');

    array.forEach(element => {
        let datos = document.createElement('tr')
        datos.innerHTML= `  <td>x${element.cantidad} ${element.marca}</td>
                            <td>$${element.precioTotal}</td>
                            `;

        listaTable.append(datos);
    });

    let precioFinal = obtenerPrecioTotal(carrito);
    let total = document.createElement('tr');
    total.className = 'totalStyle'
    total.innerHTML = ` <td>TOTAL A PAGAR</td>
                        <td>$ ${precioFinal}</td>`;
                       
    listaTable.append(total);

    let btnComprar = document.createElement('div');
    btnComprar.className = 'btn__Comprar';
    btnComprar.innerHTML = `<span id='confirmCompra'> <a href='#'>CONFIRMAR COMPRA</a> </span>`;
    lista.append(btnComprar);
}

document.getElementById('volver').onclick = () =>{
    document.getElementById('mainPage').className = 'container-fluid mainPage';
    document.getElementById('cartPage').className = 'oculto'
}

let onlyGatos = [];
onlyGatos = todoProducts.filter(elemento => elemento.animal === 'gato')

let onlyPerros = [];
onlyPerros = todoProducts.filter(elemento => elemento.animal === 'perro')

console.table(todoProducts);