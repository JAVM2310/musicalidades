window.onload = ()=>{
    let productosIDS =[];
    funcionBotonMenos = function(id){
        if (window["contador"+id] > window["stock"+id]){
            window["contador"+id] = window["stock"+id]
            document.getElementById("cantidad"+id).value = window["stock"+id]
        } else if(window["contador"+id] <= window["stock"+id] && window["contador"+id] > 1){
            window["contador"+id] -= 1
            document.getElementById("cantidad"+id).value = window["contador"+id]
        } else {
            window["contador"+id] = 1
            document.getElementById("cantidad"+id).value = window["contador"+id]
        }
        calcularTotal()
    }

    funcionBotonMas = function(id){
        if (window["contador"+id] >= window["stock"+id]){
            window.alert(`lo sentimos nuestro stock es de ${window["stock"+id]}`)
            window["contador"+id] = window["stock"+id]
            document.getElementById("cantidad"+id).value = window["stock"+id]
        } else if (window["contador"+id] >=0 && window["contador"+id] < window["stock"+id]){
            window["contador"+id] += 1
            document.getElementById("cantidad"+id).value = window["contador"+id]
        } else {
            window["contador"+id] = 1
            document.getElementById("cantidad"+id).value = window["contador"+id]
        }
        calcularTotal()
    }

    borrarProducto = function(id){
        productosIDS.splice(productosIDS.findIndex(element => element == id), 1)
        document.getElementById("productoNumero"+id).remove()
        calcularTotal()
        data = {id}
            fetch("/api/sacarCarrito",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(respuesta => {
                    //aca se hace algo o no con la respuesta
        })
    }

    calcularTotal = function(){
        let subtotal = 0
        productosIDS.map(id =>{
            subtotal += window["contador"+id] * window["precio"+id]
        })
        document.getElementById("subtotalP").innerText = "$" + Intl.NumberFormat("sp-SP").format(subtotal)
        document.getElementById("totalP").innerText = "$" + Intl.NumberFormat("sp-SP").format((subtotal + 1000))
    }

    finalizarCompra = function(){
        let errores = 0
        productosIDS.map(id=>{
            if (Number(document.getElementById("cantidad"+id).value) < 1 || Number(document.getElementById("cantidad"+id).value) > window["stock"+id]){
                errores ++
            }
        })
        if (errores == 0) {
            let productosAComprar = []
            productosIDS.map((id, i) =>{
                productosAComprar.push(
                    {id: id,
                    cantidad: Number(document.getElementById("cantidad"+id).value)}
                )
            })
            let infoUsuarioCarrito ={
                direccion: document.getElementById("direccion").value,
                provincia: document.getElementById("provincia").value,
                ciudad: document.getElementById("ciudad").value,
                codPostal: document.getElementById("codigo-p").value,
            }
            data = {productosAComprar, infoUsuarioCarrito}
            fetch("/api/comprarCarrito",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(respuesta => {
                    window.alert(respuesta)
        })
        } else {
            window.alert("ocurrio un error, revise que las cantidades de los productos sea un numero entre 1 y el stock")
        }
    }
    let carrito = document.getElementById("carrito")
    let infoUsuario = {}
    let productosEnCarrito = []
    fetch("/api/listaCarrito")
        .then(response => response.json())
        .then(respuesta => {
            respuesta.productosEnCarrito.map(product =>{
                productosEnCarrito.push(product)
            })
            infoUsuario = respuesta.infoUsuario
            productosEnCarrito.map((producto)=>{
                carrito.innerHTML += 
                '<article class="carrito-productos" id="productoNumero' + producto.id + '">' +
                '<img src="/img' + producto.imagenes[0]  + '" alt="">' +
                '<div class="carrito-cosas">'+
                '<div class="carrito-nombre-precio" id="precio' + producto.id + '">' +
                '<h2>' + producto.nombre + '</h2>' +
                '</div>' +
                '<div class="carrito-botones">' +
                '<label for="x-borrar" class="x-borrar-l">' +
                '<button class="x-borrar" id="xBorrar' + producto.id + '">x</button>' +
                '</label>' +
                '<div class="cantidad">' +
                '<label for="-">' +
                '<button id="-' + producto.id + '" name="menos">-</button>' +
                '</label>' +
                '<label for="cantidad">' +
                '<input type="number" name="cantidad" id="cantidad' + producto.id + '" value="' + producto.cantidadEnCarrito + '" required>' +
                '</label>' +
                '<label for="+">' +
                '<button id="+' + producto.id + '" name="mas">+</button>' +
                '</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</article>'
                if (producto.descuento > 0){
                    document.getElementById("precio"+producto.id).innerHTML += 
                    '<span class="precio-tachado-big">$' + Intl.NumberFormat("sp-SP").format(producto.precio) + '</span>' +
                    '<span class="precio">$' + Intl.NumberFormat("sp-SP").format((producto.precio * (100-producto.descuento))/100) + '</span>' +
                    '<p class="descuento">' + producto.descuento + '% OFF</p>'
                } else {
                    document.getElementById("precio"+producto.id).innerHTML += 
                    '<p class="precio">$' + Intl.NumberFormat("sp-SP").format(producto.precio) + '</p>' +
                    '<p class="descuento">      </p>'
                }
            })
            
            productosEnCarrito.map((producto,)=>{
                productosIDS.push(producto.id)
                if (producto.descuento > 0) {
                    window["precio"+producto.id] = (producto.precio * (100-producto.descuento))/100
                } else {
                    window["precio"+producto.id] = producto.precio
                }
                
                window["contador"+producto.id] = producto.cantidadEnCarrito
                window["stock"+producto.id] = producto.stock
                window["productID"+producto.id] = producto.id
                
                document.getElementById("-"+producto.id).addEventListener("click", event=>{
                    event.preventDefault()
                    funcionBotonMenos(window["productID"+producto.id])
                })
                
                document.getElementById("+"+producto.id).addEventListener("click", event=>{
                    event.preventDefault()
                    funcionBotonMas(window["productID"+producto.id])
                })

                document.getElementById("xBorrar"+producto.id).addEventListener("click",event =>{
                    event.preventDefault()
                    borrarProducto(window["productID"+producto.id])
                })
                
            })
            calcularTotal()
            document.getElementById("direccion").value = infoUsuario.direccion
            document.getElementById("provincia").value = infoUsuario.provincia
            document.getElementById("ciudad").value = infoUsuario.ciudad
            document.getElementById("codigo-p").value = infoUsuario.codPostal
            document.getElementById("botonFinalizarCompra").addEventListener("click", event=>{
                event.preventDefault()
                finalizarCompra()
            })
        })
}