import { connectRabbitMQ, getChannel } from '../config/rabbitmq';

const startWorker = async () => {
  await connectRabbitMQ();
  const channel = getChannel();

  console.log('Worker 1 is listening for tasks...');

  channel.consume('addNumbersQueue', (msg) => {
    if (msg) {
      const task = JSON.parse(msg.content.toString());

      if (task.taskType === 'addNumbers') {
        const { num1, num2 } = task.data;
        console.log(`Worker 1: Adding ${num1} + ${num2}`);
        const result = num1 + num2;
        console.log(`Result: ${result}`);
      }

      setTimeout(() => {
        channel.ack(msg); 
        console.log('Worker 1 completed task');
      }, 2000);
    }
  }, { noAck: false });
};

startWorker();
