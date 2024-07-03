from flask import jsonify, request
from app.models import Hotel


def index():
    response = {"message":"Hola mundo desde API Flask 👩‍💻"}
    return jsonify(response)

# funcion que busca una pelicula
def get_hotel(id_hotel):
    hotel = Hotel.get_by_id(id_hotel)
    if not hotel:
        return jsonify({'message': 'hotel not found'}), 404
    return jsonify(hotel.serialize())

# funcion que busca todo el listado de las peliculas
def get_all_hotel():
    hotels = Hotel.get_all()
    list_hotels = [hotel.serialize() for hotel in hotels]
    return jsonify(list_hotels)

def create_hotel():
    data = request.json
    # agregar una logica de validacion de datos 
    new_hotel = Hotel(None,data['nombre'],data['ubicacion'],data['estrellas'],data['descripcion'],data['mail'],data['link'],data['telefono'])
    new_hotel.save()
    return jsonify({"message":"Hotel creada con exito"}),201

def update_hotel(id_hotel):
    hotel = Hotel.get_by_id(id_hotel)
    if not hotel:
        return jsonify({'message': 'Hotel not found'}), 404
    data = request.json
    hotel.nombre = data['nombre']
    hotel.ubicacion = data['ubicacion']
    hotel.estrellas = data['estrellas']
    hotel.descripcion = data['descripcion']
    hotel.mail = data['mail']
    hotel.link = data['link']
    hotel.telefono = data['telefono']
    hotel.save()
    return jsonify({'message': 'Hotel updated successfully'})

def delete_hotel(id_hotel):
    hotel = Hotel.get_by_id(id_hotel)
    if not hotel:
        return jsonify({'message': 'hotel not found'}), 404
    hotel.delete()
    return jsonify({'message': 'hotel deleted successfully'})


