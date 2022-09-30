window.addEventListener('load', function() {
    
    let botonEliminar = document.querySelectorAll("#botonEliminar")
    function confirmarEliminar(e) {
        e.preventDefault();
    for(let botones of botonEliminar){
        botones.addEventListener("click", ()=>{
            let url = e.currentTarget.getAttribute('href')
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, recall!'
            }).then((result) => {
                if (result.value) {
                    window.location.href=url;
                }
            })
        })
    }
}
})
