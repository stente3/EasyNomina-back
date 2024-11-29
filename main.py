# Importar librerías
from fastapi import FastAPI
from pydantic import BaseModel

# Iniciar la aplicaci
app = FastAPI()


# Modelo de datos
class User(BaseModel):
    name: str
    apellidos: str
    cedula: int


# Lista para almacenar los datos temporalmente
users = []


# Obtiene los diferentes usuarios
@app.get("/users/")
async def root():
    return users


# Agregar usuario
@app.post("/user/")
async def add_user(user: User):
    users.append(user)
    return user
