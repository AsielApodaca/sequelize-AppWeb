// Configuración de la conexión a la base de datos
import { Sequelize } from 'sequelize';

// Crear instancia de Sequelize para MySQL
const sequelize = new Sequelize('biblioteca', 'root', '3Tristestigres', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Desactiva logs SQL en consola
  pool: {
    max: 5,        // Máximo de conexiones en el pool
    min: 0,        // Mínimo de conexiones en el pool
    acquire: 30000, // Tiempo máximo para adquirir conexión
    idle: 10000    // Tiempo máximo que una conexión puede estar idle
  }
});

// Exportar la instancia de conexión
export default sequelize;