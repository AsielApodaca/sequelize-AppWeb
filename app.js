// Archivo principal de la aplicación - Práctica CRUD completa
import { Autor, Libro, Editorial, sequelize } from './models/index.js';

async function practicaCRUD() {
  try {
    console.log('Iniciando práctica CRUD con Sequelize...\n');

    // 1. CONEXIÓN Y VERIFICACIÓN
    console.log('1. Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('Conexión establecida.\n');

    // 2. CREAR REGISTROS (CREATE)
    console.log('2. Creando autores, editoriales y libros...');
    
    // Crear autores
    const autor1 = await Autor.create({
      nombre: 'Gabriel García Márquez',
      biografia: 'Escritor colombiano, ganador del Nobel de Literatura en 1982.'
    });

    const autor2 = await Autor.create({
      nombre: 'Isabel Allende',
      biografia: 'Escritora chilena, conocida por sus novelas de realismo mágico.'
    });

    const autor3 = await Autor.create({
      nombre: 'Mario Vargas Llosa',
      biografia: 'Escritor peruano, premio Nobel de Literatura 2010.'
    });

    // Crear editoriales
    const editorial1 = await Editorial.create({
      nombre: 'Sudamericana',
      pais: 'Argentina'
    });

    const editorial2 = await Editorial.create({
      nombre: 'Planeta',
      pais: 'España'
    });

    const editorial3 = await Editorial.create({
      nombre: 'Alfaguara',
      pais: 'España'
    });

    // Crear libros
    const libro1 = await Libro.create({
      titulo: 'Cien años de soledad',
      añoPublicacion: 1967,
      isbn: '978-8437604947',
      autorId: autor1.id,
      editorialId: editorial1.id
    });

    const libro2 = await Libro.create({
      titulo: 'La casa de los espíritus',
      añoPublicacion: 1982,
      isbn: '978-8401353541',
      autorId: autor2.id,
      editorialId: editorial2.id
    });

    const libro3 = await Libro.create({
      titulo: 'Crónica de una muerte anunciada',
      añoPublicacion: 1981,
      isbn: '978-8432201234',
      autorId: autor1.id,
      editorialId: editorial2.id
    });

    const libro4 = await Libro.create({
      titulo: 'La ciudad y los perros',
      añoPublicacion: 1963,
      isbn: '978-8432205678',
      autorId: autor3.id,
      editorialId: editorial3.id
    });

    console.log('Datos creados correctamente.\n');

    // 3. LEER REGISTROS (READ) con relaciones
    console.log('3. Leyendo libros con información de autores y editoriales...');
    
    const librosConRelaciones = await Libro.findAll({
      include: [
        { model: Autor },
        { model: Editorial }
      ],
      order: [['titulo', 'ASC']] // Ordenar por título ascendente
    });

    console.log('Lista de libros:');
    librosConRelaciones.forEach(libro => {
      console.log(`- "${libro.titulo}" (${libro.añoPublicacion})`);
      console.log(`Autor: ${libro.Autor.nombre} | Editorial: ${libro.Editorial.nombre}`);
    });
    console.log('');

    // 4. CONSULTAS ESPECÍFICAS
    console.log('4.Consultas específicas...');
    
    // Buscar libros de un autor específico
    const librosGarciaMarquez = await Libro.findAll({
      include: [
        {
          model: Autor,
          where: { nombre: 'Gabriel García Márquez' }
        },
        { model: Editorial }
      ]
    });

    console.log('Libros de Gabriel García Márquez:');
    librosGarciaMarquez.forEach(libro => {
      console.log(`- "${libro.titulo}" (${libro.añoPublicacion}) - ${libro.Editorial.nombre}`);
    });
    console.log('');

    // 5. ACTUALIZAR REGISTROS (UPDATE)
    console.log('5. Actualizando información de un libro...');
    
    // Buscar libro por título
    const libroAActualizar = await Libro.findOne({
      where: { titulo: 'Cien años de soledad' }
    });

    if (libroAActualizar) {
      await libroAActualizar.update({
        añoPublicacion: 1970 // Cambiar año de publicación
      });
      console.log('Libro actualizado correctamente.');
      console.log(`Nuevo año: ${libroAActualizar.añoPublicacion}\n`);
    }

    // 6. CONSULTAS AVANZADAS
    console.log('6. Consultas avanzadas...');
    
    // Contar libros por autor
    const conteoPorAutor = await Libro.findAll({
      attributes: [
        'autorId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_libros']
      ],
      group: ['autorId'],
      include: [{ model: Autor }],
      raw: true // Resultados planos para fácil acceso
    });

    console.log('   📊 Conteo de libros por autor:');
    conteoPorAutor.forEach(item => {
      console.log(`      - ${item['Autor.nombre']}: ${item.total_libros} libros`);
    });

    console.log('');

    // 7. ELIMINAR REGISTROS (DELETE) - Ejemplo comentado por seguridad
    console.log('7. 🗑️ Ejemplo de eliminación (comentado por seguridad)...');
    /*
    const libroAEliminar = await Libro.findOne({
      where: { titulo: 'Crónica de una muerte anunciada' }
    });
    
    if (libroAEliminar) {
      await libroAEliminar.destroy();
      console.log('   ✅ Libro eliminado correctamente.');
    }
    */
    console.log('   💡 Descomenta el código en app.js para probar la eliminación.\n');

    console.log('✅ Práctica CRUD completada exitosamente!');

  } catch (error) {
    console.error('❌ Error durante la práctica CRUD:', error);
  } finally {
    // Cerrar conexión
    await sequelize.close();
    console.log('🔒 Conexión a la base de datos cerrada.');
  }
}

// Ejecutar la práctica si el archivo se ejecuta directamente
if (process.argv[1] === new URL(import.meta.url).pathname) {
  practicaCRUD();
}

export default practicaCRUD;