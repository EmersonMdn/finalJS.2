const verificarLS = () => {
    let productoLS = JSON.parse(localStorage.getItem('cartEnStorage'));

    if (productoLS) {
        for (const objeto of productoLS) {
            let producto = new Producto(objeto, objeto.cantidad);
            producto.actualizarPrecioTotal();
            carrito.push(producto);
        }
        imprimirCarro(carrito);
    }
}


const nombres = async() => {
    let nombre = await fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(data => {
    
        let contenedor = document.getElementById('contactosFT');

        data.forEach(element => {
            let p = document.createElement('span');
            p.innerHTML = `${element.name} Mail: ${element.email}`;

        contenedor.append(p) ; 
        });
    })
	.catch(err => console.error(err));
}
nombres()

