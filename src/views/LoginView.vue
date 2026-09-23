<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const correo = ref('')
const contrasena = ref('')
const mensaje = ref('')
const router = useRouter()

const iniciarSesion = () => {
  if (!correo.value || !contrasena.value) {
    mensaje.value = 'Por favor, completa todos los campos.'
    return
  }

  // En este primer Sprint se simula el acceso del usuario.
  router.push('/inicio')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="icono">🏠</div>

      <h1>Mi Despensa</h1>
      <p class="subtitulo">Control de despensa y presupuesto del hogar</p>

      <form @submit.prevent="iniciarSesion">
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
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

        <button type="submit">Iniciar sesión</button>
      </form>

      <p class="registro">
        ¿No tienes una cuenta?
        <RouterLink to="/registro">Regístrate aquí</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f5;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.icono {
  text-align: center;
  font-size: 45px;
}

h1 {
  text-align: center;
  margin: 10px 0 5px;
  color: #2f6b4f;
}

.subtitulo {
  text-align: center;
  color: #6b7280;
  margin-bottom: 30px;
}

.campo {
  margin-bottom: 18px;
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

.mensaje {
  color: #b42318;
  font-size: 14px;
}

.registro {
  text-align: center;
  margin-top: 22px;
  color: #6b7280;
}

.registro a {
  color: #2f6b4f;
  font-weight: 600;
  text-decoration: none;
}
</style>
