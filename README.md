 <div align="center">

<img src="./public/satcore-logo.png" alt="SatCore Solutions" width="220" />

# Generador de recibos

**Microapp para crear, gestionar e imprimir recibos de pago para pequeños negocios.**

Herramienta digital desarrollada por **SatCore Solutions** para registrar pagos, documentar abonos y generar comprobantes de manera sencilla desde el navegador.

---

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**SATCORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

[![License](https://img.shields.io/badge/License-SCSAL%201.0-000000.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

# Sobre el proyecto

**Generador de recibos** es una microaplicación web desarrollada originalmente por **SatCore Solutions**, dentro del ecosistema tecnológico de **SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**.

Su propósito es facilitar la elaboración de recibos de pago para pequeños negocios, profesionales independientes, emprendedores y personas que necesitan dejar constancia de los pagos recibidos por productos, servicios, trabajos o abonos.

La aplicación permite registrar la información del pagador, describir el concepto del pago, calcular los valores correspondientes y generar un documento listo para imprimir o guardar como PDF.

El proyecto está diseñado para funcionar directamente en el navegador, sin necesidad de crear una cuenta, configurar un servidor de base de datos o contratar servicios externos para su funcionamiento básico.

Este repositorio forma parte de los proyectos tecnológicos propios de **SatCore Solutions** y se distribuye conforme a los términos de la **SatCore Solutions Attribution License — SCSAL 1.0**.

---

# Características

- **Consecutivo automático:** numeración de recibos con formato `RC-0001`, `RC-0002` y siguientes.
- **Información del negocio:** registro del nombre y los datos comerciales que aparecen en el recibo.
- **Datos del pagador:** información de la persona que realiza el pago.
- **Concepto del pago:** descripción del producto, servicio, trabajo o motivo del recibo.
- **Registro de valores:** ingreso del valor recibido y selección de la forma de pago.
- **Referencia de pago:** campo opcional para registrar información adicional de la transacción.
- **Control de abonos:** registro opcional del saldo pendiente.
- **Valor en letras:** representación del importe en pesos colombianos.
- **Vista previa en tiempo real:** revisión del documento antes de imprimirlo.
- **Impresión y PDF:** generación del documento mediante la función de impresión del navegador, con opción de guardarlo como PDF.
- **Espacios para firmas:** áreas destinadas a las firmas correspondientes.
- **Integración con WhatsApp:** apertura del chat del cliente con un resumen del recibo cuando se dispone de su número de celular.
- **Historial de recibos:** consulta, búsqueda, apertura, duplicación y eliminación de registros.
- **Resumen de ingresos:** visualización de los totales de «Recibido hoy» y «Total recibido».
- **Guardado automático local:** conservación de los datos del negocio y de los recibos en el navegador.
- **Interfaz adaptable:** diseño pensado para utilizarse en distintos tamaños de pantalla.
- **Identidad visual SatCore:** interfaz en modo oscuro con los elementos de marca de SatCore Solutions.

---

# Tecnologías

El proyecto utiliza tecnologías del ecosistema moderno de desarrollo web.

### Tecnologías principales

| Tecnología      | Propósito                                               |
| --------------- | ------------------------------------------------------- |
| Next.js 15      | Framework de React para la aplicación web.              |
| React 19        | Construcción de la interfaz mediante componentes.       |
| TypeScript 5    | Tipado estático y mayor claridad en el código.          |
| Tailwind CSS v4 | Estilos, diseño adaptable y sistema visual.             |
| JavaScript      | Lógica de interacción en el navegador.                  |
| HTML5           | Estructura semántica de la aplicación.                  |
| CSS             | Presentación, estilos de impresión y adaptación visual. |
| localStorage    | Persistencia local de la información en el navegador.   |
| Git y GitHub    | Control de versiones y alojamiento del código fuente.   |

Las versiones indicadas corresponden a la línea tecnológica prevista para el proyecto. Las versiones exactas instaladas se encuentran en `package.json` y en el archivo de bloqueo de dependencias.

---

# Requisitos

Antes de ejecutar la aplicación, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js:** versión compatible con las dependencias del proyecto. Se recomienda Node.js 20.9 o superior para Next.js 15.
- **npm:** gestor de paquetes de Node.js.
- **Git:** para clonar el repositorio y gestionar las versiones.
- **Navegador moderno:** para ejecutar la aplicación, imprimir los recibos y guardar documentos como PDF.

No se requiere una base de datos ni un servidor de backend para el funcionamiento local descrito en este proyecto.

---

# Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/satcoresolutions/generador-facturas.git
```

### 2. Acceder al directorio

```bash
cd generador-facturas
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre la siguiente dirección en tu navegador:

```text
http://localhost:3000
```

La aplicación estará disponible mientras el servidor de desarrollo permanezca en ejecución.

---

# Desarrollo

Para trabajar en el proyecto durante el desarrollo:

```bash
npm run dev
```

El servidor de Next.js permite visualizar los cambios realizados en los componentes y estilos durante el desarrollo.

Antes de integrar cambios importantes, se recomienda comprobar que la aplicación compile correctamente y que las funciones principales continúen operando.

---

# Producción

### Generar la compilación

```bash
npm run build
```

### Iniciar la aplicación

```bash
npm start
```

El comando `npm start` requiere que exista una compilación de producción válida.

Para verificar los comandos disponibles, consulta los scripts definidos en `package.json`.

---

# Estructura del proyecto

La estructura general del proyecto se organiza de la siguiente manera:

```text
generador-facturas/
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── ReceiptForm
│   ├── ReceiptPreview
│   ├── HistoryPanel
│   └── ui/
│
├── lib/
│   ├── types
│   ├── defaults
│   ├── format
│   ├── share
│   └── storage
│
├── public/
│   └── satcore-logo.png
│
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── next.config.ts
└── README.md
```

La estructura es orientativa. Los nombres y extensiones exactos de los archivos pueden variar según la organización real del código.

### Responsabilidades principales

- `app/`: páginas, configuración de la aplicación y estilos globales.
- `components/`: componentes de formularios, vista previa, historial e interfaz.
- `lib/`: tipos de datos, valores predeterminados, formatos, integración con WhatsApp y persistencia.
- `public/`: recursos estáticos, incluido el logotipo de SatCore Solutions.
- `package.json`: dependencias, metadatos y comandos del proyecto.
- `LICENSE`: términos de distribución y atribución del software.

---

# Arquitectura

La aplicación utiliza una arquitectura web basada en componentes de React y lógica ejecutada principalmente en el navegador.

```text
Usuario
   │
   ▼
Interfaz Next.js / React
   │
   ├── Formulario del recibo
   │
   ├── Vista previa
   │
   ├── Historial
   │
   ▼
Lógica de aplicación
   │
   ├── Formato de moneda y fechas
   ├── Conversión de valores a letras
   ├── Preparación del resumen para WhatsApp
   └── Gestión de los datos del recibo
   │
   ▼
localStorage del navegador
```

La impresión y la generación del PDF se realizan mediante las funciones de impresión disponibles en el navegador.

Esta arquitectura reduce la complejidad de instalación y evita depender de una infraestructura de backend para el uso básico de la aplicación.

---

# Funcionamiento y uso

### Crear un recibo

1. Abre la aplicación.
2. Completa los datos del negocio y del pagador.
3. Introduce el concepto y el valor del pago.
4. Selecciona la forma de pago y agrega una referencia si corresponde.
5. Registra el saldo pendiente cuando sea necesario.
6. Revisa la vista previa del recibo.
7. Guarda o gestiona el registro según las opciones disponibles.

### Imprimir o guardar como PDF

1. Abre el recibo que deseas generar.
2. Selecciona la opción de impresión.
3. En el diálogo del navegador, selecciona una impresora o la opción **Guardar como PDF**.
4. Comprueba el resultado antes de guardar o compartir el documento.

### Consultar el historial

Utiliza el panel de historial para localizar recibos existentes y acceder a las acciones disponibles, como abrir, duplicar o eliminar registros.

### Compartir por WhatsApp

Cuando se ha guardado el celular del cliente, puedes utilizar la opción de WhatsApp para abrir una conversación con el resumen del recibo.

El envío del mensaje depende de la acción del usuario en WhatsApp; la aplicación no envía mensajes automáticamente.

---

# Datos y privacidad

La aplicación utiliza `localStorage` para conservar los datos del negocio y el historial de recibos en el navegador.

Esto implica que:

- Los datos se almacenan localmente en el navegador y dispositivo utilizados.
- No existe sincronización automática entre diferentes dispositivos.
- Borrar los datos del navegador puede eliminar los registros guardados.
- El historial local no constituye una copia de seguridad independiente.
- Los recibos pueden contener información personal o comercial que debe protegerse.

Se recomienda realizar copias de seguridad de los documentos importantes y evitar almacenar información innecesaria o excesivamente sensible.

**Importante:** el uso de `localStorage` no proporciona cifrado ni protección de acceso por sí mismo. Evita utilizar esta aplicación en dispositivos compartidos o no confiables para almacenar información confidencial.

La aplicación no debe considerarse un servicio de almacenamiento documental permanente.

---

# Alcance y consideraciones legales

Los documentos generados por esta aplicación son **recibos informativos de pago**.

Su finalidad es dejar constancia de un importe recibido y del concepto asociado, según la información suministrada por el usuario.

No sustituyen automáticamente:

- Facturas electrónicas de venta.
- Documentos soporte exigidos por la normativa tributaria.
- Comprobantes bancarios oficiales.
- Otros documentos comerciales o contables requeridos según la operación.

En Colombia, cada negocio debe determinar qué documentos está obligado a emitir de acuerdo con su actividad y su situación tributaria.

El usuario es responsable de verificar que el documento utilizado corresponda a la naturaleza de la transacción y a los requisitos legales aplicables.

Esta aplicación no constituye asesoría tributaria, contable ni jurídica.

---

# Seguridad

La seguridad y el uso responsable de la tecnología forman parte de los principios de desarrollo de SatCore Solutions.

Para mantener el proyecto y sus datos en condiciones adecuadas:

- Mantén las dependencias actualizadas.
- Revisa los cambios antes de incorporarlos al proyecto.
- No publiques credenciales, tokens, contraseñas ni claves privadas.
- Evita incluir datos reales de clientes en pruebas o capturas públicas.
- Comprueba los documentos antes de compartirlos.
- Utiliza dispositivos y navegadores de confianza.

### Reportar una vulnerabilidad

Si identificas una vulnerabilidad de seguridad relacionada con este proyecto, evita divulgar públicamente detalles que puedan facilitar su explotación antes de que pueda evaluarse.

**Correo:** satcoresolutions@gmail.com

Incluye una descripción del problema, el impacto potencial, la versión afectada y la información necesaria para evaluarlo, evitando compartir datos personales innecesarios.

---

# Despliegue

La aplicación puede desplegarse en plataformas compatibles con Next.js, como Vercel u otros proveedores adecuados para este framework.

Proceso general:

1. Publicar el código en un repositorio de GitHub.
2. Importar el repositorio en la plataforma de despliegue.
3. Configurar el entorno de compilación.
4. Instalar las dependencias y generar la compilación.
5. Publicar la aplicación.
6. Verificar el funcionamiento en producción.

El uso de `localStorage` significa que los datos guardados en un navegador no se transfieren automáticamente al dominio desplegado ni a otro dispositivo. Los registros locales deben tratarse de acuerdo con el navegador y el origen donde fueron creados.

---

# Desarrollo y contribuciones

Las mejoras, correcciones y adaptaciones deben respetar la arquitectura del proyecto y los términos establecidos en su licencia.

Antes de proponer cambios, se recomienda:

- Revisar el código existente.
- Mantener la coherencia visual de SatCore Solutions.
- Evitar dependencias innecesarias.
- Verificar la compilación de producción.
- Probar los formularios, el historial, la persistencia local y la impresión.

Las contribuciones y los proyectos derivados deberán respetar las condiciones de atribución establecidas en la **SatCore Solutions Attribution License — SCSAL 1.0**.

---

# Proyectos derivados y atribución

Este proyecto puede utilizarse como base para desarrollar nuevas soluciones, de acuerdo con los permisos y las condiciones de la licencia aplicable.

Cuando se copie, adapte, integre o redistribuya una parte sustancial del proyecto, deberá mantenerse una referencia razonablemente visible a **SatCore Solutions** como desarrollador original, conforme a la SCSAL 1.0.

Ejemplo de atribución:

> Basado en Generador de recibos, desarrollado originalmente por SatCore Solutions.

**Repositorio original:**

https://github.com/satcoresolutions/generador-facturas

**Organización de GitHub:**

https://github.com/satcoresolutions

La atribución no debe implicar que SatCore Solutions respalda, mantiene, patrocina o garantiza un proyecto derivado cuando esa relación no exista.

---

# Marca y propiedad intelectual

El código fuente de este proyecto se distribuye conforme a la **SatCore Solutions Attribution License — SCSAL 1.0**, siempre que el archivo `LICENSE` incluido en el repositorio establezca efectivamente esos términos.

La licencia del código no transfiere automáticamente derechos sobre:

- SatCore Solutions.
- SOFTWARE AND TECHNOLOGY CORE SOLUTIONS.
- Logotipos e identidad visual.
- Nombres comerciales y marcas.
- Dominios y signos distintivos.
- Recursos gráficos propios de la marca.

El uso del software no concede, por sí solo, autorización para representar una relación oficial con SatCore Solutions.

### Dependencias de terceros

Las bibliotecas, frameworks, paquetes y demás componentes externos utilizados por el proyecto permanecen sujetos a sus respectivas licencias.

La SCSAL 1.0 no sustituye ni modifica las condiciones de las dependencias de terceros.

---

# Estado del proyecto

- **Proyecto:** Generador de recibos.
- **Organización:** SatCore Solutions.
- **Categoría:** Microaplicación de productividad para pequeños negocios.
- **Estado:** En desarrollo.
- **Versión:** 1.0.0.
- **Repositorio:** [satcoresolutions/generador-facturas](https://github.com/satcoresolutions/generador-facturas).
- **Última actualización:** 2026-10-20.

La versión y la fecha deben actualizarse cuando se publique una nueva versión o se realicen cambios relevantes.

---

# Roadmap

- [x] Registro de recibos de pago.
- [x] Numeración automática.
- [x] Vista previa e impresión.
- [x] Historial local de recibos.
- [x] Persistencia mediante `localStorage`.
- [x] Integración para compartir el resumen mediante WhatsApp.
- [ ] Mejoras adicionales de accesibilidad.
- [ ] Pruebas automatizadas de las operaciones principales.
- [ ] Opciones adicionales de personalización del documento.
- [ ] Evaluación de mecanismos de exportación y respaldo del historial.

Los elementos futuros están sujetos a la planificación y evolución del proyecto.

---

# Licencia

Este proyecto se distribuye bajo la:

## SatCore Solutions Attribution License — SCSAL 1.0

La licencia establece los permisos y las condiciones de uso, modificación, distribución y atribución del software.

Consulta el archivo [`LICENSE`](./LICENSE) incluido en este repositorio para conocer los términos completos.

En caso de discrepancia, prevalece el texto de la licencia sobre este resumen informativo.

---

# Autoría

<div align="center">

### SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

_Soluciones digitales seguras, accesibles y funcionales para todos._

**GitHub:** [github.com/satcoresolutions](https://github.com/satcoresolutions)

**Correo:** satcoresolutions@gmail.com

---

Desarrollado originalmente por **SatCore Solutions**.

© SatCore Solutions — Todos los derechos reservados, excepto los derechos concedidos mediante la licencia aplicable.

</div>
