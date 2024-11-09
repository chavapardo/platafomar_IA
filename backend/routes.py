from flask import Flask, request, jsonify
from models import register_user, login_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    contraseña = data.get('contraseña')
    result = register_user(nombre, apellido, email, contraseña)
    return jsonify(result)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    contraseña = data.get('contraseña')
    result = login_user(email, contraseña)
    return jsonify(result)