// Versión con uso de Storage
class Alfajor {
	constructor(alfajor, cantidad) {
		this.id = alfajor.id;
		this.marca = alfajor.marca;
		this.precio = alfajor.precio;
		this.cantidad = cantidad;
		this.precioTotal = alfajor.precio;
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

// Constantes y variables
const alfajores = [
	{
		id: 0,
		marca: "Aguila",
		descripcion: "Alfajor minitorta clasica",
		precio: 100,
		img: "./img/aguilaclasica.jpg",
	},
	{
		id: 1,
		marca: "Milka",
		descripcion: "Alfajor con mouse de chocolate",
		precio: 90,
		img: "./img/milka mouse.jpg",
	},
	{
		id: 2,
		marca: "Block",
		descripcion: "Alfajor con chocolate con mani",
		precio: 95,
		img: "./img/coflerblock.jpg",
	},
	{
		id: 3,
		marca: "Bon o Bon",
		descripcion: "Alfajor con pasta de mani",
		precio: 85,
		img: "./img/bonobon.jpg",
	},
	{
		id: 4,
		marca: "Pepitos",
		descripcion: "Alfajor con chips de chocolate",
		precio: 90,
		img: "./img/pepitos.jpg",
	},
	{
		id: 5,
		marca: "Guaymallen",
		descripcion: "Alfajor de chocolate",
		precio: 85,
		img: "./img/guaymallenchocolate.jpg",
	},
];

let carrito = [];

// ----- Declaración de funciones ----- //
function obtenerPrecioTotal(array) {
	return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function agregarAlCarrito(idProducto) {
	let alfajorEnCarrito = carrito.find((elemento) => elemento.id === idProducto);

	if (alfajorEnCarrito) {
		let index = carrito.findIndex((elemento) => elemento.id === alfajorEnCarrito.id);

		carrito[index].agregarUnidad();
		carrito[index].actualizarPrecioTotal();
	} else {
		// Se agrega el alfajor, y se inicializa la cantidad del alfajor en 1,
		// por eso el 1 aquí
		carrito.push(new Alfajor(alfajores[idProducto], 1));
	}

	swal("Producto agregado!", `Alfajor ${alfajores[idProducto].marca}`, "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
	let alfajor = carrito.find((alfajor) => alfajor.id === id);

	let index = carrito.findIndex((element) => element.id === alfajor.id);

	if (alfajor.cantidad > 1) {
		carrito[index].quitarUnidad();
		carrito[index].actualizarPrecioTotal();
	} else {
		carrito.splice(index, 1);
	}

	swal("Producto eliminado con éxito", "", "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarCarrito() {
	carrito = [];
	localStorage.removeItem("carritoEnStorage");

	document.getElementById("carrito").innerHTML = "";
	document.getElementById("acciones-carrito").innerHTML = "";
}

function imprimirProductosEnHTML(array) {
	// Obtenemos el div que contendrá nuestras cards
	let contenedor = document.getElementById("contenedor");
	contenedor.innerHTML = "";

	// Recorremos el array y por cada item imprimimos una card
	for (const alfajor of array) {
		// Creamos el contendor individual para cada card
		let card = document.createElement("div");

		// Agregamos el contenido a la card
		// Observar cómo el nombre del id del botón se genera
		// de manera dinámica
		card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${alfajor.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${alfajor.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${alfajor.descripcion}</h5>
                <p class="card-text">$${alfajor.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${alfajor.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

		contenedor.appendChild(card);

		// Agregamos el evento al botón
		let boton = document.getElementById(`agregar${alfajor.id}`);

		boton.addEventListener("click", () => agregarAlCarrito(alfajor.id));
		// boton.onclick = () => agregarAlCarrito(alfajor.id);
	}
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function imprimirTabla(array) {
	let contenedor = document.getElementById("carrito");
	contenedor.innerHTML = "";

	let precioTotal = obtenerPrecioTotal(array);

	// Creamos el div que contendrá la tabla
	let tabla = document.createElement("div");

	// A ese div le agregaremos todos los datos de la tabla
	tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
            </tbody>
        </table>
    `;

	contenedor.appendChild(tabla);

	// Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
	// donde imprimiremos los datos del array
	let bodyTabla = document.getElementById("bodyTabla");

	for (let alfajor of array) {
		let datos = document.createElement("tr");
		datos.innerHTML = `
                <td>${alfajor.marca}</td>
                <td>${alfajor.cantidad}</td>
                <td>$${alfajor.precioTotal}</td>
                <td><button id="eliminar${alfajor.id}" class="btn btn-dark">Eliminar</button></td>
      `;

		bodyTabla.appendChild(datos);

		let botonEliminar = document.getElementById(`eliminar${alfajor.id}`);
		botonEliminar.addEventListener("click", () => eliminarDelCarrito(alfajor.id));
	}

	let accionesCarrito = document.getElementById("acciones-carrito");
	accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

function chequearCarritoEnStorage() {
	let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

	if (contenidoEnStorage) {
		for (const objeto of contenidoEnStorage) {
			let alfajor = new Alfajor(objeto, objeto.cantidad);
			alfajor.actualizarPrecioTotal();
			carrito.push(alfajor);
		}

		imprimirTabla(carrito);
	}
}

function filtrarBusqueda(e) {
	e.preventDefault();

	// Tomo el value del input y le agrego toLowerCase para que la búsqueda no sea
	// case sensitive
	let ingreso = document.getElementById("busqueda").value.toLowerCase();
	let filtro = alfajores.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));
	console.log(filtro);
	imprimirProductosEnHTML(filtro);
}

// --- Eventos
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// --- Invocación de funciones ---
imprimirProductosEnHTML(alfajores);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
chequearCarritoEnStorage();