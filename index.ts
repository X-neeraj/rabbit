import express from 'express';
import taskRoutes from './src/routes/taskRoutes';
import { connectRabbitMQ } from './src/config/rabbitmq';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', taskRoutes);

connectRabbitMQ().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
