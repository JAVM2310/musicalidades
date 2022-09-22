window.onload = ()=>{
    console.log("se carga el script")
    let form = document.querySelector("form")
    let emailActual = document.querySelector("#email").value
    

    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        let valNombre = false
        let valApellido = false
        let valEmail = false
        let valAvatar = false
        let valPais = false
        let valProvincia  = false
        let valCiudad = false
        let valDireccion = false
        let valCodigo = false
        let valFechaNac = false

        let nombre = document.querySelector("#nombre")
        let apellido = document.querySelector("#apellido")
        let email = document.querySelector("#email")
        let avatar = document.querySelector("#avatar")
        let pais = document.querySelector("#pais")
        let provincia = document.querySelector("#provincia")
        let ciudad = document.querySelector("#ciudad")
        let direccion = document.querySelector("#direccion")
        let codigo = document.querySelector("#codigo")
        let fechaNac = document.querySelector("#fechaNac")

        let nombreValor = nombre.value
        let apellidoValor = apellido.value
        let emailValor = email.value
        let paisValor = pais.value
        let provinciaValor = provincia.value
        let ciudadValor = ciudad.value
        let direccionValor = direccion.value
        let codigoValor = codigo.value
        let fechaNacValor = fechaNac.value

        if (nombre.value.length < 2 || nombre.value.length > 90){
            valNombre = false
            if (document.querySelector('label[for="nombre"] .error-validacion') == null){
                let nombreLabel = document.querySelector('label[for="nombre"]')
                nombreLabel.innerHTML = "<p class=error-validacion >El nombre debe tener al menos 2 caracteres</p>" + nombreLabel.innerHTML
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

        if (apellido.value.length < 2){
            valApellido = false
            if (document.querySelector('label[for="apellido"] .error-validacion') == null){
                let apellidoLabel = document.querySelector('label[for="apellido"]')
                apellidoLabel.innerHTML = "<p class=error-validacion >El apellido debe tener al menos 2 caracteres</p>" + apellidoLabel.innerHTML
                document.querySelector("#apellido").value = apellidoValor
            } else {
                document.querySelector('label[for="apellido"] .error-validacion').style.display = "block"
            }
        } else {
            valApellido = true
            if (document.querySelector('label[for="apellido"] .error-validacion') != null){
                document.querySelector('label[for="apellido"] .error-validacion').style.display = "none"
            }
        }

        if((/(.jpg)$/).test(avatar.value) || (/(.jpeg)$/).test(avatar.value) || (/(.png)$/).test(avatar.value) || (/(.gif)$/).test(avatar.value) || avatar.value.length == 0){
            valAvatar = true
            if (document.querySelector('label[for="avatar"] .error-validacion') != null){
                document.querySelector('label[for="avatar"] .error-validacion').style.display = "none"
            }
        } else {
            valAvatar = false
            if (document.querySelector('label[for="avatar"] .error-validacion') == null){
                let avatarLabel = document.querySelector('label[for="avatar"]')
                avatarLabel.innerHTML = "<p class=error-validacion >Tiene que ser un archivo en formato: .jpg, .jpeg, .png o .gif</p>" + avatarLabel.innerHTML
            } else {
                document.querySelector('label[for="avatar"] .error-validacion').style.display = "block"
            }
        }

        if (pais.value.length > 90 || pais.value.length < 1){
            valPais = false
            if (document.querySelector('label[for="pais"] .error-validacion') == null){
                let paisLabel = document.querySelector('label[for="pais"]')
                paisLabel.innerHTML = "<p class=error-validacion >El país es obligatorio y no debe tener mas de 90 caracteres</p>" + paisLabel.innerHTML
                document.querySelector("#pais").value = paisValor
            } else {
                document.querySelector('label[for="pais"] .error-validacion').style.display = "block"
            }
        } else {
            valPais = true
            if (document.querySelector('label[for="pais"] .error-validacion') != null){
                document.querySelector('label[for="pais"] .error-validacion').style.display = "none"
            }
        }

        if (provincia.value.length > 90 || provincia.value.length < 1){
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
        
        if (ciudad.value.length > 90 || ciudad.value.length < 1){
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
        
        if (!(/^\d{4,4}$/.test(codigo.value))){
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
        
        if (direccion.value.length > 90 || direccion.value.length < 1){
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

        if (!fechaNac.value.length > 0){
            valFechaNac = false
            if (document.querySelector('label[for="fechaNac"] .error-validacion') == null){
                let fechaNacLabel = document.querySelector('label[for="fechaNac"]')
                fechaNacLabel.innerHTML = "<p class=error-validacion >La fecha de nacimiento es obligatoria</p>" + fechaNacLabel.innerHTML
                document.querySelector("#direccion").value = fechaNacValor
            } else {
                document.querySelector('label[for="fechaNac"] .error-validacion').style.display = "block"
            }
        } else {
            valFechaNac = true
            if (document.querySelector('label[for="fechaNac"] .error-validacion') != null){
                document.querySelector('label[for="fechaNac"] .error-validacion').style.display = "none"
            }
        }

        if (email.value != emailActual){
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
                if (document.querySelector('label[for="email"] .error-validacion') == null){
                    let emailLabel = document.querySelector('label[for="email"]')
                    emailLabel.innerHTML = "<p class=error-validacion >El mail es invalido</p>" + emailLabel.innerHTML
                    document.querySelector("#email").value = emailValor
                } else {
                    document.querySelector('label[for="email"] .error-validacion').style.display = "block"
                }
                } else {
                    if (document.querySelector('label[for="email"] .error-validacion') != null){
                        document.querySelector('label[for="email"] .error-validacion').style.display = "none"
                    }
                    fetch(`/api/disponible/${email.value}`)
                    .then(response => response.json())
                    .then(emailDisponible => {
                        valEmail = emailDisponible
                        if (emailDisponible){
                            if (document.querySelector('label[for="email"] .error-validacion') != null){
                                document.querySelector('label[for="email"] .error-validacion').style.display = "none"
                            }
                        } else {
                        if (document.querySelector('label[for="email"] .error-validacion') == null){
                            let emailLabel = document.querySelector('label[for="email"]')
                            emailLabel.innerHTML = "<p class=error-validacion >El mail ya está registrado</p>" + emailLabel.innerHTML
                        } else {
                            document.querySelector('label[for="email"] .error-validacion').style.display = "block"
                        }
                    }
                    if (valNombre && valApellido && valEmail && valPassword && valPasswordRepetida && valAvatar && valPais && valProvincia && valCiudad && valDireccion && valCodigo){
                        document.querySelector("form").submit()
                    }
                })
            }
        } else{
            valEmail = true
            if (valNombre && valApellido && valEmail && valPassword && valPasswordRepetida && valAvatar && valPais && valProvincia && valCiudad && valDireccion && valCodigo){
                document.querySelector("form").submit()
            }
        }
    })
}