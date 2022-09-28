
/* /////////// FUNCIÓN SELECT ORDENAR POR ///////////////////// */
let ordenarProductos = document.querySelector("#ordenador")
ordenarProductos.addEventListener("change", (event) => {
    if(event.target.value == "a-z"){
        if(filtrados != undefined){
            ordenados = filtro.sort((a,b) => {
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
            ordenados = filtro.sort((a,b) => {
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
            ordenados = filtro.sort((a,b) => {
                return a.precio - b.precio
            })
        }else{
            ordenados = filtro.sort((a,b) => {
                return a.precio - b.precio
            })
        }

    }else if (event.target.value == "caros"){
        if(filtrados != undefined){
            ordenados = filtro.sort((a,b) => {
                return b.precio - a.precio
            })
        }else{
            ordenados = filtro.sort((a,b) => {
                return b.precio - a.precio
            })
        }
    }else if (event.target.value == ""){
        if(filtrados != undefined){
            ordenados = filtro
        }else{
            ordenados = filtro
        }
    }
    
    displayAllProds(ordenados)
    
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
            displayAllProds(filtrados)
        }else if (event.target.value == ""){
            if(ordenados != undefined){
                filtrados = filtro
                optionSelectOrden = optionSelectOrden.selected = 'selected'
                displayAllProds(filtrados)
            }else{
                filtrados = filtro
                displayAllProds(filtrados)
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
            displayAllProds(filtrados)
        }else if (event.target.value == ""){
            if(ordenados != undefined){
                filtrados = filtro
                optionSelectOrden = optionSelectOrden.selected = 'selected'
                displayAllProds(filtrados)
            }else{
                filtrados = filtro
                displayAllProds(filtrados)
            }
        }
    }) 
})


displayAllProds(filtro)
}







function busqueda(busca, products) {
    let ordenYfiltros = document.querySelector(".ordenYfiltros");
    if (busca == "") {
        displayAllProds(products.productos)
    }
    else {
        
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
                ordenados = filtro.sort((a,b) => {
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
                ordenados = filtro.sort((a,b) => {
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
                ordenados = filtro.sort((a,b) => {
                    return a.precio - b.precio
                })
            }else{
                ordenados = filtro.sort((a,b) => {
                    return a.precio - b.precio
                })
            }
        }else if (event.target.value == "caros"){
            if(filtrados != undefined){
                ordenados = filtro.sort((a,b) => {
                    return b.precio - a.precio
                })
            }else{
                ordenados = filtro.sort((a,b) => {
                    return b.precio - a.precio
                })
            }
        }else if (event.target.value == ""){
            if(filtrados != undefined){
                ordenados = filtro
            }else{
                ordenados = filtro
            }
        }
        
        displayAllProds(ordenados)
        
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
                displayAllProds(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = filtro
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    displayAllProds(filtrados)
                }else{
                    filtrados = filtro
                    displayAllProds(filtrados)
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
                displayAllProds(filtrados)
            }else if (event.target.value == ""){
                if(ordenados != undefined){
                    filtrados = filtro
                    optionSelectOrden = optionSelectOrden.selected = 'selected'
                    displayAllProds(filtrados)
                }else{
                    filtrados = filtro
                    displayAllProds(filtrados)
                }
            }
        }) 
    })


    displayAllProds(filtro)
    }
}

