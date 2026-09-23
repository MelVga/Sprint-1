<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const contrasena = ref('')
const confirmarContrasena = ref('')
const mensaje = ref('')
const exito = ref(false)


const registrarUsuario = () => {
  mensaje.value = ''
  exito.value = false

  // Validar que todos los campos estén completos
  if (
    nombre.value.trim() === '' ||
    correo.value.trim() === '' ||
    contrasena.value.trim() === '' ||
    confirmarContrasena.value.trim() === ''
  ) {
    mensaje.value = 'Por favor, completa todos los campos.'
    return
  }

  // Validar que las contraseñas coincidan
  if (contrasena.value !== confirmarContrasena.value) {
    mensaje.value = 'Las contraseñas no coinciden.'
    return
  }

  // Registro correcto
  exito.value = true
  mensaje.value = 'Usuario registrado correctamente.'
}
</script>

<template>
  <div class="registro-page">
    <div class="registro-card">
      <div class="icono">🛒</div>

      <h1>Crear cuenta</h1>
      <p class="subtitulo">Regístrate para comenzar a organizar tu despensa</p>

      <form @submit.prevent="registrarUsuario">
        <div class="campo">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="nombre" type="text" placeholder="Ingresa tu nombre" />
        </div>

        <div class="campo">
          <label for="correo">Correo electrónico</label>
          <input id="correo" v-model="correo" type="email" placeholder="ejemplo@correo.com" />
        </div>

        <div class="campo">
          <label for="contrasena">Contraseña</label>
          <input
            id="contrasena"
            v-model="contrasena"
            type="password"
            placeholder="Crea una contraseña"
          />
        </div>

        <div class="campo">
          <label for="confirmar">Confirmar contraseña</label>
          <input
            id="confirmar"
            v-model="confirmarContrasena"
            type="password"
            placeholder="Repite tu contraseña"
          />
        </div>

        <p v-if="mensaje" :class="exito ? 'mensaje-exito' : 'mensaje-error'">
          {{ mensaje }}
        </p>

        <button type="submit">Crear cuenta</button>
      </form>

      <p class="login">
        ¿Ya tienes una cuenta?
        <RouterLink to="/">Inicia sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.registro-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f5;
  padding: 30px 20px;
}

.registro-card {
  width: 100%;
  max-width: 440px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.icono {
  text-align: center;
  font-size: 42px;
}

h1 {
  text-align: center;
  margin: 10px 0 5px;
  color: #2f6b4f;
}

.subtitulo {
  text-align: center;
  color: #6b7280;
  margin-bottom: 28px;
}

.campo {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 7px;
  font-weight: 600;
  color: #374151;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
}

input:focus {
  outline: none;
  border-color: #2f6b4f;
}

button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #2f6b4f;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #24543e;
}

.mensaje-error {
  color: #b42318;
  font-size: 14px;
}

.mensaje-exito {
  color: #2f6b4f;
  font-size: 14px;
  font-weight: 600;
}

.login {
  text-align: center;
  margin-top: 22px;
  color: #6b7280;
}

.login a {
  color: #2f6b4f;
  font-weight: 600;
  text-decoration: none;
}
</style>
