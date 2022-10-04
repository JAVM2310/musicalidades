window.addEventListener('load', function() {
    listo()
})

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

async function listo() {
    const API = await fetchApi()

    let botonesRedondosVientos = document.getElementById("botones-redondos-vientos")
    botonesRedondosVientos.addEventListener("click", () => {
        API.productos = API.productos.filter(row => row.categoria_id == 4)
        let container = document.querySelector("main")
        container.innerHTML = `<br/><br/>`
        container.innerHTML += `<div><p class="link-contacto">CATEGORÍA VIENTOS | <a href="/tienda" class="blanco">Ver toda la Tienda</a></p> </div>` 
        displayProdsPerPage(API)
    })

    let botonesRedondosCuerdas = document.getElementById("botones-redondos-cuerdas")
    botonesRedondosCuerdas.addEventListener("click", () => {
        API.productos = API.productos.filter(row => row.categoria_id == 1)
        let container = document.querySelector("main")
        container.innerHTML = `<br/><br/>`
        container.innerHTML += `<div><p class="link-contacto">CATEGORÍA CUERDAS | <a href="/tienda" class="blanco">Ver toda la Tienda</a></p> </div>` 
        
        displayProdsPerPage(API)
    })

    let botonesRedondosPercusion = document.getElementById("botones-redondos-percusion")
    botonesRedondosPercusion.addEventListener("click", () => {
        API.productos = API.productos.filter(row => row.categoria_id == 3)
        let container = document.querySelector("main")
        container.innerHTML = `<br/><br/>`
        container.innerHTML += `<div><p class="link-contacto">CATEGORÍA PERCUSIÓN | <a href="/tienda" class="blanco">Ver toda la Tienda</a></p> </div>` 
        displayProdsPerPage(API)
    })
    
    let botonesRedondosTeclas = document.getElementById("botones-redondos-teclas")
    botonesRedondosTeclas.addEventListener("click", () => {
        API.productos = API.productos.filter(row => row.categoria_id == 2)
        let container = document.querySelector("main")
        container.innerHTML = `<br/><br/>`
        container.innerHTML += `<div><p class="link-contacto">CATEGORÍA TECLAS | <a href="/tienda" class="blanco">Ver toda la Tienda</a></p> </div>` 
        displayProdsPerPage(API)
    })

}



function displayProdsPerPage(API) {
    let productosPerPag = 15;
    let cantPags = API.productos.length / productosPerPag;
    if(!Number.isInteger(cantPags)){
        cantPags = parseInt(cantPags+1)
    }

    let currentPage = 1;
    if(API.productos.length == 0){
        currentPage = 0;
    }

    let paginado = document.getElementById("paginado-tienda")
    paginado.innerHTML = `
    <div class="busqueda-paginacion">
        <ul>
            <li class="pagina-anterior">
                <span class="titulo-flecha-ant"></span>
            </li>
            <li class="pagina-actual">
            </li>
            <li class="pagina-de-hasta"></li>
            <li class="pagina-siguiente">
                <span class="titulo-flecha-sig"></span>
            </li>
        </ul>
    </div>`

    let prevPage =  document.querySelector(".titulo-flecha-ant")
    let totalPags = document.querySelector(".pagina-de-hasta")
    let paginaActual = document.querySelector(".pagina-actual")
    paginaActual.innerHTML = `<span>${currentPage}</span>`
    totalPags.innerHTML = `<span>de ${cantPags}</span>`

    let nextPage =  document.querySelector(".titulo-flecha-sig")
    nextPage.innerHTML = `<button class="link">Siguiente</button>`
    if(cantPags == 1 || currentPage == 0){
        nextPage.innerHTML = `<span class="white">Siguiente</span>`
        }
    prevPage.innerHTML = `<span class="white">Anterior</span>`


    let nextPageEvent = function(){
        currentPage = currentPage+1
        if(currentPage <= cantPags){
            prevPage.addEventListener("click", prevPageEvent)
            paginaActual.innerHTML = `<span>${currentPage}</span>`
            prevPage.innerHTML = `<button class="link">Anterior</button>`
            mostrarPagina(API.productos, currentPage)
            if(currentPage == cantPags){
                nextPage.innerHTML = `<span class="white">Siguiente</span>`
                nextPage.removeEventListener("click", nextPageEvent)
            }
        }
    }

    nextPage.addEventListener("click", nextPageEvent)
    
    let prevPageEvent = function(){
        currentPage = currentPage-1
        paginaActual.innerHTML = `<span>${currentPage}</span>`
        nextPage.addEventListener("click", nextPageEvent)
        mostrarPagina(API.productos, currentPage)
        if(currentPage-1 > 1){
            paginaActual.innerHTML = `<span>${currentPage}</span>`
            nextPage.innerHTML = `<button class="link">Siguiente</button>`
        }
        if(currentPage == 1 && cantPags != 1){
            prevPage.innerHTML = `<span class="white">Anterior</span>`
            nextPage.innerHTML = `<button class="link">Siguiente</button>`
            prevPage.removeEventListener("click", prevPageEvent)
        }
    }

    let mostrarPagina = function(productos, pagina){
        if(pagina == 1){
            productos = productos.slice(0,productosPerPag)
            displayAllProducts(productos)
        }else{
            productos = productos.slice(((pagina-1)*productosPerPag), ((pagina-1)*productosPerPag)+productosPerPag)
            displayAllProducts(productos)
        }
    }
    
    mostrarPagina(API.productos, currentPage)
}




function displayAllProducts(products) {
    console.log(products)
    let admin;
    fetch('/api/adminCheck')
        .then(response => response.json())
        .then(userIsAdmin => {
            admin = userIsAdmin

                let tituloAdmin = document.querySelector(".tituloAdmin")
                tituloAdmin.innerHTML = ``
                let container = document.querySelector("main")
                if(admin == true){
                    tituloAdmin.innerHTML += `<h2 class="main titulo-admin">VISTA DE ADMINISTRACIÓN</h2>`
                }
                if(admin == true){
                    tituloAdmin.innerHTML += `
                    <a class="botones-admin naranja" href="/tienda/newProduct">AGREGAR NUEVO PRODUCTO</a>`
                }
                container.innerHTML += `
                
                <div id="productos-destacados"></div>`
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
                        <p class="p-admin"><a class="botones-admin" href="/tienda/modifyProduct/${product.id}">EDITAR</a><a class="botones-admin-eliminar" id="/tienda/deleteProduct/${product.id}" rel="${product.nombre}">ELIMINAR</a></p>
                        `
                    }else{ 
                        cadaProductoContainer.innerHTML += `<button><i class="fa-solid fa-cart-shopping"></i> AGREGAR</button>`
                    } 

                })

                
    })
}


function displayOrdenYfiltros(products) {
    if (busca == "") {
        displayProdsPerPage(products)
    }
    else {
        let filtro = products.filter(row => row.nombre.toLowerCase().includes(busca.toLowerCase()) || row.descripcion.toLowerCase().includes(busca.toLowerCase()) || row.descLarga.toLowerCase().includes(busca.toLowerCase()))
        displayProdsPerPage(filtro)
    }
}

