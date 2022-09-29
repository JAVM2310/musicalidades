window.onload = ()=>{
    let botonMenos = document.getElementById("-")
    let botonMas = document.getElementById("+")
    let cantidad = document.getElementById("cantidad")
    let contador = Number(document.getElementById("cantidad").value)
    let stock = Number(document.getElementById("stockCantidad").innerText)
    let botonEnviar = document.getElementById("enviar")
    let productoId = Number(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1])

    botonMenos.addEventListener("click", (event)=>{
        event.preventDefault()
        if (contador > stock){
            contador = stock
            cantidad.value = stock
        } else if(contador <= stock && contador > 1){
            contador -= 1
            cantidad.value = contador
        } else {
            contador = 1
            cantidad.value = contador
        }
    })

    botonMas.addEventListener("click", (event)=>{
        event.preventDefault()
        if (contador >= stock){
            window.alert(`lo sentimos nuestro stock es de ${stock}`)
            contador = stock
            cantidad.value = stock
        } else if (contador >=0 && contador < stock){
            contador += 1
            cantidad.value = contador
        } else {
            contador = 1
            cantidad.value = contador
        }
    })

    botonEnviar.addEventListener("click", (event)=>{
        event.preventDefault()
        if ( Number(cantidad.value) > stock || Number(cantidad.value) < 1) {
            return window.alert("Para agregar al carrito la orden debe ser un numero entre 1 y el stock")
        } else {
            data = {cantidad: Number(cantidad.value), productoId}
            fetch(`/api/agregarCarrito`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(respuesta => {
                    window.alert(respuesta)
        })
        }
    })
}