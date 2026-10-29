import test from 'node:test'
import assert from 'node:assert/strict'
import { filtrarComprasPorMes } from '../src/services/operaciones.js'

const compras = [
  {
    id: 1,
    nombre: 'Leche',
    fecha: '2026-09-10T12:00:00.000Z',
    total: 50,
  },
  {
    id: 2,
    nombre: 'Pan',
    fecha: '2026-10-14T12:00:00.000Z',
    total: 35,
  },
  {
    id: 3,
    nombre: 'Huevos',
    fecha: '2026-10-20T12:00:00.000Z',
    total: 80,
  },
]

// Prueba 1: consultar octubre
test('filtra las compras de octubre', () => {
  const resultado = filtrarComprasPorMes(compras, '2026-10')

  assert.equal(resultado.length, 2)
  assert.deepEqual(
    resultado.map((c) => c.id),
    [3, 2],
  )
})

// Prueba 2: consultar septiembre
test('filtra las compras de septiembre', () => {
  const resultado = filtrarComprasPorMes(compras, '2026-09')

  assert.equal(resultado.length, 1)
  assert.equal(resultado[0].nombre, 'Leche')
})

// Prueba 3: consultar todas las compras
test('muestra todas las compras sin importar el mes', () => {
  const resultado = filtrarComprasPorMes(compras, '2026-10', true)

  assert.equal(resultado.length, 3)
  assert.deepEqual(
    resultado.map((c) => c.id),
    [3, 2, 1],
  )
})

// Prueba 4: consultar un mes sin compras
test('muestra un historial vacío cuando no hay compras', () => {
  const resultado = filtrarComprasPorMes(compras, '2026-11')

  assert.deepEqual(resultado, [])
})
