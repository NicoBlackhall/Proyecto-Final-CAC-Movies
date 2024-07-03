
const san_clemente_del_tuyu_url = 'https://api.openweathermap.org/data/2.5/weather?q=San%20Clemente%20del%20Tuyu,ar';
const santa_teresita_url = 'https://api.openweathermap.org/data/2.5/weather?q=Santa%20Teresita,ar';
// una de las ideas es que cuando toque hacer el back, se pueda hacer un crud de las ciudades, este es una muestra de como quedarian 2 ciudades
const api_key = '&appid=81b3390cae01ba8fe545740132cf3281';
const container_clima = 'container-clima-';

function getClimaApiData(cityURL, callback) {
    const kelvin = 273.15;
    fetch(cityURL)
        .then(response => response.json())
        .then(data => {
            const ciudad = {
                city: data.name,
                weather: data.weather[0].description,
                temp: Math.round(data.main.temp - kelvin),
                icon: data.weather[0].icon
            };
            callback(ciudad);
        })
        .catch(error => {
            console.log(error);
        });
}

function addElement1() { // se pueden optimizar
    const container = document.getElementById("container-clima-san-clemente-del-tuyu");
    const newElement = document.createElement('p');
    var url = san_clemente_del_tuyu_url + api_key;
    getClimaApiData(url, (ciudad) => {
        newElement.textContent = `La temperatura en ${ciudad.city} es de ${ciudad.temp}°C`;
        
        console.log(ciudad);
    });
    container.appendChild(newElement);

}
function addElement2() {
    container = document.getElementById("container-clima-santa-teresita");
    newElement = document.createElement('p');
    var url = santa_teresita_url + api_key;
    getClimaApiData(url, (ciudad) => {
        newElement.textContent = `La temperatura en ${ciudad.city} es de ${ciudad.temp}°C`;
        console.log(ciudad);
    });
    container.appendChild(newElement);  
}
// Esperar a que el DOM se cargue completamente antes de ejecutar la función
var documento = document.addEventListener('DOMContentLoaded', () => {
    addElement1();
    addElement2();
    //addElement();  // Llamar a la función directamente cuando la página se carga
});