window.addEventListener('load', function() {
    let productosBuscados = document.querySelector("#productos-destacados")
    let searchBar = document.querySelector("#buscador-menu")
    searchBar.addEventListener("change", (e) => {
        filtrado(e.target.value, products)
    })

    function filtrado(busqueda, products) {
        if (busqueda == "") {
            return true;
        }
        else {
            let buscar = products.filter(row => row.nombre.toLowerCase().includes(busqueda.toLowerCase()) || row.descripcion.toLowerCase().includes(busqueda.toLowerCase())|| row.descLarga.toLowerCase().includes(busqueda.toLowerCase()))
            /* filtro.sort((a,b) => {
                return a.price - b.price
            }) */
            productosBuscados.innerHTML = `
                HOLA
            `
        }
    }

})