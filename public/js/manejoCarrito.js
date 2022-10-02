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
                    Swal.fire({
                        icon: 'warning',
                        title: respuesta,
                        showConfirmButton: true,
                    })
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
        let erroresProductos = 0
        let valCodigo = false
        let valCiudad = false
        let valDireccion = false
        let valProvincia = false
        productosIDS.map(id=>{
            if (Number(document.getElementById("cantidad"+id).value) < 1 || Number(document.getElementById("cantidad"+id).value) > window["stock"+id]){
                erroresProductos ++
            }
        })
        if (erroresProductos == 0) {
            let productosAComprar = []
            productosIDS.map((id, i) =>{
                productosAComprar.push(
                    {id: id,
                    cantidad: Number(document.getElementById("cantidad"+id).value)}
                )
            })
            if (productosAComprar.length < 1) {
                window.alert("debes agregar por lo menos un producto para realizar tu compra")
            } else {

                let infoUsuarioCarrito ={
                    direccion: document.getElementById("direccion").value,
                    provincia: document.getElementById("provincia").value,
                    ciudad: document.getElementById("ciudad").value,
                    codPostal: document.getElementById("codigo").value,
                }
                
                if (infoUsuarioCarrito.direccion.length > 90 || infoUsuarioCarrito.direccion.length < 1){
                    valDireccion = false
                    if (document.querySelector('label[for="direccion"] .error-validacion') == null){
                        let direccionLabel = document.querySelector('label[for="direccion"]')
                        direccionLabel.innerHTML = "<p class=error-validacion >La direccion es obligatoria y no debe tener mas de 90 caracteres</p>" + direccionLabel.innerHTML
                        document.querySelector("#direccion").value = direccionValor
                    } else {
                        document.querySelector('label[for="direccion"] .error-validacion').style.display = "block"
                    }
                } else {
                    valDireccion = true
                    if (document.querySelector('label[for="direccion"] .error-validacion') != null){
                        document.querySelector('label[for="direccion"] .error-validacion').style.display = "none"
                    }
                }
                
                if (!(/^\d{4,4}$/.test(infoUsuarioCarrito.codPostal))){
                    valCodigo = false
                    if (document.querySelector('label[for="codigo"] .error-validacion') == null){
                        let codigoLabel = document.querySelector('label[for="codigo"]')
                        codigoLabel.innerHTML = "<p class=error-validacion >El código postal es obligatorio y debe ser un número de 4 cifras</p>" + codigoLabel.innerHTML
                        document.querySelector("#codigo").value = codigoValor
                    } else {
                        document.querySelector('label[for="codigo"] .error-validacion').style.display = "block"
                    }
                } else {
                    valCodigo = true
                    if (document.querySelector('label[for="codigo"] .error-validacion') != null){
                        document.querySelector('label[for="codigo"] .error-validacion').style.display = "none"
                    }
                }
                
                if (infoUsuarioCarrito.ciudad.length > 90 || infoUsuarioCarrito.ciudad.length < 1){
                    valCiudad = false
                    if (document.querySelector('label[for="ciudad"] .error-validacion') == null){
                        let ciudadLabel = document.querySelector('label[for="ciudad"]')
                        ciudadLabel.innerHTML = "<p class=error-validacion >La ciudad es obligatoria y no debe tener mas de 90 caracteres</p>" + ciudadLabel.innerHTML
                        document.querySelector("#ciudad").value = ciudadValor
                    } else {
                        document.querySelector('label[for="ciudad"] .error-validacion').style.display = "block"
                    }
                } else {
                    valCiudad = true
                    if (document.querySelector('label[for="ciudad"] .error-validacion') != null){
                    document.querySelector('label[for="ciudad"] .error-validacion').style.display = "none"
                }
            }
            
            if (infoUsuarioCarrito.provincia.length > 90 || infoUsuarioCarrito.provincia.length < 1){
                valProvincia = false
                if (document.querySelector('label[for="provincia"] .error-validacion') == null){
                    let provinciaLabel = document.querySelector('label[for="provincia"]')
                    provinciaLabel.innerHTML = "<p class=error-validacion >La provincia es obligatoria y no debe tener mas de 90 caracteres</p>" + provinciaLabel.innerHTML
                    document.querySelector("#provincia").value = provinciaValor
                } else {
                    document.querySelector('label[for="provincia"] .error-validacion').style.display = "block"
                }
            } else {
                valProvincia = true
                if (document.querySelector('label[for="provincia"] .error-validacion') != null){
                    document.querySelector('label[for="provincia"] .error-validacion').style.display = "none"
                }
            }
            if (valDireccion == true && valCodigo == true && valCiudad == true && valProvincia == true) {
                
                data = {productosAComprar, infoUsuarioCarrito}
                fetch("/api/comprarCarrito",{
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(respuesta => {
                    Swal.fire({
                        icon: 'success',
                        title: respuesta,
                        showConfirmButton: true,
                    })
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: `Ocurrió un error, revise la informacion de envio y vuelva a intentarlo`,
                    showConfirmButton: true,
                })
            }
        }
        } else {
            Swal.fire({
                icon: 'warning',
                title: `un error, revise que las cantidades de los productos sea un numero entre 1 y el stock total`,
                showConfirmButton: true,
            })
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
            document.getElementById("codigo").value = infoUsuario.codPostal
            document.getElementById("botonFinalizarCompra").addEventListener("click", event=>{
                event.preventDefault()
                finalizarCompra()
            })
        })
}