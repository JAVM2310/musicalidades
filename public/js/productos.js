window.addEventListener('load', function() {
    displaySelectores()
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

async function displaySelectores() {
    const API = await fetchApi()

 /* /////////// CREACIÓN DE SELECTS ///////////////////// */

    let ordenYfiltros = document.querySelector(".ordenYfiltros");
        
        ordenYfiltros.innerHTML = ``
        ordenYfiltros.innerHTML += `
        <section class="ordenYfiltros">
        <div class="volver">
            <div class="filtros">
                <label for="filtros">
                    <select name="filtrarPor" class="filtrarPor" id="selectFiltros" > 
                        <option class="optionSelectFiltro" value="">FILTRAR POR</option>
                        <optgroup class="selectCategorias" label="Categorias">
                        </optgroup>
                        <optgroup class="selectMarcas" label="Marcas">
                        </optgroup>
                    </select>
                    <select name="ordenar-por" id="ordenador" required> 
                        <option class="optionSelectOrden" value="">ORDENAR POR</option> 
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="baratos">Más Baratos</option>
                        <option value="caros">Más Caros</option>                                    
                    </select>
                </label>
            </div>
        </div>
    </section>
    <br/>`
    funcionesSelect(API)
}
async function funcionesSelect(API) {
    let optionSelectOrden = document.querySelector(".optionSelectOrden")
    let filtrados;
    let ordenados;
    
/* /////////// FUNCIÓN SELECT ORDENAR POR ///////////////////// */
    let ordenarProductos = document.querySelector("#ordenador")
    ordenarProductos.addEventListener("change", (event) => {
        if(event.target.value == "a-z"){
            if(filtrados != undefined){
                ordenados = filtrados.sort((a,b) => {
                    if (a.nombre < b.nombre) return -1
                    if (a.nombre > b.nombre) return 1
                    return 0
                })
            }else{
                ordenados = API.productos.sort((a,b) => {
                    if (a.nombre < b.nombre) return -1
                    if (a.nombre > b.nombre) return 1
                    return 0
                })
            }
        }else if (event.target.value == "z-a"){
            if(filtrados != undefined){
                ordenados = filtrados.sort((a,b) => {
                    if (a.nombre > b.nombre) return -1
                    if (a.nombre < b.nombre) return 1
                    return 0
                })
            }else{
                ordenados = API.productos.sort((a,b) => {
                    if (a.nombre > b.nombre) return -1
                    if (a.nombre < b.nombre) return 1
                    return 0
                })
            }
        }else if (event.target.value == "baratos"){
            if(filtrados != undefined){
                ordenados = filtrados.sort((a,b) => {
                    return a.precio - b.precio
                })
            }else{
                ordenados = API.productos.sort((a,b) => {
                    return a.precio - b.precio
                })
            }

        }else if (event.target.value == "caros"){
            if(filtrados != undefined){
                ordenados = filtrados.sort((a,b) => {
                    return b.precio - a.precio
                })
            }else{
                ordenados = API.productos.sort((a,b) => {
                    return b.precio - a.precio
                })
            }
        }else if (event.target.value == ""){
            if(filtrados != undefined){
                ordenados = filtrados
            }else{
                ordenados = API.productos
            }
        }
        
        displayProdsPerPage(ordenados)
        
    })


/* /////////// FUNCIÓN SELECT FILTRAR POR ///////////////////// */

/* MARCA */
    let filtrarPorMarca = document.querySelector(".selectMarcas")
    filtrarPorMarca.innerHTML += ``
    let marcas = API.marcas.sort((a,b) => {
        if (a.nombre < b.nombre) return -1
        if (a.nombre > b.nombre) return 1
        return 0
    })
    let selectFiltros = document.querySelector("#selectFiltros")
    marcas.forEach((marca) => {
        filtrarPorMarca.innerHTML += `<option value="marca${marca.id}">${marca.nombre}</option>`
        selectFiltros.addEventListener("change", (event) => {
            if(event.target.value == `marca${marca.id}`){
                if(ordenados != undefined){
                    filtrados = API.productos.filter(row => row.marca_id == `${marca.id}`)
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                }else{
                    filtrados = API.productos.filter(row => row.marca_id == `${marca.id}`)
                }
                displayProdsPerPage(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = API.productos
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    displayProdsPerPage(filtrados)
                }else{
                    filtrados = API.productos
                    displayProdsPerPage(filtrados)
                }
            }

        })
    })

/* CATEGORIAS */
    let filtrarPorCategoria = document.querySelector(".selectCategorias")
    filtrarPorCategoria.innerHTML += ``
    let categorias = API.categorias.sort((a,b) => {
        if (a.nombre < b.nombre) return -1
        if (a.nombre > b.nombre) return 1
        return 0
    })
    categorias.forEach((categoria) => {
        filtrarPorCategoria.innerHTML += `<option class="categoria${categoria.id}" value="categoria${categoria.id}">${categoria.tipo}</option>`
        selectFiltros.addEventListener("change", (event) => {
            if(event.target.value == `categoria${categoria.id}`){
                if(ordenados != undefined){
                    filtrados = API.productos.filter(row => row.categoria_id == `${categoria.id}`)
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                }else{
                    filtrados = API.productos.filter(row => row.categoria_id == `${categoria.id}`)
                }
                displayProdsPerPage(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = API.productos
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    displayProdsPerPage(filtrados)
                }else{
                    filtrados = API.productos
                    displayProdsPerPage(filtrados)
                }
            }
        }) 
    })

    displayProdsPerPage(API.productos)
}




function displayProdsPerPage(products) {
    let productosPerPag = 15;
    let cantPags = products.length / productosPerPag;
    if(!Number.isInteger(cantPags)){
        cantPags = parseInt(cantPags+1)
    }
    let allPages = [];
    for(i=1; i<=cantPags; i++){
        allPages.push(i)
    }
    let currentPage = 1;

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
    if(cantPags == 1){
        nextPage.innerHTML = `<span class="white">Siguiente</span>`
        }
    prevPage.innerHTML = `<span class="white">Anterior</span>`


    let nextPageEvent = function(){
        currentPage = currentPage+1
        if(currentPage <= allPages.length){
            prevPage.addEventListener("click", prevPageEvent)
            paginaActual.innerHTML = `<span>${currentPage}</span>`
            prevPage.innerHTML = `<button class="link">Anterior</button>`
            mostrarPagina(products, currentPage)
            if(currentPage == allPages.length){
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
        mostrarPagina(products, currentPage)
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
            console.log(productos)
            displayAllProducts(productos)
        }
    }
    
    mostrarPagina(products, currentPage)
}




function displayAllProducts(products) {
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
                    tituloAdmin.innerHTML += `<h2 class="main titulo-admin">VISTA DE ADMINISTRACIÓN</h2>`
                }
                
                tituloAdmin.innerHTML += `<h3 class="titulo">Tienda</h3>`
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
                        <p class="p-admin"><a class="botones-admin" href="/tienda/modifyProduct/${product.id}">EDITAR</a><a class="botones-admin-eliminar" id="/tienda/deleteProduct/${product.id}">ELIMINAR</a></p>
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

