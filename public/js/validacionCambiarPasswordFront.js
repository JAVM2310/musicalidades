window.onload = ()=>{
    let form = document.querySelector("form")

    form.addEventListener("submit",(event)=>{
        event.preventDefault()

        valPassword = false
        valPasswordNueva = false
        valPasswordRepetida = false

        let password = document.querySelector("#password")
        let passwordNueva = document.querySelector("#passwordNueva")
        let passwordRepetida = document.querySelector("#passwordRepetida")

        if (password.value.length < 1){
            valPassword = false
            if (document.querySelector('label[for="password"] .error-validacion') == null){
                let passwordLabel = document.querySelector('label[for="password"]')
                passwordLabel.innerHTML = "<p class=error-validacion >Debe escribir su contraseña actual</p>" + passwordLabel.innerHTML
            } else {
                document.querySelector('label[for="password"] .error-validacion').style.display = "block"
            }
        } else {
            valPassword = true
            if (document.querySelector('label[for="password"] .error-validacion') != null){
                document.querySelector('label[for="password"] .error-validacion').style.display = "none"
            }
        }

        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).test(passwordNueva.value)){
            valPasswordNueva = false
            if (document.querySelector('label[for="passwordNueva"] .error-validacion') == null){
                let passwordNuevaLabel = document.querySelector('label[for="passwordNueva"]')
                passwordNuevaLabel.innerHTML = "<p class=error-validacion >La contraseña nueva debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un caracter especial</p>" + passwordNuevaLabel.innerHTML
            } else {
                document.querySelector('label[for="passwordNueva"] .error-validacion').style.display = "block"
            }
        } else {
            valPasswordNueva = true
            if (document.querySelector('label[for="passwordNueva"] .error-validacion') != null){
                document.querySelector('label[for="passwordNueva"] .error-validacion').style.display = "none"
            }
        }

        if (passwordNueva.value != passwordRepetida.value){
            valPasswordRepetida = false
            if (document.querySelector('label[for="passwordRepetida"] .error-validacion') == null){
                let passwordRepetidaLabel = document.querySelector('label[for="passwordRepetida"]')
                passwordRepetidaLabel.innerHTML = "<p class=error-validacion >La contraseña repetida debe ser igual a la contraseña nueva</p>" + passwordRepetidaLabel.innerHTML
            } else {
                document.querySelector('label[for="passwordRepetida"] .error-validacion').style.display = "block"
            }
        } else {
            valPasswordRepetida = true
            if (document.querySelector('label[for="passwordRepetida"] .error-validacion') != null){
                document.querySelector('label[for="passwordRepetida"] .error-validacion').style.display = "none"
            }
        }

        if (valPassword == true && valPasswordNueva == true && valPasswordRepetida == true){
            document.querySelector("form").submit()
        }
    })
}