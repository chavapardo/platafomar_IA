import os
from flask import Flask, request, jsonify, send_from_directory, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config
from models import db, Usuario

# Crear la app antes de la configuración de rutas
app = Flask(__name__)
app.config.from_object(Config)

# Configuración CORS para React
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Inicialización de la base de datos
db.init_app(app)

# Configuración para cargar archivos
UPLOAD_FOLDER = 'uploads'
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}
ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Asegurarse de que la carpeta de uploads exista
os.makedirs(os.path.join(UPLOAD_FOLDER, 'videos'), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'profile_images'), exist_ok=True)

# Función para verificar las extensiones de los archivos
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# Crear las tablas si no existen
with app.app_context():
    db.create_all()

# Endpoint de login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json  # Obtiene los datos en formato JSON
    email = data.get('email')
    contraseña = data.get('contraseña')

    # Busca al usuario en la base de datos
    usuario = Usuario.query.filter_by(email=email).first()
    
    # Verifica si el usuario existe y la contraseña es correcta
    if usuario and usuario.contraseña == contraseña:
        return jsonify({"message": "Inicio de sesión exitoso", "usuario": {"nombre": usuario.nombre, "apellido": usuario.apellido}}), 200
    else:
        return jsonify({"message": "Credenciales inválidas"}), 401

# Endpoint de registro
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    contraseña = data.get('contraseña')

    # Verifica si el correo ya está registrado
    if Usuario.query.filter_by(email=email).first():
        return jsonify({"message": "El correo ya está en uso"}), 409

    # Crea un nuevo usuario y lo guarda en la base de datos
    nuevo_usuario = Usuario(nombre=nombre, apellido=apellido, email=email, contraseña=contraseña)
    db.session.add(nuevo_usuario)
    db.session.commit()
    
    return jsonify({"message": "Registro exitoso"}), 201

# Endpoint para cargar videos
@app.route('/api/upload-video', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({"message": "No file part"}), 400
    video = request.files['video']
    if video.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if video and allowed_file(video.filename, ALLOWED_VIDEO_EXTENSIONS):
        filename = secure_filename(video.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'videos', filename)
        video.save(filepath)
        # Retorna la URL correcta del video
        return jsonify({
            "message": "Video uploaded successfully",
            "videoPath": f"/uploads/videos/{filename}"
        }), 200
    else:
        return jsonify({"message": "File type not allowed"}), 400

# Endpoint para cargar imágenes de perfil
@app.route('/api/upload-profile-image', methods=['POST'])
def upload_profile_image():
    if 'profileImage' not in request.files:
        return jsonify({"message": "No file part"}), 400
    profile_image = request.files['profileImage']
    if profile_image.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if profile_image and allowed_file(profile_image.filename, ALLOWED_IMAGE_EXTENSIONS):
        filename = secure_filename(profile_image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'profile_images', filename)
        profile_image.save(filepath)
        return jsonify({
            "message": "Profile image uploaded successfully",
            "filePath": f"/uploads/profile_images/{filename}"
        }), 200
    else:
        return jsonify({"message": "File type not allowed"}), 400

# Ruta para servir videos con soporte de rango (streaming)
@app.route('/uploads/videos/<filename>')
def serve_video(filename):
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], 'videos', filename)
    if os.path.exists(video_path):
        def generate():
            with open(video_path, 'rb') as f:
                while chunk := f.read(1024 * 8):
                    yield chunk
        return Response(generate(), content_type="video/mp4")
    else:
        return jsonify({"message": "Video not found"}), 404

# Ruta para servir imágenes de perfil
@app.route('/uploads/profile_images/<filename>')
def serve_profile_image(filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], 'profile_images'), filename)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
