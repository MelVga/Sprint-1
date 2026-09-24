<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerProductos, guardarProductos } from '@/services/db.js'

const router = useRouter()

const productos = ref([])

onMounted(() => {
  productos.value = obtenerProductos()
})

// CONDICIÓN: Muestra únicamente los productos cuyo stock sea igual a 0
const listaParaElSuper = computed(() => {
  return productos.value.filter((producto) => Number(producto.cantidad) === 0)
})

const incrementarStock = (producto) => {
  producto.cantidad++
  guardarProductos(productos.value)
}

const actualizarCosto = (producto) => {
  producto.costo = Number(producto.costo) || 0
  guardarProductos(productos.value)
}

const marcarComprado = (id) => {
  const producto = productos.value.find(p => p.id === id)
  if (producto) {
    producto.cantidad = 5 // Restaura stock al comprar y vuelve a Mi Despensa
    guardarProductos(productos.value)
  }
}

const volverInicio = () => {
  router.push('/inicio')
}
</script>

<template>
  <div class="super-page">
    <header class="encabezado">
      <div>
        <h1>📋 Lista para el Súper</h1>
        <p>Productos con stock agotado (0 unidades)</p>
      </div>

      <button class="volver" @click="volverInicio">← Volver al inicio</button>
    </header>

    <main class="contenido">
      <div v-if="listaParaElSuper.length === 0" class="sin-productos">
        <div class="icono-feliz">🎉</div>
        <h3>¡Todo en orden!</h3>
        <p>No hay productos agotados en este momento.</p>
      </div>

      <div v-else class="lista-card">
        <div class="lista-header">
          <h2>Elementos pendientes de compra</h2>
          <span class="badge-alerta">{{ listaParaElSuper.length }} producto(s) agotados</span>
        </div>

        <div class="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock Actual</th>
                <th>Costo estimado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listaParaElSuper" :key="item.id">
                <td><strong>{{ item.nombre }}</strong></td>
                <td>{{ item.categoria }}</td>

                <td>
                  <span class="stock-cero">0 unidades</span>
                </td>

                <td>
                  <div class="input-costo">
                  <span>$</span>
                  <input
                    v-model.number="item.costo"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    @change="actualizarCosto(item)"
                   />
                 </div>
              </td>

              <td class="acciones-celda">
                <button class="btn-comprar" @click="marcarComprado(item.id)">
                  ✓ Comprado
               </button>

               <button
                 class="btn-stock"
                 @click="incrementarStock(item)"
                 title="Sumar 1"
               >
                 +
               </button>
             </td>
             </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.super-page { min-height: 100vh; background: #f4f6f5; color: #374151; }
.encabezado { background: white; padding: 20px 8%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06); }
.encabezado h1 { margin: 0; color: #2f6b4f; font-size: 24px; }
.encabezado p { margin: 4px 0 0; color: #6b7280; font-size: 13px; }
.volver { background: transparent; border: 1px solid #2f6b4f; color: #2f6b4f; padding: 9px 15px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.volver:hover { background: #eef6f1; }
.contenido { max-width: 900px; margin: auto; padding: 40px 20px; }
.lista-card { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); }
.lista-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.lista-header h2 { margin: 0; color: #1f2937; font-size: 19px; }
.badge-alerta { background: #d97706; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.tabla-contenedor { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 12px 15px; border-bottom: 1px solid #e5e7eb; }
th { color: #4b5563; font-size: 13px; background: #f9fafb; }
.stock-cero { background: #fee2e2; color: #b91c1c; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; }
.acciones-celda { display: flex; gap: 8px; align-items: center; }
.btn-comprar { background: #2f6b4f; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }
.btn-comprar:hover { background: #24543e; }
.btn-stock { background: #e2e8f0; border: none; width: 28px; height: 28px; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-stock:hover { background: #cbd5e1; }
.sin-productos { text-align: center; padding: 50px 20px; background: white; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); }
.icono-feliz { font-size: 45px; margin-bottom: 10px; }
.sin-productos h3 { margin: 0 0 6px; color: #1f2937; }
.sin-productos p { color: #6b7280; margin: 0; font-size: 14px; }
.input-costo {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  max-width: 120px;
}

.input-costo span {
  padding-left: 8px;
  color: #6b7280;
}

.input-costo input {
  width: 90px;
  border: none;
  padding: 7px;
  outline: none;
  font-size: 13px;
}
</style>