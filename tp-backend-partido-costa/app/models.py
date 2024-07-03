from app.database import get_db

class Hotel:
    #CONSTRUCTOR
    def __init__(self,id_hotel=None,nombre=None,ubicacion=None,estrellas=None,descripcion=None,mail=None,link=None,telefono=None):
        self.id_hotel = id_hotel
        self.nombre = nombre
        self.ubicacion = ubicacion
        self.estrellas = estrellas
        self.descripcion = descripcion
        self.mail = mail
        self.link = link
        self.telefono = telefono


    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM hoteles")
        rows = cursor.fetchall()
        hoteles = []
        for row in rows:
            nuevo_hotel = Hotel(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
            hoteles.append(nuevo_hotel)
        cursor.close()
        return hoteles

    @staticmethod
    def get_by_id(id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM hoteles WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Hotel(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        return None


    def save(self):
        # logica para INSERT/UPDATE en base de datos
        db = get_db()
        cursor = db.cursor()
        if self.id_hotel:
            query = """ UPDATE hoteles SET nombre = %s, ubicacion = %s, estrellas = %s, descripcion = %s, mail = %s, link = %s, telefono = %s WHERE id = %s """, (self.nombre,self.ubicacion,self.estrellas,self.descripcion,self.mail,self.link,self.telefono,self.id_hotel)
            cursor.execute(query)
        else:
            cursor.execute(""" INSERT INTO hoteles (id,nombre, ubicacion, estrellas, descripcion, mail, link, telefono) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) """, (self.id_hotel,self.nombre,self.ubicacion,self.estrellas,self.descripcion,self.mail,self.link,self.telefono)) 

        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM hoteles WHERE id = %s", (self.id_hotel,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_hotel': self.id_hotel,
            'nombre': self.nombre,
            'ubicacion': self.ubicacion,
            'estrellas': self.estrellas,
            'descripcion': self.descripcion,
            'mail': self.mail,
            'link': self.link,
            'telefono': self.telefono
        }