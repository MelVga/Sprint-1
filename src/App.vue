<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

// Normalización de compras sin categoría usando tus llaves reales
function normalizarCategoriasHistoricas() {
  // 1. Usar la clave real de tu LocalStorage: "despensa_compras"
  const comprasGuardadas = localStorage.getItem('despensa_compras')
  const inventarioGuardado = localStorage.getItem('despensa_productos')

  if (!comprasGuardadas) return

  const compras = JSON.parse(comprasGuardadas)
  const inventario = inventarioGuardado ? JSON.parse(inventarioGuardado) : []

  let huboCambios = false

  const comprasNormalizadas = compras.map((compra) => {
    // Si la compra no tiene categoría o está vacía
    if (!compra.categoria || compra.categoria.trim() === '') {
      huboCambios = true

      // Buscar si el producto existe en tu inventario (despensa_productos)
      const productoCoincidente = inventario.find(
        (prod) =>
          (compra.productoId && prod.id === compra.productoId) ||
          (compra.nombre && prod.nombre?.toLowerCase().trim() === compra.nombre.toLowerCase().trim())
      )

      // Asignar categoría encontrada o "Sin categoría"
      if (productoCoincidente && productoCoincidente.categoria && productoCoincidente.categoria.trim() !== '') {
        compra.categoria = productoCoincidente.categoria
      } else {
        compra.categoria = 'Sin categoría'
      }
    }
    return compra
  })

  // Guardar de vuelta en "despensa_compras"
  if (huboCambios) {
    localStorage.setItem('despensa_compras', JSON.stringify(comprasNormalizadas))
    console.log('HU-S7-01: Registros de compras antiguos normalizados correctamente.')
  }
}

onMounted(() => {
  normalizarCategoriasHistoricas()
})
</script>

<template>
  <RouterView />
</template>