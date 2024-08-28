import app from './app';

const port =  3000;

app.on('database_connected', () => {
  app.listen(port, () => {
    console.log(`Access http://localhost:${port}`);
    console.log(`Server running on port ${port}`);
  });
});