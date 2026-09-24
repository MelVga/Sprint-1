<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const nombre = ref('')
const correo = ref('')
const contrasena = ref('')
const mensaje = ref('')
const router = useRouter()

const registrarUsuario = () => {
  if (!nombre.value.trim() || !correo.value.trim() || !contrasena.value.trim()) {
    mensaje.value = 'Por favor, completa todos los campos.'
    return
  }

  if (!correo.value.includes('@')) {
    mensaje.value = 'Ingresa un correo electrónico válido.'
    return
  }

  // Recuperamos la lista previa de usuarios
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios_despensa')) || []

  // Comprobamos si el correo ya fue registrado antes
  const correoExiste = usuariosGuardados.some(
    (u) => u.correo.toLowerCase() === correo.value.trim().toLowerCase()
  )

  if (correoExiste) {
    mensaje.value = 'Este correo ya está registrado. Inicia sesión.'
    return
  }

  // Creamos y guardamos el nuevo usuario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    contrasena: contrasena.value
  }

  usuariosGuardados.push(nuevoUsuario)
  localStorage.setItem('usuarios_despensa', JSON.stringify(usuariosGuardados))

  alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.')
  router.push('/')
}
</script>

<template>
  <div class="registro-page">
    <div class="registro-card">
      <div class="icono">📝</div>

      <h1>Crear Cuenta</h1>
      <p class="subtitulo">Regístrate para administrar tu despensa</p>

      <form @submit.prevent="registrarUsuario">
        <div class="campo">
          <label for="nombre">Nombre completo</label>
          <input id="nombre" v-model="nombre" type="text" placeholder="Tu nombre" />
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

        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

        <button type="submit">Registrarse</button>
      </form>

      <p class="login-link">
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
  padding: 20px;
}

.registro-card {
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
  margin-bottom: 15px;
}

.login-link {
  text-align: center;
  margin-top: 22px;
  color: #6b7280;
}

.login-link a {
  color: #2f6b4f;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>