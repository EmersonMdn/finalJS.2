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