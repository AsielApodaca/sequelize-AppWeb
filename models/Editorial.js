// Modelo Editorial - Representa la tabla de editoriales en la BD
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Definir el modelo Editorial
const Editorial = sequelize.define('Editorial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true, // Campo opcional
    defaultValue: null
  }
}, {
  tableName: 'editoriales',
  timestamps: true
});

// Exportar el modelo
export default Editorial;