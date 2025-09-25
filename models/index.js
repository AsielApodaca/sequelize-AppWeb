// Archivo índice para centralizar todos los modelos y sus relaciones
import sequelize from '../config/database.js';

// Importar modelos
import Autor from './Autor.js';
import Libro from './Libro.js';
import Editorial from './Editorial.js';

// Definir relaciones entre modelos

// Un Autor puede tener muchos Libros
Autor.hasMany(Libro, {
  foreignKey: {
    name: 'autorId',
    allowNull: false // Un libro debe tener un autor
  },
  onDelete: 'RESTRICT' // Evita borrar autor si tiene libros
});

// Una Editorial puede tener muchos Libros
Editorial.hasMany(Libro, {
  foreignKey: {
    name: 'editorialId',
    allowNull: false // Un libro debe tener una editorial
  },
  onDelete: 'RESTRICT'
});

// Un Libro pertenece a un Autor
Libro.belongsTo(Autor, {
  foreignKey: 'autorId'
});

// Un Libro pertenece a una Editorial
Libro.belongsTo(Editorial, {
  foreignKey: 'editorialId'
});

// Objeto con todos los modelos para fácil acceso
const models = {
  Autor,
  Libro,
  Editorial,
  sequelize
};

// Exportar modelos y conexión
export default models;

// Exportaciones individuales para importaciones específicas
export { Autor, Libro, Editorial, sequelize };