from flask import jsonify, request
from app.models import Movie


def index():
    response = {"message":"Hola mundo desde API Flask 👩‍💻"}
    return jsonify(response)

# funcion que busca una pelicula
def get_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    return jsonify(movie.serialize())

# funcion que busca todo el listado de las peliculas
def get_all_movies():
    movies = Movie.get_all()
    list_movies = [movie.serialize() for movie in movies ]
    return jsonify(list_movies)

def create_movie():
    data = request.json
    # agregar una logica de validacion de datos 
    new_movie = Movie(None,data["title"],data["director"],data['release_date'],data['banner'])
    new_movie.save()
    return jsonify({"message":"Pelicula creada con exito"}),201

def update_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    data = request.json
    movie.title = data['title']
    movie.director = data['director']
    movie.release_date = data['release_date']
    movie.banner = data['banner']
    movie.save()
    return jsonify({'message': 'Movie updated successfully'})

def delete_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    movie.delete()
    return jsonify({'message': 'Movie deleted successfully'})


