window.addEventListener('load', function() {
    agregar();
    async function agregar(){
        let botonAgregar = document.querySelector(".boton-enviar")
        console.log(botonAgregar)

        botonAgregar.addEventListener("click", (e)=>{
            
            e.preventDefault();
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al Carrito!',
                showConfirmButton: false,
                timer: 1500
            })
            .then(()=>{
                document.querySelector("form").submit();
            })
        })
    }

})
