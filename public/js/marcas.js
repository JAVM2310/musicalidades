
console.log('me lees?');
    
window.onload = function(){
    console.log('me lees2?')
    let botonMarcaNueva = document.querySelector('#checkMarcaNueva');
    botonMarcaNueva.addEventListener('click', function(){
        
        botonMarcaNueva.innerHTML += 'holaaaa';

        let inputMarcaNueva = document.getElementsById('#marcaNuevaNombre');
        
        inputMarcaNueva.classList.toggle('.marcaNuevaNombre');

    })
}



