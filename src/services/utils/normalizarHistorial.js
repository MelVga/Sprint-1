export function normalizarCategoriasHistoricas() {
  const comprasGuardadas = localStorage.getItem('historial_compras')
  const inventarioGuardado = localStorage.getItem('inventario_productos')

  if (!comprasGuardadas) return

  const compras = JSON.parse(comprasGuardadas)
  const inventario = inventarioGuardado ? JSON.parse(inventarioGuardado) : []

  let huboCambios = false

  const comprasNormalizadas = compras.map((compra) => {
    if (!compra.categoria || compra.categoria.trim() === '') {
      huboCambios = true

      const productoCoincidente = inventario.find(
        (prod) =>
          (compra.productoId && prod.id === compra.productoId) ||
          prod.nombre.toLowerCase().trim() === compra.nombreProducto?.toLowerCase().trim()
      )

      if (productoCoincidente && productoCoincidente.categoria && productoCoincidente.categoria.trim() !== '') {
        compra.categoria = productoCoincidente.categoria
      } else {
        compra.categoria = 'Sin categoría'
      }
    }
    return compra
  })

  if (huboCambios) {
    localStorage.setItem('historial_compras', JSON.stringify(comprasNormalizadas))
    console.log('HU-S7-01: Registros de compras antiguos normalizados correctamente.')
  }
}