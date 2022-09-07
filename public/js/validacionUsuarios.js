window.onload = ()=>{

    let form = document.querySelector("form")

    form.addEventListener("submit",(event)=>{
        event.preventDefault()

        let valNombre = false
        let valApellido = false
        let valPassword = false
        let valPasswordRepetida = false
        let valEmail = false
        let valAvatar = false

        let nombre = document.querySelector("#nombre")
        let apellido = document.querySelector("#apellido")
        let email = document.querySelector("#email")
        let password = document.querySelector("#password")
        let passwordRepetida = document.querySelector("#passwordRepetida")
        let pais = document.querySelector("#pais")
        let provincia = document.querySelector("#provincia")
        let ciudad = document.querySelector("#ciudad")
        let direccion = document.querySelector("#direccion")
        let codigo = document.querySelector("#codigo")
        let fechaNac = document.querySelector("#fechaNac")
        let avatar = document.querySelector("#avatar")

        if (nombre.value.length < 2){
            valNombre = false
            if (document.querySelector('label[for="nombre"] .error-validacion') == null){
                let nombreLabel = document.querySelector('label[for="nombre"]')
                nombreLabel.innerHTML = "<p class=error-validacion >El nombre debe tener al menos 2 caracteres:</p>" + nombreLabel.innerHTML
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
                apellidoLabel.innerHTML = "<p class=error-validacion >El apellido debe tener al menos 2 caracteres:</p>" + apellidoLabel.innerHTML
            } else {
                document.querySelector('label[for="apellido"] .error-validacion').style.display = "block"
            }
        } else {
            valApellido = true
            if (document.querySelector('label[for="apellido"] .error-validacion') != null){
                document.querySelector('label[for="apellido"] .error-validacion').style.display = "none"
            }
        }

        fetch(`/disponible/${email.value}`)
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
                        emailLabel.innerHTML = "<p class=error-validacion >El mail ya está registrado:</p>" + emailLabel.innerHTML
                    } else {
                        document.querySelector('label[for="email"] .error-validacion').style.display = "block"
                    }
                }
            })

        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(password.value)){
            valPassword = false
            if (document.querySelector('label[for="password"] .error-validacion') == null){
                let passwordLabel = document.querySelector('label[for="password"]')
                passwordLabel.innerHTML = "<p class=error-validacion >La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número:</p>" + passwordLabel.innerHTML
            } else {
                document.querySelector('label[for="password"] .error-validacion').style.display = "block"
            }
        } else {
            valPassword = true
            if (document.querySelector('label[for="password"] .error-validacion') != null){
                document.querySelector('label[for="password"] .error-validacion').style.display = "none"
            }
        }

        if (passwordRepetida.value != password.value){
            valPasswordRepetida = false
            if (document.querySelector('label[for="passwordRepetida"] .error-validacion') == null){
                let passwordRepetidaLabel = document.querySelector('label[for="passwordRepetida"]')
                passwordRepetidaLabel.innerHTML = "<p class=error-validacion >Las contraseñas no son iguales</p>" + passwordRepetidaLabel.innerHTML
            } else {
                document.querySelector('label[for="passwordRepetida"] .error-validacion').style.display = "block"
            }
        } else {
            valPasswordRepetida = true
            if (document.querySelector('label[for="passwordRepetida"] .error-validacion') != null){
                document.querySelector('label[for="passwordRepetida"] .error-validacion').style.display = "none"
            }
        }

        if((/(.jpg)$/).test(avatar.value) || (/(.jpeg)$/).test(avatar.value) || (/(.png)$/).test(avatar.value) || (/(.gif)$/).test(avatar.value || avatar.value.length == 0)){
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

        if (valNombre && valApellido && valEmail && valPassword && valPasswordRepetida && valAvatar){
            this.submit()
        }
    })
    
}