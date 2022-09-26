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
    return info.data.productos
}

async function ready() {
    const PRODUCTOS = await fetchProducts()
    let searchBar = document.querySelector("#buscador-menu")
    searchBar.addEventListener("change", (event) => {
        busqueda(event.target.value, PRODUCTOS)
    })
}

function displayProds(products) {
    let admin;
    fetch('/api/adminCheck')
        .then(response => response.json())
        .then(userIsAdmin => {
            admin = userIsAdmin
            console.log(admin)
                //capturar el cartelito de VISTA DE ADMIN
                let container = document.querySelector("main")
                container.innerHTML= ``
                if(admin == true){
                    container.innerHTML += `<h2 class="titulo-admin">VISTA DE ADMINISTRACIÓN</h2>`
                }
                container.innerHTML += `<h3 class="titulo">Resultado de la Búsqueda</h3>`
                if(admin== true){
                    container.innerHTML += `<a class="botones-admin naranja" href="/tienda/newProduct">AGREGAR NUEVO PRODUCTO</a>`
                }
                container.innerHTML += `
                
                <div class="resultados-busqueda"><strong>${products.length}</strong> productos encontrados</div>
                <div class="volver">
                <div class="filtros">
                    <label for="filtros"><span style="text-align:right"></span>
                        <select name="filtros" id="filtros" required> 
                            <option value="Sin categoría">FILTRAR POR</option> 
                            <option value="Cuerdas">Marcas</option>
                            <option value="Percusión">Categorías</option>                         
                        </select>
                        <select name="ordenar-por" id="ordenador" required> 
                            <option value="Sin categoría">ORDENAR POR</option> 
                            <option value="Cuerdas">A-Z</option>
                            <option value="Percusión">Z-A</option>
                            <option value="Vientos">Más Baratos</option>
                            <option value="Vientos">Más Caros</option>                                    
                        </select>
                    </label>
                    </div>
                </div>
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



function busqueda(busca, products) {

        let filtro = products.filter(row => row.nombre.toLowerCase().includes(busca.toLowerCase()) || row.descripcion.toLowerCase().includes(busca.toLowerCase()) || row.descLarga.toLowerCase().includes(busca.toLowerCase()))
        /* filtro.sort((a,b) => {
            return a.price - b.price
        }) */
        displayProds(filtro)
}

