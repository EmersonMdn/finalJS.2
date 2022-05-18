class Producto {
    constructor(producto, cantidad) {
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

const iniciar = () => {
    mostrarProductos(todoProducts);
    verificarLS();
}


function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

const addCart = (idProducto) => {
    let productosOnCart = carrito.find((elemento) => elemento.id === idProducto);

    if (productosOnCart) {
        let index = carrito.findIndex((elemento) => elemento.id === productosOnCart.id);
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        carrito.push(new Producto(todoProducts[idProducto], 1))
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

    localStorage.setItem('cartEnStorage', JSON.stringify(carrito));

    imprimirCarro(carrito);
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

            lista.innerHTML = '';
            carrito = [];
            localStorage.removeItem('cartEnStorage')
            Swal.fire(
                'Listo!',
                'Se ha borrado todo',
                'success'
            )
        }
    })
}

const procederCompra = () => {
    let carroPagar = document.getElementById('carritoFinal');
    document.getElementById('cartPage').className = 'container';
    document.getElementById('mainPage').className = 'oculto';

    imprimirTodo(carrito);
}
function filtrarBusqueda(){
    let valor = document.getElementById('buscarProductoValue').value;
    let buscar = [];
    let navBurgers = document.getElementById('mensajeError');
    navBurgers.innerHTML = '';
    buscar = todoProducts.filter((elemento) => elemento.nombre.toLowerCase().includes(valor));

    if (buscar < 1) {
        let error = document.createElement('p');
        error.innerHTML = 'No se encontro ningun producto con ese nombre';

        navBurgers.append(error)
    }
    
    mostrarProductos(buscar);
}
const confirmarCompra = () =>{
    Swal.fire(
        'Pedido confirmado!',
        'En breve nos contactaremos con usted!',
        'success'
      )
    document.getElementById('bodyTablet').innerHTML = '';
    document.getElementById('lista-carrito').innerHTML = '';
    carrito = [];
    localStorage.removeItem('cartEnStorage')
}


document.getElementById('volver').onclick = () => {
    document.getElementById('mainPage').className = 'container-fluid mainPage';
    document.getElementById('cartPage').className = 'oculto'
}

turno.addEventListener('click', async()=>{
    const { value: email } = await Swal.fire({
        title: 'Ingrese su correo',
        input: 'email',
        inputLabel: 'Nos comunicaremos por esa vía',
        inputPlaceholder: 'Ingrese su correo'
      })
      
      if (email) {
        Swal.fire(`Nos comunicaremos con usted: ${email}`)
      }
} )

btnGatos.onclick = () => {mostrarProductos(onlyGatos);}
btnPerros.onclick = () => {mostrarProductos(onlyPerros);}
btnTodo.onclick = () => {mostrarProductos(todoProducts);}
buscarProducto.onclick= () =>{filtrarBusqueda();}
valorInput.addEventListener('keyup', ()=>{filtrarBusqueda();})

iniciar();