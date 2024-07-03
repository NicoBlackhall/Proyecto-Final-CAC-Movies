/* PARA QUE FUNCIONE CORRECTAMENTE CUANDO COMENZAMOS A TRABAJAR EN EL LOCALSTORAGE RECUERDEN COMENTAR EL ARRAY DE PELICULAS */


/* Como yo voy a trabajar con objetos de un formato especifico que van a tener las peliculas --> Me voy a crear una class Movie (molde/plantilla) */

class Hotel{

    //METODO CONSTRUCTOR
    constructor(id,nameHotel,valoracion,mail,num,pagWeb){
        this.id = id;
        this.nameHotel=nameHotel;
        this.valoracion=valoracion;
        this.mail=mail;
        this.num=num;
        this.pagWeb=pagWeb
    }
}

/* PUNTO 2 */

/* PRIMER EJEMPLO */
function showHotel(){
 /* PUNTO 3 */
    let hotel = JSON.parse(localStorage.getItem('hotel'));

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyHotel = document.querySelector("#tbody-table-hotel");
    
    //limpio el contenido de la tabla
    tbodyHotel.innerHTML = '';

    /* CON ESTE FOREACH VAMOS A RECORRER TODOS LOS ELEMENTOS DEL ARRAY --> A CADA ITEM LO VA A LLAMAR MOVIE Y NOSOTROS DENTRO DE ESTA FUNCION VAMOS A ESCRIBIR LO QUE QUEREMOS QUE SE HAGA  */
    hotel.forEach(hotel => {
        /* QUIERO GENERAR ESTA ESTRUCTURA HTML DENTRO DEL STRING */
        const tr = `
                    <tr>
                        <td>${hotel.nameHotel}</td>
                        <td>${hotel.valoracion}</td>
                        <td>${hotel.mail}</td>
                        <td>${hotel.num}</td>
                        <td>
                            <img src="${hotel.pagWeb}" alt="${hotel-nameHotel}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac"><i class="fa fa-trash"></i></button> 
                        </td>
                    </tr>
        `; // fa fa-trash --> iconito de tacho de basura

        // Funcion que permite introducir un string con formato HTML en una posicion especifica de ese elemento al cual yo estoy accediendo. /// beforeend --> al final de su ultimo hijo que tenga este elemento. Que inserte la cadena que es el tr 
        tbodyHotel.insertAdjacentHTML('beforeend',tr);
        
    });    

};


function saveHotel(){

    // alert("Guardando...");
    
    const inputnameHotel = document.querySelector('#nameHotel');
    const inputvaloracion = document.querySelector('#valoracion');
    const inputmail = document.querySelector('#mail');
    const inputnum = document.querySelector('#num');
    const inputpagWeb = document.querySelector('#pagWeb');

    if(inputnameHotel.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let hotel = JSON.parse(localStorage.getItem('hotel')) || [];

        const newMovie = new Movie(
            // COMO NO SE EL ID DE MOVIES QUE DEBERIA TENER VOY A TRABAJAR CON EL LARGO + 1, SOLO POR AHORA. (CUANDO ESTO YA SE CONECTE CORRECTAMENTE CON UN SERVIDOR A ESE ID YA NO LO VAMOS A GENERAR NOSOTROS --> SE VA A GENERAR INTERNAMENTE EN EL SERVIDOR. ACA SOLO A FINES PRACTICOS LO HACEMOS DE ESTA MANERA. )
            hotel.length+1,
            inputnameHotel.value,
            inputvaloracion.value,
            inputmail.value,
            inputnum.value,
            inputpagWeb.value,
        );
        // agrego al final del array movies la nueva pelicula
        hotel.push(newHotel);
        //Actualizo el localstorage
        localStorage.setItem('hotel',JSON.stringify(hotel));
        showMovies();
    }else{
        alert('Error, por favor complete el titulo')
    };

};

/* Nosotros debemos asegurarnos de que los elementos HTML esten cargaddos en el document object model. Entonces una manera de poder asegurarnos de que todo lo que necesitemos manipular y las funciones que necesitemos asociar a los diferentes elementos HTML esten funcionando o se ejecuten una vez que todo ese DOM este cargado. Vamos a usar el objeto document...     */


// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-hotel');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveHotel);
    showHotel();
});

/* document.addEventListener('DOMContentLoaded', function() { ... });:

Esta línea agrega un evento al documento (la página web).
El evento es DOMContentLoaded, que se dispara cuando el documento HTML ha sido completamente cargado y analizado, sin esperar a que se carguen completamente las hojas de estilo, imágenes y subtramas.
La función pasada como segundo argumento se ejecutará una vez que el DOM esté listo.
const btnSaveMovie = document.querySelector('#btn-save-movie');:

Utiliza el método document.querySelector para seleccionar el primer elemento del documento que coincide con el selector CSS #btn-save-movie.
En este caso, está seleccionando un elemento con el id btn-save-movie y lo guarda en la constante btnSaveMovie.
Este elemento probablemente sea un botón que el usuario puede hacer clic.
btnSaveMovie.addEventListener('click', saveMovie);:

Asocia un evento click al elemento btnSaveMovie.
addEventListener es un método que permite registrar un evento específico (en este caso, click) en un elemento específico.
La función saveMovie se ejecutará cada vez que el usuario haga clic en el botón btnSaveMovie.

showMovies();:

Llama a la función showMovies. */