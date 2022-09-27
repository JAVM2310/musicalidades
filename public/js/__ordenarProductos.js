window.addEventListener('load', function() {
    cargado()
})

async function fetchProducts() {
    const res = await fetch('api/products', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const info = await res.json()
    return info.data.productos
}


async function cargado() {
    const PRODUCTOS = await fetchProducts()
    /* let listCheckbox = document.querySelector("#filtros")
    listCheckbox.multiselect(); */
    let ordenarProductos = document.querySelector("#ordenador")
    ordenarProductos.addEventListener("change", (event) => {
        ordenarPor(event.target.value, PRODUCTOS)
    })
}

function displayProds(products) {
    let admin;
    fetch('/api/adminCheck')
        .then(response => response.json())
        .then(userIsAdmin => {
            admin = userIsAdmin
            
                let container = document.querySelector("main")
                container.innerHTML= ``
                if(admin == true){
                    container.innerHTML += `<h2 class="titulo-admin">VISTA DE ADMINISTRACIÓN</h2>
                    <a class="botones-admin naranja" href="/tienda/newProduct">AGREGAR NUEVO PRODUCTO</a>`
                }
                container.innerHTML += `
                
                <div id="productos-destacados"></div>
                <div class="volverInicio"></div>`
                let busqueda = document.getElementById("productos-destacados")
                products.forEach((product, i) => {
                    busqueda.innerHTML += `<div class="productos-destacados" id="productos-destacados${i}"></div>`
                    let cadaProductoContainer = document.getElementById(`productos-destacados${i}`)
                    cadaProductoContainer.innerHTML += `
                            <a href="/tienda/productDetail/${product.id}"><img src="/img/${product.imagenes[0]}" alt=${product.nombre}></a>
                            <h3>${product.nombre}</h3>`

                            if (product.descuento > 0){ 
                    cadaProductoContainer.innerHTML += `
                        <span class="precio-tachado">$${Intl.NumberFormat('sp-SP').format(product.precio) }</span>
                        <span class="precio">$${Intl.NumberFormat('sp-SP').format((product.precio * (100-product.descuento))/100)}</span>
                        <p class="descuento">${product.descuento}% OFF</p>`
                    } else {
                        cadaProductoContainer.innerHTML += `
                        <span class="precio">$${Intl.NumberFormat('sp-SP').format(product.precio)}</span>
                        <p class="descuento"></p>`
                    } 
                    if (admin == true) {
                        cadaProductoContainer.innerHTML += ` 
                        <p class="p-admin"><a class="botones-admin" href="/tienda/modifyProduct/${product.id}">EDITAR</a><a class="botones-admin" href="/tienda/deleteProduct/${product.id}">ELIMINAR</a></p>
                        `
                    }else{ 
                        cadaProductoContainer.innerHTML += `<button><i class="fa-solid fa-cart-shopping"></i> AGREGAR</button>`
                    } 
                })
                let volver = document.querySelector(".volverInicio")
                volver.innerHTML += `<a class="botones-admin blanco" href="/"><i class="fa-solid fa-arrow-rotate-left"></i> VOLVER A LA PÁGINA PRINCIPAL</a>`
    })
}

function ordenarPor(orden, productos) {
    console.log(orden)
    let ordenProductos;
    if(orden == "a-z"){
        ordenProductos = productos.sort((a,b) => {
            if (a.nombre < b.nombre) return -1
            if (a.nombre > b.nombre) return 1
            return 0
        })
    }else if (orden == "z-a"){
        ordenProductos = productos.sort((a,b) => {
            if (a.nombre > b.nombre) return -1
            if (a.nombre < b.nombre) return 1
            return 0
        })
    }else if (orden == "baratos"){
        ordenProductos = productos.sort((a,b) => {
            return a.precio - b.precio
        })

    }else if (orden == "caros"){
        ordenProductos = productos.sort((a,b) => {
            return b.precio - a.precio
        })
    }
    displayProds(ordenProductos)
}


/*selectElement.addEventListener('change', (event) => {
  const result = document.querySelector('.result');
  result.textContent = `You like ${event.target.value}`;
});*/