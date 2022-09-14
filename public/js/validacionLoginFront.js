window.addEventListener('load', function() {
    
    let formulario = document.querySelector("form");
    
    formulario.addEventListener("submit", function(evento){
        console.log("entro al submit")
        console.log(evento)
        evento.preventDefault(); //borrar cuando todo ande

        let email = document.querySelector("#email")
        let password = document.querySelector("#password")

        let emailLabel = document.querySelector('label[for="email"]');
        let passwordLabel = document.querySelector('label[for="password"]');

        let errores = 0;
        let emailPreErase = email.value;
        let passwordPreErase = password.value;
        let borrarTextoErrores = document.querySelectorAll("p.error-validacion");
        if(borrarTextoErrores){
            for(let textos of borrarTextoErrores){
                textos.remove();
            }
        }

        /* validación password */
        if(password.value == ""){
            passwordLabel.innerHTML += '<p class="error-validacion">La Contraseña no puede estar vacía</p>';
            errores++;
        }
        /* validación email */
        if(email.value == "" ){
            emailLabel.innerHTML += '<p class="error-validacion">La Dirección de correo electrónico no puede estar vacía</p>'
            document.querySelector("#email").value = passwordPreErase;
            errores++;
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
                emailLabel.innerHTML += '<p class="error-validacion">La Dirección de correo electrónico no tiene un formato válido</p>'
                document.querySelector("#email").value = emailPreErase;
                errores++;
        }else{
            fetch(`/disponible/${email.value}`)
            .then(response => response.json())
            .then(emailNoExiste => {
                if (emailNoExiste){
                    emailLabel.innerHTML += '<p class="error-validacion">La Dirección de correo electrónico no existe</p>'
                    errores++;
                }
                
                /* validación errores */
                if(errores == 0){
                    document.querySelector("form").submit();
                }
            })
        }
    })
});