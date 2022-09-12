window.addEventListener('load', function() {

    let imgsCarousel = document.querySelectorAll(".imgsCarousel .imgsDiv")
    console.log(imgsCarousel)
    for(let div of imgsCarousel){
        console.log(div)
        if(div.id == ""){ 
            div.remove();
        }
    }

    let imgsThumbnails = document.querySelectorAll(".carousel-indicadores li")
    for(let thumbnail of imgsThumbnails){
        if(thumbnail.id == ""){ 
            thumbnail.remove();
        }
    }
});