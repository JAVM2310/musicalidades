
window.onload = function(){
    
    let marcaNuevaNombre = document.querySelector("#marcaNuevaNombre");
    marcaNuevaNombre.style.display = "none";


    let botonMarcaNueva = document.querySelector('#checkMarcaNueva');
    
    botonMarcaNueva.addEventListener("click", function(){
        if(botonMarcaNueva.checked){
            marcaNuevaNombre.style.display = "block";
            document.querySelector("#marca").disabled = true;
    
        }else{
            marcaNuevaNombre.style.display = "none";
            document.querySelector("#marca").disabled = false;
    
        }


    })
}



