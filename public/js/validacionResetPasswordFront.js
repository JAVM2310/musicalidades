window.onload = ()=>{

    let form = document.querySelector("form")

    form.addEventListener("submit",(event)=>{
        event.preventDefault()

        let valEmail = false 

        let email = document.querySelector("#email")

        let emailValor = email.value

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
                    valEmail = !emailDisponible
                    if (!emailDisponible){
                        if (document.querySelector('label[for="email"] .error-validacion') != null){
                            document.querySelector('label[for="email"] .error-validacion').style.display = "none"
                        }
                    } else {
                        if (document.querySelector('label[for="email"] .error-validacion') == null){
                            let emailLabel = document.querySelector('label[for="email"]')
                            emailLabel.innerHTML = "<p class=error-validacion >El mail no está registrado</p>" + emailLabel.innerHTML
                            document.querySelector("#email").value = emailValor
                        } else {
                            document.querySelector('label[for="email"] .error-validacion').style.display = "block"
                        }
                    }
                    if (valEmail){
                        fetch(`api/resetPassword/${email.value}`)
                        .then(response => response.json())
                        .then(respuesta => {
                            window.alert(respuesta)
                        })
                    }
                })
        }
    })
    
}