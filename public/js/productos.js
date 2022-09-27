window.addEventListener('load', function() {
    displayApi()
/*     display()
 */})


async function fetchApi() {
    const res = await fetch('api/products', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const info = await res.json()
    return info.data
}

async function displayApi() {
    const API = await fetchApi()

    let filtrarPorMarca = document.querySelector(".selectMarcas")
    filtrarPorMarca.innerHTML += ``
    let marcas = API.marcas.sort((a,b) => {
        if (a.nombre < b.nombre) return -1
        if (a.nombre > b.nombre) return 1
        return 0
    })
    
    marcas.forEach((marca) => {
        filtrarPorMarca.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`
    })
    let filtrarPor = document.querySelector(".selectCategorias")
    filtrarPor.innerHTML += ``
    let categorias = API.categorias.sort((a,b) => {
        if (a.nombre < b.nombre) return -1
        if (a.nombre > b.nombre) return 1
        return 0
    })
    categorias.forEach((categoria) => {
        filtrarPor.innerHTML += `<option class="categoria${categoria.id}" value="${categoria.id}">${categoria.tipo}</option>`
    })
    let ordenarProductos = document.querySelector("#ordenador")
    let ordenados;
    ordenarProductos.addEventListener("change", (event) => {
        if(event.target.value == "a-z"){
            ordenados = API.productos.sort((a,b) => {
                if (a.nombre < b.nombre) return -1
                if (a.nombre > b.nombre) return 1
                return 0
            })
        }else if (event.target.value == "z-a"){
            ordenados = API.productos.sort((a,b) => {
                if (a.nombre > b.nombre) return -1
                if (a.nombre < b.nombre) return 1
                return 0
            })
        }else if (event.target.value == "baratos"){
            ordenados = API.productos.sort((a,b) => {
                return a.precio - b.precio
            })

        }else if (event.target.value == "caros"){
            ordenados = API.productos.sort((a,b) => {
                return b.precio - a.precio
            })
        }else if (event.target.value == ""){
            ordenados = API.productos
        }
        
        displayAllProds(ordenados)
    })
        
    displayAllProds(API.productos)
}


function displayAllProds(products) {
    let admin;

    fetch('/api/adminCheck')
        .then(response => response.json())
        .then(userIsAdmin => {
            admin = userIsAdmin

                let tituloAdmin = document.querySelector(".tituloAdmin")
                tituloAdmin.innerHTML = ``
                let container = document.querySelector("main")
                container.innerHTML = ``
                if(admin == true){
                    tituloAdmin.innerHTML += `<h2 class="main titulo-admin">VISTA DE ADMINISTRACIÓN</h2>
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
                container.innerHTML += `<div class="pagina">
                <div class="busqueda-paginacion">
                    <ul>
                        <li class="pagina-anterior">
                            <span class="pagina-anterior">Anterior</span>
                        </li>
                        <li class="pagina-corriente">
                            <span class="pagina-1">1 </span>
                        </li>
                        <li class="pagina-de-hasta">de  1</li>
                        <li class="pagina-siguiente">
                            <span class="titulo-flecha-sig">Siguiente</span>
                        </li>
                    </ul>
                </div>
            </div>`
                let volver = document.querySelector(".volverInicio")
                volver.innerHTML += `<a class="botones-admin blanco" href="/"><i class="fa-solid fa-arrow-rotate-left"></i> VOLVER A LA PÁGINA PRINCIPAL</a>`

    })
}

/* 
function busqueda(busca, products) {
    if (busca == "") {
        displayAllProds(products)
    }
    else {
        let filtro = products.filter(row => row.nombre.toLowerCase().includes(busca.toLowerCase()) || row.descripcion.toLowerCase().includes(busca.toLowerCase()) || row.descLarga.toLowerCase().includes(busca.toLowerCase()))

        displayAllProds(filtro)
    }
} */

