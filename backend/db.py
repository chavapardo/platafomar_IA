import mysql.connector
from mysql.connector import Error
from flask_sqlalchemy import SQLAlchemy

# Inicializa SQLAlchemy
db = SQLAlchemy()

def create_connection():
    """Crea una conexión a la base de datos MySQL."""
    connection = None
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="piteravi07",
            database="plataforma_videos"
        )
        print("Conexión exitosa a la base de datos")
    except Error as e:
        print(f"Error: '{e}'")

    return connection