from flask import Flask
from app.database import init_app
from app.views import *

app = Flask(__name__)
init_app(app)

app.route("/",methods=["GET"])(index)
app.route("/api/hotels/",methods=["GET"])(get_all_hotel)
app.route("/api/hotels/",methods=["POST"])(create_hotel)
app.route('/api/hotels/<int:id_hotel>', methods=['GET'])(get_hotel)
app.route('/api/hotels/<int:id_hotel>', methods=['PUT'])(update_hotel)
app.route('/api/hotels/<int:id_hotel>', methods=['DELETE'])(delete_hotel)

if __name__=='__main__':
    app.run(debug=True)

