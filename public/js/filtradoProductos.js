if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

async function fetchProducts() {
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


async function ready() {
    const PRODUCTOS = await fetchProducts()
    displayProds(PRODUCTOS)
    let searchBar = document.querySelector(".search-form_input")
    searchBar.addEventListener("change", (e) => {
        filtrado(e.target.value, PRODUCTOS)
    })
}

function displayProds(PRODUCTS) {
    let container = document.getElementById("containerProds")
    container.innerHTML= ``
    for (let i=0; i<PRODUCTS.length; i++) {
        container.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-3">
                <section class="product-box">
                    <a href="/products/detail/${PRODUCTS[i].id}">
                        <figure class="product-box_image">
                            <img src="/images/products/${PRODUCTS[i].image}" alt="imagen de producto">
                        </figure>
                        <article class="product-box_data">
                            <h2>Precio final: $ ${PRODUCTS[i].price - ((PRODUCTS[i].discount/100) * PRODUCTS[i].price)} </h2>
                            <span>Descuento % ${PRODUCTS[i].discount}</span>
                            <p>${PRODUCTS[i].name}</p>
                            <i class="fas fa-truck"></i>
                        </article>
                    </a>
                </section>
            </div>
        `
    }
}


function filtrado(busqueda, PRODUCTS) {
    if (busqueda == "") {
        displayProds(PRODUCTS)
    }
    else {
        let filtro = PRODUCTS.filter(row => row.name.toLowerCase().includes(busqueda.toLowerCase()) || row.description.toLowerCase().includes(busqueda.toLowerCase()))
        filtro.sort((a,b) => {
            return a.price - b.price
        })
        displayProds(filtro)
    }

}


