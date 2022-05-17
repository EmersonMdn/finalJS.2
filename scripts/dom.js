/**
 * 
 * @param {array} arrayProductos  muestra en el contenedor todos los productos
 */
const mostrarProductos = (arrayProductos) => {
    productos.innerHTML = '';
    for (const producto of arrayProductos) {
        let post = document.createElement("div");
        post.className = "col-6 col-sm-4 col-md-4 col-lg-3 post_productos";
        post.innerHTML = `<div id='${producto.id}'>  
                        <img src="${producto.imagen}" alt=""> 
                        <h6>${producto.nombre}</h6>
                        <p id='btn${producto.id}' class='btn-comprar'>COMPRAR $${producto.precio}</p>
                    </div>`;

        productos.append(post);
        let boton = document.getElementById(`btn${producto.id}`);

        boton.addEventListener("click", () => addCart(producto.id));
    }
};
/**
 * 
 * @param {array} imprime array de productos en carro 
 */
const imprimirCarro = (array) => {
    // let cartStorage = JSON.parse(localStorage.getItem('cartEnStorage'));
    let lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    lista.className = "";

    let precioFinal = obtenerPrecioTotal(array);

    let producto = document.createElement("div");
    producto.className = "tabla-carrito";

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

    let vaciarCarro = document.getElementById("vaciarBtn");
    vaciarCarro.addEventListener("click", () => vaciarCarrito());

    let finalizarCompra = document.getElementById("comprarBtn");
    finalizarCompra.addEventListener("click", () => procederCompra());

    let listaTable = document.getElementById("bodyTable");

    array.forEach((element) => {
        let datos = document.createElement("tr");
        datos.innerHTML = `  <td>x${element.cantidad} ${element.marca}</td>
                            <td>$${element.precioTotal}</td>`;

        listaTable.append(datos);
    });

    localStorage.setItem("cartEnStorage", JSON.stringify(carrito));
};

/**
 * Imprime carrito al querer finalizar la compra
 */
const imprimirTodo = () => {
    let cartStorage = JSON.parse(localStorage.getItem('cartEnStorage'));
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

    cartStorage.forEach(element => {
        let datos = document.createElement('tr')
        datos.innerHTML = `  <td>x${element.cantidad} ${element.marca}</td>
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