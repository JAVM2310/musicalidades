window.onload = ()=>{
    console.log("asd");

    let form = document.querySelector("form")

    form.addEventListener("submit",(event)=>{
        event.preventDefault()

        let valNombre = false
        let valEmail = false
        let valMensaje = false

        let nombre = document.querySelector("#nombre")
        let email = document.querySelector("#email")
        let mensaje = document.querySelector("#mensaje")

        let nombreValor = nombre.value
        let emailValor = email.value
        let mensajeValor = mensaje.value

        if (!nombre.value){
            valNombre = false
            if (document.querySelector('label[for="nombre"] .error-validacion') == null){
                let nombreLabel = document.querySelector('label[for="nombre"]')
                nombreLabel.innerHTML = "<p class=error-validacion >Debes especificar tu nombre</p>" + nombreLabel.innerHTML
                document.querySelector("#nombre").value = nombreValor
            } else {
                document.querySelector('label[for="nombre"] .error-validacion').style.display = "block"
            }
        } else {
            valNombre = true
            if (document.querySelector('label[for="nombre"] .error-validacion') != null){
                document.querySelector('label[for="nombre"] .error-validacion').style.display = "none"
            }
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            valEmail = false
            if (document.querySelector('label[for="email"] .error-validacion') == null){
                let emailLabel = document.querySelector('label[for="email"]')
                emailLabel.innerHTML = "<p class=error-validacion >El mail es invalido</p>" + emailLabel.innerHTML
                document.querySelector("#email").value = emailValor
            } else {
                document.querySelector('label[for="email"] .error-validacion').style.display = "block"
            }
        } else {
            valEmail = true
            if (document.querySelector('label[for="email"] .error-validacion') != null){
                document.querySelector('label[for="email"] .error-validacion').style.display = "none"
            }
        }

        if (mensaje.value.length < 1){
            valMensaje = false
            if (document.querySelector('label[for="mensaje"] .error-validacion') == null){
                let mensajeLabel = document.querySelector('label[for="mensaje"]')
                mensajeLabel.innerHTML = "<p class=error-validacion >Debes especificar tu mensaje</p>" + mensajeLabel.innerHTML
                document.querySelector("#mensaje").value = mensajeValor
            } else {
                document.querySelector('label[for="mensaje"] .error-validacion').style.display = "block"
            }
        } else {
            valMensaje = true
            if (document.querySelector('label[for="mensaje"] .error-validacion') != null){
                document.querySelector('label[for="mensaje"] .error-validacion').style.display = "none"
            }
        }

        if (valNombre == true && valEmail == true && valMensaje == true) {
            document.querySelector("form").submit()
        }
    })
}