const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3001;

// Inicializar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database synchronized');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API available at: http://localhost:${PORT}/api`);
    });

  } catch (error) {

    console.error('❌ Unable to start server:', error);

    app.listen(PORT, () => {
      console.log(`⚠️ Server started without database on port ${PORT}`);
    });

  }
}

// Ejecutar servidor
startServer();

// Cierre correcto
process.on('SIGTERM', async () => {
  console.log('SIGTERM received');

  await sequelize.close();

  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received');

  await sequelize.close();

  process.exit(0);
});