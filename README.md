## Prueba técnica Enthec

En esta prueba técnica esta desarrollado un scraper a la web de Milanuncios para sacar el primer inmueble cuando buscas por provincia. Toda esta información se almacena en una MongoDB y algunos endpoints básicos para consumir estos datos.

## Instalación

#### En docker (prod)

```bash
npm run build-docker
```

#### Dev

```bash
npm install
npm run start:dev
```

#### Ejecutar JS compilado

```bash
npm install
npm run build
npm run start
```

#### Tests

```bash
# Si no se han instalado las dependencias
npm install

npm run test
```

## Enpoints

#### `GET /milanuncios/properties`

Query params:

- `province: string` Nombre de la provincia a buscar

Ejemplo: `localhost:3000/milanuncios/properties?province=galicia`

#### `GET /provinces`

Query params:

- `province: string` Nombre de la provincia a filtrar (si se omite no se filtrará ninguna provincia)
- `page: number` Página (si se omite default: 1)
- `size: number` Elementos por página (si se omite default: 10)
- `sortDesc: boolean` Ordenar descendentemente por timestamp (si se omite se ordenará ascendentemente)

Ejemplo: `localhost:3000/provinces?size=10&page=1&province=murcia`

#### `GET /provinces/fav`

Ejemplo: `localhost:3000/provinces/fav`
