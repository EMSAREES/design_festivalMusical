document.addEventListener('DOMContentLoaded', function () {

    navegacionFija();
    carruselImagenes();
    crearGaleria();
    resaltarEnlaces();
    scrollNav();
});

function navegacionFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    });
}

function carruselImagenes(){
    const imagenes = [
        'src/img/imagen_dj.jpg',
        'src/img/niofor.jpg',
        'src/img/guasave_ultra.jpg'
    ];

    let i = 0;
    const imagen = document.getElementById('imagen-carrusel');

    setInterval(() => {
        imagen.src = imagenes[i];

        i++;

        if(i === imagenes.length){
            i = 0;
        }
    }, 3000);
}

function crearGaleria(){

    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen Galeria`;

        //Event Handler
        imagen.onclick = function(){
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }

}

function mostrarImagen(i){

    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen Galeria`;


    //general modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //pasar imagen del modal

    //boton cerrar modal
    const cerrarModalbtn = document.createElement('BUTTON');
    cerrarModalbtn.textContent = 'X';
    cerrarModalbtn.classList.add('btn-cerrar');
    cerrarModalbtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalbtn);
    
    //agregar al html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal(){

    const modal = document.querySelector('.modal');

    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);

}

function resaltarEnlaces(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(window.scrollY >= (sectionTop - sectionHeight / 3) ){
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#` + actual){
                link.classList.add('active');        
            }
        });
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
