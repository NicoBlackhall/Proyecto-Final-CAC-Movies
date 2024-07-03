/* PARA QUE FUNCIONE CORRECTAMENTE CUANDO COMENZAMOS A TRABAJAR EN EL LOCALSTORAGE RECUERDEN COMENTAR EL ARRAY DE PELICULAS */


/* Como yo voy a trabajar con objetos de un formato especifico que van a tener las peliculas --> Me voy a crear una class Movie (molde/plantilla) */

class Movie{

    //METODO CONSTRUCTOR
    constructor(id,title,director,rating,releaseDate,banner){
        this.id = id;
        this.title=title;
        this.director=director;
        this.rating=rating;
        this.releaseDate=releaseDate;
        this.banner=banner
    }
}

const movie1 = new Movie(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

const movie2 = new Movie(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

const movie3 = new Movie(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// VOY A SIMULAR QUE ESTAS PELICULAS LAS OBTENGO DEL SERVIDOR - En un principio las almaceno en un array
// let movies = [movie1,movie2,movie3]; 

// console.log(movies); //--> Array de objetos

/* REPASO ANTES DE CREAR LA FUNCION showMovies() --> */

// Definimos un array de números
const numeros = [1, 2, 3, 4, 5];

// Utilizamos un bucle for para imprimir cada número multiplicado por 2
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i] * 2);
}
console.log(numeros)

// Usamos el método forEach para imprimir cada número multiplicado por 2
numeros.forEach(numero => {
    console.log(numero * 2);
  });
console.log(numeros)

/* --> cómo funciona el método .forEach():

Iteración sobre elementos del array: El método .forEach() ejecuta una función de callback proporcionada una vez por cada elemento presente en el array en orden ascendente. En nuestro ejemplo, la función de callback se ejecuta una vez para cada número en el array numeros.

Argumentos de la función de callback: La función de callback que pasamos como argumento tiene un parámetro que representa el elemento actual del array durante la iteración. En nuestro ejemplo, hemos llamado a este parámetro numero, pero puedes nombrarlo como quieras.

Uso de la función de callback: En nuestro ejemplo, la función de callback simplemente imprime cada número multiplicado por 2. 

No retorna un nuevo array. Por lo tanto, se usa principalmente cuando queremos realizar una acción por cada elemento del array, pero no necesitamos modificar el array en sí mismo.

En resumen, el método .forEach() en JavaScript nos permite ejecutar una función de callback una vez por cada elemento presente en un array, facilitando la iteración y manipulación de los datos contenidos en dicho array. */

/* ########################################################################## ESTO DESPUES DE CREAR LA FUNCION showMovies() PARA LUEGO CONTINUAR EN EL PUNTO 3 #################################################*/
    /* PUNTO 2 */
// localStorage.setItem('movies',JSON.stringify(movies));

/* Con esta funcion voy a recorrer el array de movies, tomando cada uno de sus elementos e ir dibujando internamente dentro del tbody */

/* PRIMER EJEMPLO */
function showMovies(){

    /* ####################################################################### ESTO DESPUES DEL PUNTO 2 --> localStorage.setItem('movies',JSON.stringify(movies)); Y PUEDO COMENTAR LUEGO MI ARRAY DE PELICULAS #################################################*/
    /* PUNTO 3 */
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let movies = JSON.parse(localStorage.getItem('movies'));

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyMovies = document.querySelector("#tbody-table-movies");
    //const tbodyMovies = document.querySelector('#list-table-movies tbody'); --> otra posibilidad de seleccion

    //limpio el contenido de la tabla
    tbodyMovies.innerHTML = '';

    /* CON ESTE FOREACH VAMOS A RECORRER TODOS LOS ELEMENTOS DEL ARRAY --> A CADA ITEM LO VA A LLAMAR MOVIE Y NOSOTROS DENTRO DE ESTA FUNCION VAMOS A ESCRIBIR LO QUE QUEREMOS QUE SE HAGA  */
    movies.forEach(movie => {
        //TEMPLATE STRING - TEMPLATE LITERAL
        /* QUIERO GENERAR ESTA ESTRUCTURA HTML DENTRO DEL STRING */
        const tr = `
                    <tr>
                        <td>${movie.title}</td>
                        <td>${movie.director}</td>
                        <td>${movie.rating}</td>
                        <td>${movie.releaseDate}</td>
                        <td>
                            <img src="${movie.banner}" alt="${movie.title}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac"><i class="fa fa-trash"></i></button> 
                        </td>
                    </tr>
        `; // fa fa-trash --> iconito de tacho de basura

        // Funcion que permite introducir un string con formato HTML en una posicion especifica de ese elemento al cual yo estoy accediendo. /// beforeend --> al final de su ultimo hijo que tenga este elemento. Que inserte la cadena que es el tr 
        tbodyMovies.insertAdjacentHTML('beforeend',tr);
        
    });    

};


function saveMovie(){

    // alert("Guardando...");
    
    const inputTitle = document.querySelector('#title');
    const inputDirector = document.querySelector('#director');
    const inputRating = document.querySelector('#rating');
    const inputReleaseDate = document.querySelector('#release-date');
    const inputBanner = document.querySelector('#banner-form');

    if(inputTitle.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let movies = JSON.parse(localStorage.getItem('movies')) || [];

        const newMovie = new Movie(
            // COMO NO SE EL ID DE MOVIES QUE DEBERIA TENER VOY A TRABAJAR CON EL LARGO + 1, SOLO POR AHORA. (CUANDO ESTO YA SE CONECTE CORRECTAMENTE CON UN SERVIDOR A ESE ID YA NO LO VAMOS A GENERAR NOSOTROS --> SE VA A GENERAR INTERNAMENTE EN EL SERVIDOR. ACA SOLO A FINES PRACTICOS LO HACEMOS DE ESTA MANERA. )
            movies.length+1,
            inputTitle.value,
            inputDirector.value,
            inputRating.value,
            inputReleaseDate.value,
            inputBanner.value,
        );
        // agrego al final del array movies la nueva pelicula
        movies.push(newMovie);
        //Actualizo el localstorage
        localStorage.setItem('movies',JSON.stringify(movies));
        showMovies();
    }else{
        alert('Error, por favor complete el titulo')
    };

};

/* Nosotros debemos asegurarnos de que los elementos HTML esten cargaddos en el document object model. Entonces una manera de poder asegurarnos de que todo lo que necesitemos manipular y las funciones que necesitemos asociar a los diferentes elementos HTML esten funcionando o se ejecuten una vez que todo ese DOM este cargado. Vamos a usar el objeto document...     */


// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-movie');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveMovie);
    showMovies();
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


