// src/services/db.js

const CLAVE_PRODUCTOS = 'despensa_productos'
const CLAVE_LISTA_SUPER = 'lista_super_productos'

// Funciones generales de productos (Mi Despensa)
export const obtenerProductos = () => {
  const datos = localStorage.getItem(CLAVE_PRODUCTOS)
  return datos ? JSON.parse(datos) : []
}

export const guardarProductos = (productos) => {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}

// Funciones de compatibilidad para evitar errores si alguna vista las llama directamente
export const obtenerListaSuper = () => {
  const datos = localStorage.getItem(CLAVE_LISTA_SUPER)
  return datos ? JSON.parse(datos) : []
}

export const guardarListaSuper = (lista) => {
  localStorage.setItem(CLAVE_LISTA_SUPER, JSON.stringify(lista))
}