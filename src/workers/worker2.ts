import { connectRabbitMQ, getChannel } from '../config/rabbitmq';

const startWorker = async () => {
  await connectRabbitMQ();
  const channel = getChannel();

  console.log('Worker 2 is listening for tasks...');

  channel.consume('convertToUppercaseQueue', (msg) => {
    if (msg) {
      const task = JSON.parse(msg.content.toString());

      if (task.taskType === 'convertToUppercase') {
        const { text } = task.data;
        console.log(`Worker 2: Converting string to uppercase: ${text}`);
        const result = text.toUpperCase();
        console.log(`Converted: ${result}`);
      }

      setTimeout(() => {
        channel.ack(msg); 
        console.log('Worker 2 completed task');
      }, 3000); 
    }
  }, { noAck: false });
};

startWorker();
