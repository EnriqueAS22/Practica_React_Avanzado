# Nodepop SPA

Single Page Application creada en React para gestionar anuncios (Nodepop), como parte de la práctica final del módulo de Fundamentos de React de KeepCoding.

## Funcionalidades

- Login con autenticación y opción "Remember me"
- Listado de anuncios
- Detalle de cada anuncio
- Creación de nuevos anuncios con validaciones
- Subida opcional de imagen en los anuncios
- Eliminación de anuncios
- Rutas protegidas (solo accesibles si estás autenticado)
- Diseño responsive con Tailwind CSS

## Tecnologías utilizadas

- React + TypeScript
- React Router
- Axios
- Tailwind CSS
- Vite
- localStorage y sessionStorage (según "Remember me")

## Instalación dependencias

npm install

## Ejecutar la aplicación

npm run dev

## Usuario de prueba

email: user@mail.com
password: 1234

## Organización del código

- pages: Todas las vistas principales (Login, Adverts, New Advert)
- components: Componentes reutilizables (Botones, Inputs, Layout)
- utils/storage.ts: Lógica de almacenamiento (localStorage y sessionStorage)
- auth: Lógica de autenticación y contexto
