from app.database import get_db

class Movie:
    #CONSTRUCTOR
    def __init__(self,id_movie=None,title=None,director=None,release_date=None,banner=None):
        self.id_movie = id_movie
        self.title = title
        self.director = director
        self.release_date = release_date
        self.banner = banner


    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM movies")
        rows = cursor.fetchall()
        movies = []
        for row in rows:
            new_movie = Movie(row[0],row[1],row[2],row[3],row[4])
            movies.append(new_movie)
        cursor.close()
        return movies

    @staticmethod
    def get_by_id(movie_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM movies WHERE id_movie = %s", (movie_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Movie(id_movie=row[0], title=row[1], director=row[2], release_date=row[3], banner=row[4])
        return None


    def save(self):
        # logica para INSERT/UPDATE en base de datos
        db = get_db()
        cursor = db.cursor()
        if self.id_movie:
            query = """ UPDATE movies SET title = %s,director = %s,realese_date = %s,banner = %s WHERE id_movie = %s""", (self.title,self.director,self.release_date,self.banner,self.id_movie)
            cursor.execute(query)
        else:
            cursor.execute(""" INSERT INTO movies (title,director,release_date,banner) VALUES (%s,%s,%s,%s)""", 
                                (self.title,self.director,self.release_date,self.banner))
            self.id_movie = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM movies WHERE id_movie = %s", (self.id_movie,))
        db.commit()
        cursor.close()






                        



           

    def serialize(self):
        return {
            'id_movie': self.id_movie,
            'title': self.title,
            'director': self.director,
            'release_date': self.release_date,
            'banner': self.banner,
        }