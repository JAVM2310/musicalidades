window.addEventListener('load', function() {
    
    let formulario = document.querySelector("form");
    let checkMarcaNueva = document.querySelector("#checkMarcaNueva")
    let marcaNuevaNombre = document.querySelector("#marcaNuevaNombre")
    marcaNuevaNombre.style.display = "none";

    checkMarcaNueva.addEventListener("click", function(){
        if(checkMarcaNueva.checked){
            marcaNuevaNombre.style.display = "block";
            document.querySelector("#marca").disabled = true;
            if(document.querySelector('label[for="marca"] p')){
                let marcaLabelP = document.querySelector('label[for="marca"] p');
                marcaLabelP.innerHTML = "";
            }
        }else{
            marcaNuevaNombre.style.display = "none";
            document.querySelector("#marca").disabled = false;
        }
    })

    formulario.addEventListener("submit", function(evento){
        console.log("entro al submit")
        //evento.preventDefault(); //borrar cuando todo ande

        let categoria = document.querySelector("#categoria")
        let marca = document.querySelector("#marca")
        let marcaNuevaNombre = document.querySelector("#marcaNuevaNombre")
        let name = document.querySelector("#name")
        let shortDesc = document.querySelector("#shortDesc")
        let longDesc = document.querySelector("#longDesc")
        let price = document.querySelector("#price")
        let discount = document.querySelector("#discount")
        let stock = document.querySelector("#stock")
        let images = document.querySelector("#images")
        let imgsChecks = document.querySelectorAll("#arrayImgs input")

        let categoriaLabel = document.querySelector('label[for="categoria"]');
        let marcaLabel = document.querySelector('label[for="marca"]');
        let marcaNuevaNombreLabel = document.querySelector('label[for="marcaNuevaNombre"]');
        let nameLabel = document.querySelector('label[for="name"]');
        let shortDescLabel = document.querySelector('label[for="shortDesc"]');
        let longDescLabel = document.querySelector('label[for="longDesc"]');
        let priceLabel = document.querySelector('label[for="price"]');
        let discountLabel = document.querySelector('label[for="discount"]');
        let stockLabel = document.querySelector('label[for="stock"]');
        let imagesLabel = document.querySelector('label[for="images"]');
        
        let imgsChecksLabel = document.querySelector(".img-products-edit");

        let errores = 0;

        let borrarTextoErrores = document.querySelectorAll("p.error");
        if(borrarTextoErrores){
            for(let textos of borrarTextoErrores){
                textos.remove();
            }
        }

        /* validación marcaNuevaNombre y marca */
        if(checkMarcaNueva.checked){
            if(marcaNuevaNombre.value == "" || marcaNuevaNombre.value.length < 2 || marcaNuevaNombre.value.length > 15){
                marcaNuevaNombreLabel.innerHTML += '<p class="error">El Nombre de la nueva Marca debe tener entre 2 y 15 caracteres</p>'
                errores++;
            }
        }else{
            if(marca.value == "seleccionar"){
                marcaLabel.innerHTML += '<p class="error">Debe seleccionar una Marca</p>'
                errores++; 
            }
        }

        /* validación categoria */
        if(categoria.value == "5"){
            categoriaLabel.innerHTML += '<p class="error">Debe seleccionar una Categoría</p>'
            errores++;
        }

        /* validación name */
        if(name.value == "" ){
            nameLabel.innerHTML += '<p class="error">El Nombre del Producto no puede estar vacío</p>'
            errores++;

        }else if(name.value.length < 10 || name.value.length > 28){
            nameLabel.innerHTML += '<p class="error">El Nombre del Producto debe tener entre 10 y 28 caracteres</p>'
            errores++;
        }

        /* validación shortDesc */
        if(shortDesc.value == "" ){
            shortDescLabel.innerHTML += '<p class="error">La Breve Descripción no puede estar vacía</p>';
            errores++;

        }else if(shortDesc.value.length < 28 || shortDesc.value.length > 60){
            shortDescLabel.innerHTML += '<p class="error">La Breve Descripción debe tener entre 20 y 60 caracteres</p>';
            errores++;
        }

        /* validación longDesc */
        if(longDesc.value == "" ){
            longDescLabel.innerHTML += '<p class="error">La Descripción Detallada no puede estar vacía</p>';
            errores++;

        }else if(longDesc.value.length < 200){
            longDescLabel.innerHTML += '<p class="error">La Descripción Detallada debe tener más de 200 caracteres<p/>';
            errores++;
        }

        /* validación price */
        if(price.value == "" ){
            priceLabel.innerHTML += '<p class="error">El Precio no puede estar vacío</p>';
            errores++;

        }else if(!isNaN(price)){
            priceLabel.innerHTML += '<p class="error">El Precio debe ser un número</p>';
            errores++;

        }else if(price.value < 0){
            priceLabel.innerHTML += '<p class="error">El Precio debe ser mayor a 0</p>';
            errores++;
        }

        /* validación discount */
        if(!isNaN(discount)){
            discountLabel.innerHTML += '<p class="error">El % de Descuento debe ser un número</p>';
            errores++;

        }else if(discount.value < 0){
            discountLabel.innerHTML += '<p class="error">El % de Descuento debe ser un número mayor o igual a 0</p>';
            errores++;
        }

        /* validación stock */
        if(!isNaN(stock)){
            stockLabel.innerHTML += '<p class="error">El % de Descuento debe ser un número</p>';
            errores++;
        }else if(stock.value < 0){
            stockLabel.innerHTML += '<p class="error">El Stock debe ser un número mayor o igual a 0</p>';
            errores++;
        }

        /* validación images */
        let extensionesAceptadas = [".jpg", ".png", ".jpeg", ".gif"]

        if(images.files.length !== 0){
            for (let i = 0; i < images.files.length; i++) {
                let f = images.files[i];
                let okFile;
                
                for (let n = 0; n < extensionesAceptadas.length; n++){
                    let ext = extensionesAceptadas[n];
                    
                    if(f.name.includes(ext)){
                        okFile = "ok";
                    }
                }
                if(okFile != "ok"){
                    imagesLabel.innerHTML += '<p class="error">Todos los archivos de imagen deben ser de tipo .jpg, .jpeg, .gif o .png</p>';
                    errores++; 
                    break;
                }
            }
        }

        /* validación imgsChecks*/
        let acumulador = 0;
        for(i=0; i<imgsChecks.length; i++){
            if( imgsChecks[i].checked){
                acumulador++;
            }
        }
        if(acumulador == imgsChecks.length && images.files.length == 0){
            imgsChecksLabel.innerHTML += '<p class="error">El producto debe conservar al menos 1 imagen</p>'
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
        }else{
            Swal.fire({
                title: 'Quieres modificar el producto?',
                text: "Esta acción no se puede deshacer!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, modificar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Hecho!',
                        'El producto ha sido modificado.',
                        'success'
                    )
                }
            })
        }
    })
});