window.addEventListener('load', function() {
    ready()
})

async function fetchProducts() {
    const res = await fetch('http://localhost:3001/api/products', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const info = await res.json()
    return info.data
}

async function ready() {
    const API = await fetchProducts()    

    let searchBar = document.querySelector("#buscador-menu")
    searchBar.addEventListener("change", (event) => {
        busqueda(event.target.value, API)
    })
}

function displayProdsPorPag(products) {
    let productosPerPag = 15;
    let cantPags = products.length / productosPerPag;
    if(!Number.isInteger(cantPags)){
        cantPags = parseInt(cantPags+1)
    }

    let currentPage = 1;
    if(products.length == 0){
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
            mostrarPagina(products, currentPage)
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
        if (productos.length == 0) {
            let tituloBusquedaAdmin = document.querySelector(".busquedaTitulo")
            tituloBusquedaAdmin.innerHTML = `<h4 class="resultados-busqueda gray">Resultado de la Búsqueda</h4>
                <div class="resultados-busqueda"><strong>${productos.length}</strong> productos encontrados</div>`
                productos = productos.slice(0,productosPerPag)
                displayProds(productos)
        }else if (productos.length == 1){
            let tituloBusquedaAdmin = document.querySelector(".busquedaTitulo")
            tituloBusquedaAdmin.innerHTML = `<h4 class="resultados-busqueda gray">Resultado de la Búsqueda</h4>
                <div class="resultados-busqueda"><strong>${productos.length}</strong> producto encontrado</div>`
                productos = productos.slice(0,productosPerPag)
                displayProds(productos)
        }else{
            if (pagina == 1){
                
                let tituloBusquedaAdmin = document.querySelector(".busquedaTitulo")
                tituloBusquedaAdmin.innerHTML = `<h4 class="resultados-busqueda gray">Resultado de la Búsqueda</h4>
                    <div class="resultados-busqueda"><strong>${productos.length}</strong> productos encontrados</div>`
                
                productos = productos.slice(0,productosPerPag)
                displayProds(productos)
            }else{
                productos = productos.slice(((pagina-1)*productosPerPag), ((pagina-1)*productosPerPag)+productosPerPag)
                displayProds(productos)
            }
        }
    }
    
    mostrarPagina(products, currentPage)
}



function displayProds(products) {

    fetch('/api/adminCheck')
        .then(response => response.json())
        .then(userIsAdmin => {
                let tituloAdmin = document.querySelector(".tituloAdmin")
                tituloAdmin = ``
                if (userIsAdmin == true) {
                    tituloAdmin.innerHTML += `<h2 class="titulo-admin">VISTA DE ADMINISTRACIÓN</h2>>`
                }
                let container = document.querySelector("main")
                container.innerHTML = ``
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
                    if (userIsAdmin == true) {
                        cadaProductoContainer.innerHTML += ` 
                        <p class="p-admin"><a class="botones-admin" href="/tienda/modifyProduct/${product.id}">EDITAR</a>
                        <span id="botonEliminar"><a class="botones-admin-eliminar" id="/tienda/deleteProduct/${product.id}" rel="${product.nombre}">ELIMINAR</a></span>
                        `
                    }else{ 
                        cadaProductoContainer.innerHTML += `<button><i class="fa-solid fa-cart-shopping"></i> AGREGAR</button>`
                    } 
                })
                
                /*ELIMINAR PRODUCTOS */
                let botonEliminar = document.querySelectorAll(".botones-admin-eliminar")
                for(let botones of botonEliminar){
                    let url = botones.getAttribute('id')
                    let name = botones.getAttribute('rel')

                    botones.addEventListener("click", ()=>{
                        
                        Swal.fire({
                            icon: 'warning',
                            title: 'Querés eliminar el producto '+name+'?',
                            text: 'Esta acción NO se puede deshacer!',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, eliminar!'
                        }).then((result) => {
                            if (result.value) {
                                window.location.href=url;
                            }
                        })
                    })
                }
    })
}



function busqueda(busca, products) {
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
    </section><br/>`
    let filtro = products.productos.filter(row => row.nombre.toLowerCase().includes(busca.toLowerCase()) || row.descripcion.toLowerCase().includes(busca.toLowerCase()) || row.descLarga.toLowerCase().includes(busca.toLowerCase()))
    let filtrados;
    let ordenados;
    let optionSelectOrden = document.querySelector(".optionSelectOrden")

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
                ordenados = filtro.sort((a,b) => {
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
                ordenados = filtro.sort((a,b) => {
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
                ordenados = filtro.sort((a,b) => {
                    return a.precio - b.precio
                })
            }
        }else if (event.target.value == "caros"){
            if(filtrados != undefined){
                ordenados = filtrados.sort((a,b) => {
                    return b.precio - a.precio
                })
            }else{
                ordenados = filtro.sort((a,b) => {
                    return b.precio - a.precio
                })
            }
        }else if (event.target.value == ""){
            if(filtrados != undefined){
                ordenados = filtrados
            }else{
                ordenados = filtro
            }
        }
        
        displayProdsPorPag(ordenados)
        
    })

        
/* /////////// FUNCIÓN SELECT FILTRAR POR ///////////////////// */

    /* MARCA */
    let filtrarPorMarca = document.querySelector(".selectMarcas")
    filtrarPorMarca.innerHTML += ``
    let marcas = products.marcas.sort((a,b) => {
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
                    filtrados = filtro.filter(row => row.marca_id == `${marca.id}`)
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                }else{
                    filtrados = filtro.filter(row => row.marca_id == `${marca.id}`)
                }
                displayProdsPorPag(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = filtro
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    displayProdsPorPag(filtrados)
                }else{
                    filtrados = filtro
                    displayProdsPorPag(filtrados)
                }
            }

        })
    })

    /* CATEGORIAS */
    let filtrarPorCategoria = document.querySelector(".selectCategorias")
    filtrarPorCategoria.innerHTML += ``
    let categorias = products.categorias.sort((a,b) => {
        if (a.nombre < b.nombre) return -1
        if (a.nombre > b.nombre) return 1
        return 0
    })
    categorias.forEach((categoria) => {
        filtrarPorCategoria.innerHTML += `<option class="categoria${categoria.id}" value="categoria${categoria.id}">${categoria.tipo}</option>`
        selectFiltros.addEventListener("change", (event) => {
            if(event.target.value == `categoria${categoria.id}`){
                if(ordenados != undefined){
                    filtrados = filtro.filter(row => row.categoria_id == `${categoria.id}`)
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                }else{
                    filtrados = filtro.filter(row => row.categoria_id == `${categoria.id}`)
                    
                }
                console.log(filtrados)
                displayProdsPorPag(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = filtro
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    console.log(filtrados)
                    displayProdsPorPag(filtrados)
                }else{
                    filtrados = filtro
                    console.log(filtrados)
                    displayProdsPorPag(filtrados)
                }
            }
        }) 
    })

    displayProdsPorPag(filtro)
}


