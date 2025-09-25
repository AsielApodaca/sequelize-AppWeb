// Modelo Autor - Representa la tabla de autores en la BD
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Definir el modelo Autor
const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // Campo obligatorio
    validate: {
      notEmpty: true // No puede ser string vacío
    }
  },
  biografia: {
    type: DataTypes.TEXT,
    allowNull: true, // Campo opcional
    defaultValue: null // Valor por defecto
  }
}, {
  tableName: 'autores', // Nombre específico de la tabla
  timestamps: true // Sequelize maneja createdAt y updatedAt automáticamente
});

// Exportar el modelo
export default Autor;