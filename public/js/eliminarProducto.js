window.addEventListener('load', function() {
    eliminar();
    async function eliminar(){
        let botonEliminar = document.querySelectorAll(".botones-admin-eliminar")
        for(let botones of botonEliminar){
            let url = botones.getAttribute('id')
            let name = botones.getAttribute('rel')

            botones.addEventListener("click", ()=>{
                
                Swal.fire({
                    icon: 'warning',
                    title: 'Querés eliminar el producto '+name+'?',
                    text: 'Esta acción NO se puede deshacer!',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar!'
                }).then((result) => {
                    if (result.value) {
                        window.location.href=url;
                    }
                })
            })
        }
    }

})
