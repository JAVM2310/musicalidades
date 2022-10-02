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
            Swal.fire({
                icon: 'warning',
                title: `Lo sentimos nuestro stock es de ${stock} unidades`,
                showConfirmButton: true,
            })
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
            return Swal.fire({
                icon: 'warning',
                title: `Debe agregar entre 1 y ${stock} unidades`,
                showConfirmButton: true,
            })
            
        } else {
            data = {cantidad: Number(cantidad.value), productoId}
            fetch(`/api/agregarCarrito`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(respuesta => {
                    Swal.fire({
                        icon: 'success',
                        title: respuesta,
                        showConfirmButton: false,
                        timer: 1500
                    })
        })
        }
    })
}