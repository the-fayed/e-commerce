const app = require('./app');


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`app is running on port ${port}`));

// handle rejections outside express
process.on(`unhandledRejection`, (error) => {
  console.error(`Unhandled Rejection error >> ${error.name} || ${error.message}`);
  server.close(() => {
    console.error(`Shuting down...`);
    process.exit(1);
  });
});