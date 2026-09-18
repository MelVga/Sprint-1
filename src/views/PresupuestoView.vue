<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const presupuesto = ref(0)
const nuevoPresupuesto = ref('')
const mensaje = ref('')

const guardarPresupuesto = () => {
  const cantidad = Number(nuevoPresupuesto.value)

  if (!nuevoPresupuesto.value || cantidad <= 0) {
    mensaje.value = 'Ingresa un presupuesto válido mayor a $0.'
    return
  }

  presupuesto.value = cantidad
  nuevoPresupuesto.value = ''
  mensaje.value = 'Presupuesto guardado correctamente.'
}

const presupuestoFormateado = computed(() => {
  return presupuesto.value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
  })
})

const volverInicio = () => {
  router.push('/inicio')
}
</script>

<template>
  <div class="presupuesto-page">
    <header class="encabezado">
      <div>
        <h1>💰 Presupuesto mensual</h1>
        <p>Administra el presupuesto destinado a las compras del hogar</p>
      </div>

      <button class="volver" @click="volverInicio">← Volver al inicio</button>
    </header>

    <main class="contenido">
      <section class="resumen">
        <p>Presupuesto actual</p>
        <h2>{{ presupuestoFormateado }}</h2>
        <span>MXN</span>
      </section>

      <section class="formulario-card">
        <h2>Establecer presupuesto</h2>

        <p class="descripcion">
          Ingresa la cantidad que deseas destinar a las compras de tu despensa durante este mes.
        </p>

        <form @submit.prevent="guardarPresupuesto">
          <label for="presupuesto">Presupuesto mensual</label>

          <div class="input-dinero">
            <span>$</span>
            <input
              id="presupuesto"
              v-model="nuevoPresupuesto"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <p
            v-if="mensaje"
            :class="mensaje.includes('correctamente') ? 'mensaje-exito' : 'mensaje-error'"
          >
            {{ mensaje }}
          </p>

          <button class="guardar" type="submit">Guardar presupuesto</button>
        </form>
      </section>

      <section class="informacion">
        <h3>Resumen del mes</h3>

        <div class="datos">
          <div>
            <p>Presupuesto</p>
            <strong>{{ presupuestoFormateado }}</strong>
          </div>

          <div>
            <p>Gastos registrados</p>
            <strong>$0.00</strong>
          </div>

          <div>
            <p>Disponible</p>
            <strong>{{ presupuestoFormateado }}</strong>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.presupuesto-page {
  min-height: 100vh;
  background: #f4f6f5;
  color: #374151;
}

.encabezado {
  background: white;
  padding: 22px 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.encabezado h1 {
  margin: 0;
  color: #2f6b4f;
  font-size: 25px;
}

.encabezado p {
  margin: 6px 0 0;
  color: #6b7280;
}

.volver {
  background: transparent;
  border: 1px solid #2f6b4f;
  color: #2f6b4f;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.contenido {
  max-width: 850px;
  margin: auto;
  padding: 40px 20px;
}

.resumen {
  background: #2f6b4f;
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 25px;
}

.resumen p {
  margin: 0;
  opacity: 0.9;
}

.resumen h2 {
  font-size: 38px;
  margin: 8px 0 2px;
}

.resumen span {
  font-size: 13px;
  opacity: 0.8;
}

.formulario-card,
.informacion {
  background: white;
  padding: 28px;
  border-radius: 15px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.formulario-card h2,
.informacion h3 {
  margin-top: 0;
  color: #1f2937;
}

.descripcion {
  color: #6b7280;
  margin-bottom: 25px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

.input-dinero {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.input-dinero span {
  padding: 12px 0 12px 14px;
  color: #6b7280;
}

input {
  width: 100%;
  border: none;
  padding: 12px;
  font-size: 16px;
  outline: none;
}

.guardar {
  margin-top: 18px;
  width: 100%;
  background: #2f6b4f;
  color: white;
  border: none;
  padding: 13px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.guardar:hover {
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

.datos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.datos div {
  background: #f7f8f7;
  padding: 18px;
  border-radius: 10px;
}

.datos p {
  color: #6b7280;
  font-size: 13px;
  margin: 0 0 7px;
}

.datos strong {
  color: #2f6b4f;
  font-size: 18px;
}

@media (max-width: 650px) {
  .encabezado {
    padding: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .datos {
    grid-template-columns: 1fr;
  }
}
</style>
