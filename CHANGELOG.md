# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios.

---

## [Unreleased]

### Added

-

### Changed

-

### Fixed

-

### Removed

-

### Security

-

---

## [1.2.0] - 2026-10-23

### Added

- Creación del componente `ReceiptApp` para encapsular la lógica y las funcionalidades específicas del Generador de recibos.
- Separación de la estructura general de la página y de los componentes propios de la aplicación.
- Incorporación de una navegación interna entre el editor de recibos y el historial.
- Implementación de limpieza del temporizador de notificaciones al desmontar el componente.

### Changed

- Refactorización de `app/page.tsx` para utilizar una estructura más limpia y reutilizable, basada en el encabezado compartido, la presentación de la aplicación y el componente `ReceiptApp`.
- Centralización de la lógica de creación, edición, guardado, duplicación y eliminación de recibos dentro de `ReceiptApp`.
- Adaptación de los botones y elementos de navegación a las clases compartidas de la interfaz definidas en `lib/ui.ts`.
- Eliminación del encabezado duplicado dentro del generador para aprovechar el componente global `Header`.
- Mejora de la organización del editor, la vista previa y el historial para facilitar el mantenimiento y la evolución del proyecto.

### Fixed

- Corrección de la gestión del temporizador de notificaciones para evitar que quede activo después de desmontar el componente.
- Ajustes en la distribución del contenido para integrarse con la estructura general de la página y el encabezado compartido.

### Removed

- Eliminación del logotipo, título y eslogan duplicados dentro del componente del generador, ya que ahora corresponden a la estructura general de la aplicación.
- Eliminación del contenedor exterior redundante que duplicaba el ancho y el espaciado definidos por la página principal.

### Security

- Conservación de la validación de los datos del recibo antes de guardarlo o compartirlo mediante WhatsApp.
- Mantenimiento del almacenamiento local de los recibos y de los datos del negocio en el navegador, sin introducir servicios externos de almacenamiento.

---

## [1.1.0] - 2026-10-20

### Added

- Integración del logotipo de SatCore Solutions en la interfaz de la aplicación.
- Incorporación del eslogan oficial de la marca: “Soluciones digitales seguras, accesibles y funcionales para todos”.
- Documentación del proyecto mediante un README actualizado con las características, tecnologías, instalación, arquitectura y funcionamiento de la aplicación.
- Documentación de privacidad, seguridad, atribución y condiciones de distribución.

### Changed

- Actualización de la identidad visual para mantener la coherencia con la marca SatCore Solutions.
- Mejora del encabezado de la aplicación y de la presentación de la marca en los recibos.
- Actualización de la documentación técnica para reflejar el uso de Next.js, React, TypeScript y Tailwind CSS v4.
- Organización de la documentación del proyecto para facilitar su instalación, mantenimiento y evolución.

### Fixed

- Ajustes en la presentación visual del encabezado de la aplicación y de los recibos para integrar el logotipo correctamente.

### Removed

- Eliminación del recuadro de iniciales como representación visual de SatCore Solutions en los encabezados actualizados, sustituyéndolo por el logotipo de la marca.

### Security

- Documentación de las consideraciones de privacidad asociadas al almacenamiento local mediante `localStorage`.
- Inclusión de recomendaciones para proteger los datos de los recibos y reportar posibles vulnerabilidades.

---

## [1.0.0] - 2026-10-20

### Added

- Lanzamiento inicial del proyecto Generador de recibos.
- Creación de recibos de pago con numeración consecutiva automática.
- Registro de datos del negocio, pagador, concepto, importe y forma de pago.
- Registro opcional de referencias de pago y saldos pendientes.
- Conversión de importes a letras en pesos colombianos.
- Vista previa de recibos con espacios para firmas.
- Impresión de documentos y opción de guardarlos como PDF.
- Integración para compartir resúmenes de recibos mediante WhatsApp.
- Historial local con opciones para consultar, buscar, duplicar y eliminar recibos.
- Resumen de importes recibidos durante el día y acumulados.
- Persistencia local de los datos mediante `localStorage`.
- Interfaz desarrollada con Next.js, React, TypeScript y Tailwind CSS.
