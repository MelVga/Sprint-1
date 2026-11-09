#  Manual de Usuario y Documentación Técnica - Mi Despensa

Bienvenido a la documentación oficial del sistema **Control de Despensa y Presupuesto del Hogar (Mi Despensa)**. Esta guía detalla las funcionalidades de la aplicación, el proceso de desarrollo por Sprints y las instrucciones de uso para el usuario final.

---

##  1. Descripción General del Proyecto
**Mi Despensa** es una aplicación web diseñada para optimizar la administración del hogar. Permite llevar un control automatizado del inventario de alimentos, gestionar listas de compras inteligentes, establecer presupuestos mensuales, registrar fechas de caducidad, consultar el historial de compras y generar reportes financieros detallados por categorías.

---

##  2. Resumen de Funcionalidades por Sprints (Incrementos del Sistema)

A lo largo del ciclo de vida del proyecto bajo la metodología Scrum, se desarrollaron las siguientes capacidades:

* **Sprint 1 (Estructura Base e Inventario):** Configuración inicial del sistema, módulo de autenticación (login/registro), establecimiento del presupuesto base mensual y registro de productos en el inventario.
* **Sprint 2 (Control Continuo y Lista de Súper):** Botones de control rápido (+/-) para existencias, pantalla de *Lista para el Súper* con automatización de artículos con stock en 0 y barra visual de presupuesto en tiempo real.
* **Sprint 3 (Alertas, Priorización y Reportes):** Sistema de avisos por superar el límite mensual o proximidad de vencimiento, marcado de prioridad (indispensable/secundario) y gráficas de consumo.
* **Sprint 4 (Calidad, Optimización y Pruebas):** Adaptación de diseño responsivo para dispositivos móviles y de escritorio, optimización de tiempos de carga y suite de pruebas de funcionamiento.
* **Sprint 5 (Gestión de Caducidad):** Incorporación opcional de fechas de vencimiento por producto, estados visuales de alerta (próximo a vencer / vencido) y organización por estado de caducidad.
* **Sprint 6 (Historial de Compras y Reportes de Gastos):** Consulta avanzada y filtrado del historial de compras por periodos, junto con reportes de gastos organizados por categorías y meses.
* **Sprint 7 (Estabilización y Cierre Definitivo):** Normalización de registros históricos antiguos sin categoría, validaciones defensivas en formularios contra importes inválidos o valores `NaN`, y sincronización financiera con el presupuesto mensual.

---

## 3. Guía de Uso para el Usuario Final

###  Módulo 1: Presupuesto y Registro Inicial
1. Al ingresar por primera vez, define tu **Presupuesto Base** mensual en la pantalla de configuración inicial.
2. La aplicación utilizará este límite para monitorear en tiempo real tus gastos en las listas de súper.

###  Módulo 2: Mi Despensa (Inventario)
1. Registra tus productos indicando nombre, cantidad, unidad (piezas, kg, L), categoría y **fecha de caducidad opcional**.
2. Utiliza los botones de incremento y decremento (`+` / `-`) para actualizar las existencias en tiempo real conforme consumas los artículos.
3. El sistema te mostrará alertas visuales si algún producto está próximo a vencer o ya ha caducado.

###  Módulo 3: Lista para el Súper
1. La aplicación detecta automáticamente los productos con stock en 0 o próximos a agotarse y los añade a la lista de compras.
2. Asigna prioridades (*Indispensable* o *Secundario*) para saber qué comprar en caso de contar con presupuesto limitado.
3. La barra de presupuesto te alertará de inmediato (indicador en rojo) si estás rebasando el límite mensual establecido.

###  Módulo 4: Historial y Reportes de Gastos
1. Consulta tus compras pasadas filtrándolas por periodos de tiempo (meses o fechas específicas).
2. Visualiza los reportes financieros organizados por categorías de productos para identificar en qué rubros se concentra el gasto del hogar.
3. Los registros antiguos que no poseían categoría se normalizan automáticamente bajo la etiqueta *"Sin categoría"* para garantizar la congruencia en los reportes.

---

##  4. Almacenamiento y Privacidad de Datos
* **LocalStorage:** Toda la información generada (inventario, historial, presupuesto) se almacena de forma segura y local en el navegador web del usuario, garantizando la privacidad absoluta de los datos financieros del hogar.
* **Compatibilidad:** La aplicación cuenta con diseño responsivo optimizado para operar sin inconvenientes en computadoras de escritorio, tabletas y teléfonos celulares.

---

##  5. Enlaces de Acceso y Producción
* **Aplicación en Línea:** [Ver Aplicación en Producción (GitHub Pages)](https://melvga.github.io/Sprint-1/#/)
