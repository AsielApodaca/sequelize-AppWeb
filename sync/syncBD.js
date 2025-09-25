// Script de sincronización de la base de datos
import { sequelize, Autor, Libro, Editorial } from '../models/index.js';

async function sincronizarBD() {
  try {
    console.log('Conectando a la base de datos...');
    
    // Autenticar conexión
    await sequelize.authenticate();
    console.log('Conexión a la BD establecida correctamente.');

    // Sincronizar modelos con la BD
    // { force: true } → BORRA y recrea las tablas (¡CUIDADO!: pierde todos los datos)
    // { alter: true } → Ajusta tablas existentes sin borrar datos (recomendado para desarrollo)
    
    console.log('Sincronizando modelos con la base de datos...');
    await sequelize.sync({ alter: true });
    
    console.log('Modelos sincronizados correctamente.');
    console.log('Tablas creadas/actualizadas:');
    console.log('- autores');
    console.log('- editoriales');
    console.log('- libros');
    
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    // Cerrar conexión
    await sequelize.close();
    console.log('🔒 Conexión cerrada.');
  }
}

// Ejecutar sincronización si el script se ejecuta directamente
if (process.argv[1] === new URL(import.meta.url).pathname) {
  sincronizarBD();
}

export default sincronizarBD;