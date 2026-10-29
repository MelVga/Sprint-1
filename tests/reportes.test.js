import test from 'node:test'
import assert from 'node:assert/strict'
import { gastosPorCategoria, crearCompra } from '../src/services/operaciones.js'

const compras = [
  {
    id: 1,
    productoId: 1,
    nombre: 'Leche',
    categoria: 'Lácteos',
    total: 75,
    fecha: '2026-10-14T12:00:00Z',
  },
  {
    id: 2,
    productoId: 2,
    nombre: 'Yogur',
    categoria: 'Lácteos',
    total: 50,
    fecha: '2026-10-15T12:00:00Z',
  },
  {
    id: 3,
    productoId: 3,
    nombre: 'Detergente',
    categoria: 'Limpieza',
    total: 85,
    fecha: '2026-10-16T12:00:00Z',
  },
  {
    id: 4,
    productoId: 1,
    nombre: 'Leche',
    categoria: 'Lácteos',
    total: 40,
    fecha: '2026-09-12T12:00:00Z',
  },
]

// Prueba 1: agrupación por categoría
test('agrupa correctamente los gastos por categoría', () => {
  const resultado = gastosPorCategoria(compras, [], '2026-10')

  assert.deepEqual(resultado, [
    { categoria: 'Lácteos', total: 125 },
    { categoria: 'Limpieza', total: 85 },
  ])
})

// Prueba 2: no mezcla gastos de distintos meses
test('considera solamente los gastos del mes seleccionado', () => {
  const resultado = gastosPorCategoria(compras, [], '2026-09')

  assert.deepEqual(resultado, [{ categoria: 'Lácteos', total: 40 }])
})

// Prueba 3: reconoce compras antiguas sin categoría
test('recupera la categoría del inventario para compras anteriores', () => {
  const compraAntigua = [
    {
      id: 5,
      productoId: 10,
      nombre: 'Arroz',
      total: 60,
      fecha: '2026-10-20T12:00:00Z',
    },
  ]

  const productos = [
    {
      id: 10,
      nombre: 'Arroz',
      categoria: 'Abarrotes',
    },
  ]

  const resultado = gastosPorCategoria(compraAntigua, productos, '2026-10')

  assert.deepEqual(resultado, [{ categoria: 'Abarrotes', total: 60 }])
})

// Prueba 4: compras sin categoría disponible
test('clasifica como Sin categoría los registros desconocidos', () => {
  const compra = [
    {
      id: 6,
      productoId: 99,
      nombre: 'Producto anterior',
      total: 25,
      fecha: '2026-10-21T12:00:00Z',
    },
  ]

  const resultado = gastosPorCategoria(compra, [], '2026-10')

  assert.deepEqual(resultado, [{ categoria: 'Sin categoría', total: 25 }])
})

// Prueba 5: las compras nuevas conservan su categoría
test('guarda la categoría al registrar una compra nueva', () => {
  const producto = {
    id: 20,
    nombre: 'Jabón',
    categoria: 'Limpieza',
    precio: 30,
  }

  const compra = crearCompra(producto, 2, new Date('2026-10-22T12:00:00Z'))

  assert.equal(compra.categoria, 'Limpieza')
  assert.equal(compra.total, 60)
})
