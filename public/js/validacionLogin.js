window.addEventListener('load', function() {
    
    let formulario = document.querySelector("form");
    
    formulario.addEventListener("submit", function(evento){
        console.log("entro al submit")
        //evento.preventDefault(); //borrar cuando todo ande

        let email = document.querySelector("#email")
        let password = document.querySelector("#password")

        let emailLabel = document.querySelector('label[for="email"]');
        let passwordLabel = document.querySelector('label[for="password"]');

        let errores = 0;

        let borrarTextoErrores = document.querySelectorAll("p.error");
        if(borrarTextoErrores){
            for(let textos of borrarTextoErrores){
                textos.remove();
            }
        }

        /* validación email */
        if(email.value == "" ){
            emailLabel.innerHTML += '<p class="error">La Dirección de correo electrónico no puede estar vacía</p>'
            errores++;
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
                emailLabel.innerHTML += '<p class="error">La Dirección de correo electrónico no tiene un formato válido</p>'
                errores++;
        }/* else{ //NO ANDA EL PREVENT DEFAULT DEL FINAL, EL RESTO OK
            fetch(`/disponible/${email.value}`)
            .then(response => response.json())
            .then(emailNoExiste => {
                if (emailNoExiste){
                    emailLabel.innerHTML += '<p class="error">La Dirección de correo electrónico no existe</p>'
                    errores++;
                }
                /* styling de errores */
                /*let textoErrores = document.querySelectorAll("p.error");
                for(let textos of textoErrores){
                    textos.style.color = "red";
                    textos.style.fontSize = "0.8em";
                }
                /* validación errores */
                /*if(errores > 0){
                    console.log("no mando el formDB")
                    evento.preventDefault(); //ESTO NO ANDA!!!
                }
            })
        } */

        /* validación email */
        if(password.value == ""){
            passwordLabel.innerHTML += '<p class="error">La Contraseña no puede estar vacía</p>';
            errores++;
        }

        /* styling de errores */
        let textoErrores = document.querySelectorAll("p.error");
        for(let textos of textoErrores){
            textos.style.color = "red";
            textos.style.fontSize = "0.8em";
        }
        /* validación errores */
        if(errores > 0){
            console.log("no mando el form")
            evento.preventDefault();
        }
    })
});