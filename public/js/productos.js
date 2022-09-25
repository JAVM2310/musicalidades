window.addEventListener('load', function() {
    ready()
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
    console.log(info.data.productos)
    return info.data.productos
}

async function ready() {
    const PRODUCTOS = await fetchProducts()
    displayProds(PRODUCTOS)
    let searchBar = document.querySelector("#buscador-menu")
    searchBar.addEventListener("change", (e) => {
        busqueda(e.target.value, PRODUCTOS)
    })
}

function displayProds(products) {
    let admin = false;

   /*  fetch('/api/adminCheck')
            .then(response => response.json())
            .then(userIsAdmin => {
                admin = userIsAdmin
             */
                //capturar el cartelito de VISTA DE ADMIN
                let container = document.getElementById("productos-destacados")
                container.innerHTML= ``
                products.forEach((product, i) => {
                    container.innerHTML += `<div class="productos-destacados" id="productos-destacados${i}"></div>`
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

    /* }) */
}


function busqueda(busca, products) {
    if (busca == "") {
        displayProds(products)
    }
    else {
        let filtro = products.filter(row => row.nombre.toLowerCase().includes(busca.toLowerCase()) || row.descripcion.toLowerCase().includes(busca.toLowerCase()) || row.descLarga.toLowerCase().includes(busca.toLowerCase()))
        /* filtro.sort((a,b) => {
            return a.price - b.price
        }) */
        displayProds(filtro)
    }
}

