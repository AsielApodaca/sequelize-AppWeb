// Modelo Libro - Representa la tabla de libros en la BD
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Definir el modelo Libro
const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255] // Longitud entre 1 y 255 caracteres
    }
  },
  añoPublicacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1000, // Año mínimo válido
      max: new Date().getFullYear() // No puede ser mayor al año actual
    }
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true // ISBN único por libro
  }
}, {
  tableName: 'libros',
  timestamps: true
});

// Exportar el modelo
export default Libro;