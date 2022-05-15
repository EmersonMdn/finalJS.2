console.log(comidas);

const productos = document.getElementById('listaProducts');

for (const comida of comidas) {
    let post = document.createElement('div');
    post.className = 'col-12 col-md-6 post_productos'
    post.innerHTML =`<div id='${comida.id}'>  
                        <img src="${comida.imagen}" alt=""> 
                        <h6>${comida.nombre}</h6>
                        <p id='boton${comida.id}' class='btn-comprar'>COMPRAR $${comida.precio}</p>
                    </div>`;
                    
    productos.append(post);
    let boton = document.getElementById(`boton${comida.id}`);
    
    boton.addEventListener('click', ()=> addCart(comida.id));
}

const addCart = () => {
    alert('hola')
}