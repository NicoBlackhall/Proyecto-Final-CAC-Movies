/* ¿Qué es una Promesa?
En JavaScript, una promesa es un objeto que representa la eventual finalización (o falla) de una operación asincrónica y su valor resultante. Es una manera de manejar operaciones que toman tiempo, como solicitudes a un servidor, sin bloquear el flujo del programa.
# Conceptos Clave de las Promesas
- Estados de una Promesa:
Pendiente (Pending): Estado inicial. La promesa aún no se ha resuelto ni rechazado.
Cumplida (Fulfilled): La operación asincrónica se completó con éxito.
Rechazada (Rejected): La operación asincrónica falló.
- Funciones asociadas
then(): Se ejecuta cuando la promesa se cumple.
catch(): Se ejecuta cuando la promesa es rechazada.
finally(): Se ejecuta cuando la promesa se completa, ya sea cumplida o rechazada.
 */

// console.log("INICIOOOOOO")

// function fetchData() {
//     return new Promise((resolve, reject) => {
//         // Simulamos una operación asincrónica con setTimeout
//         setTimeout(() => {
//             const success = false; // Cambia a false para simular un error
//             if (success) {
//                 resolve('Datos recibidos');
//             } else {
//                 reject('Error al recibir los datos');
//             }
//         }, 10000);
//     });
// }

// console.log("INTERMEDIOOOOO")

// // Usamos la promesa
// fetchData()
//     .then(response => {
//         console.log(response); // 'Datos recibidos'
//     })
//     .catch(error => {
//         console.error(error); // 'Error al recibir los datos'
//     })
//     .finally(() => {
//         console.log('Operación completada');
//     });

// console.log("FINNNNNNN")

/* Paso a Paso
Crear una Promesa:

La función fetchData devuelve una nueva promesa.
Dentro de la promesa, definimos la operación asincrónica usando setTimeout.

Resolver o Rechazar:
Si la operación es exitosa (success es true), llamamos a resolve con el mensaje 'Datos recibidos'.
Si la operación falla (success es false), llamamos a reject con el mensaje 'Error al recibir los datos'.

Usar la Promesa:
Llamamos a fetchData y usamos el método then para manejar el caso de éxito.
Usamos el método catch para manejar el caso de error.
Usamos finally para ejecutar código que siempre debe correr, independientemente del resultado. */

const option = {
    method: "GET",
    // method: Especifica el método HTTP de la solicitud, en este caso, GET.
    headers :{
        accept: "application/json",
        // accept: Indica que el cliente espera recibir datos en formato JSON.
        Authorization: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8"
        // Authorization: Proporciona el token de autorización necesario para acceder a la API.
    }
};

/* Los headers que estás almacenando en la constante option son metadatos adicionales que se envían junto con la solicitud HTTP al servidor. Estos headers proporcionan información adicional sobre la solicitud y pueden incluir detalles como el tipo de contenido esperado, la autenticación, las preferencias del cliente, entre otros. */

const fetchMoviesPromesa  = () => {
    //COLOCAR LOGICA DE ESPERA
    fetch("https://api.themoviedb.org/3/movie/popular",option)
    /* fetch('https://api.themoviedb.org/3/movie/popular', option) inicia una solicitud HTTP    GET a la API de The Movie Database (TMDb) para obtener una lista de películas populares.
    La solicitud incluye las opciones configuradas anteriormente, como el método GET y los encabezados */
    .then(response => response.json()) 
    /* .then(response => response.json()): La promesa devuelta por fetch resuelve con un objeto Response. El primer then() convierte la respuesta a JSON utilizando response.json(), que también devuelve una promesa que resuelve con los datos parseados. */
    .then(responseTransform => {
        console.log(responseTransform); 
        let movies = responseTransform.results;
        // results es una propiedad del objeto "responseTransform"
        const divPopular = document.querySelector('#popular-list');
        movies.forEach(movie => {
            // ATENCION A LAS IMAGENES HAY QUE AGREGARLE UN ENCABEZADO ANETRIOR EL QUE TE DA LA API
            const html = `
                    <div class="movie-item">
                        <a href="./templates/detail-movie.html" >
                            <img  class="movie-item-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                            <div class="movie-item-detail">
                                <p class="movie-item-detail-title">${movie.title}</p>
                                <p class="movie-item-detail-subtitle">${movie.release_date} - ${movie.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',html);
        });
        
    })
    .catch(error => console.error("error"));
}


/* OTRA POSIBILIDAD */
const fetchMoviesAyncAwait = async () => {
    try {
        // Hace una solicitud HTTP GET a la URL del servidor seguida de '/movie/popular'. La palabra clave await pausa la ejecución hasta que la promesa devuelta por fetch se resuelva. La variable 'response' contendrá la respuesta HTTP.
        const response =  await fetch(`https://api.themoviedb.org/3/movie/popular/movie/popular`, 
        option);
        // const response = await axios(`${URLSERVER}/movie/popular`, options);
        console.log('Esperando resolución');
        // Utiliza la palabra clave await para pausar la ejecución hasta que la promesa devuelta por response.json() se resuelva. La variable 'data' contendrá el cuerpo de la respuesta JSON.
        const data = await response.json();
        const movies = data.results;
        console.log(data);

        const divPopular = document.querySelector('#popular-list');
        movies.forEach(movie => {
            const html = `
                    <div class="movie-item">
                        <a href="./templates/detail-movie.html" >
                            <img  class="movie-item-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                            <div class="movie-item-detail">
                                <p class="movie-item-detail-title">${movie.title}</p>
                                <p class="movie-item-detail-subtitle">${movie.release_date} - ${movie.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',html);
        });

    } catch (err) {
        console.error(err)
    }
    
}

fetchMoviesPromesa();


