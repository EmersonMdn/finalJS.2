const productos = document.getElementById('listaProducts');
let carrito = [];
let todoProducts = comidas.concat(juguetes);

let btnTodo = document.getElementById('items-todo');
let btnGatos = document.getElementById('items-gatos');
let btnPerros = document.getElementById('items-perros');
let buscarProducto = document.getElementById('buscarProductoBtn');
let valorInput = document.getElementById('buscarProductoValue');
let onlyGatos = [];
onlyGatos = todoProducts.filter(elemento => elemento.animal === 'gato')

let onlyPerros = [];
onlyPerros = todoProducts.filter(elemento => elemento.animal === 'perro')

let turno = document.getElementById('turnoVet')