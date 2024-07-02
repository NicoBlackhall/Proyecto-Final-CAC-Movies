CREATE DATABASE CAC;

USE CAC;

CREATE TABLE hoteles (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    estrellas INT CHECK (estrellas >= 1 AND estrellas <= 5),
    descripcion TEXT,
    mail VARCHAR(255),
    link VARCHAR(255),
    telefono VARCHAR(30)
);

INSERT INTO hoteles (id,nombre, ubicacion, estrellas, descripcion, mail, link, telefono)
VALUES 
('1','Hotel San Clemente', 'San Clemente del Tuyú, Argentina', 4, 'Hotel céntrico con todas las comodidades.', 'contacto@sanclementehotel.com', 'http://www.sanclementehotel.com', '+54 2252 123456'),
('2','Hotel Santa Teresita', 'Santa Teresita, Argentina', 3, 'Hotel económico cerca de la playa.', 'reservas@santateresitahotel.com', 'http://www.santateresitahotel.com', '+54 2246 654321'),
('3','Hotel Mar de Ajó', 'Mar de Ajó, Argentina', 5, 'Hotel de lujo con vistas al mar.', 'info@mardeajohotel.com', 'http://www.mardeajohotel.com', '+54 2257 789012'),
('4','Hotel San Bernardo', 'San Bernardo, Argentina', 4, 'Hotel boutique en el corazón de la ciudad.', 'contacto@sanbernardohotel.com', 'http://www.sanbernardohotel.com', '+54 2257 345678'),
('5','Hotel La Lucila', 'La Lucila del Mar, Argentina', 4, 'Hotel moderno con servicios exclusivos.', 'info@laluciladelmarhotel.com', 'http://www.laluciladelmarhotel.com', '+54 2257 567890');


SELECT * FROM hoteles;