const productos = document.getElementById('listaProducts');
let carrito = [];
let todoProducts = comidas.concat(juguetes);

let btnTodo = document.getElementById('items-todo');
let btnGatos = document.getElementById('items-gatos');
let btnPerros = document.getElementById('items-perros');
let buscarProductoValue = document.getElementById('buscarProductoValue').value;
let buscarProducto = document.getElementById('buscarProductoBtn');

let onlyGatos = [];
onlyGatos = todoProducts.filter(elemento => elemento.animal === 'gato')

let onlyPerros = [];
onlyPerros = todoProducts.filter(elemento => elemento.animal === 'perro')