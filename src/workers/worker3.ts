import { connectRabbitMQ, getChannel } from '../config/rabbitmq';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'neerajb2347@gmail.com',
    pass: 'ovmf oxkh hdxr fgpx'   
  }
});

const startWorker = async () => {
  await connectRabbitMQ();
  const channel = getChannel();

  console.log('Worker 3 is listening for tasks...');

  channel.consume('sendEmailQueue', async (msg) => {
    if (msg) {
      const task = JSON.parse(msg.content.toString());

      if (task.taskType === 'sendEmail') {
        const { to, subject, body } = task.data;
        console.log(`Worker 3: Sending email to ${to}`);
        
        const mailOptions = {
          from: 'your-email@gmail.com',
          to: to, 
          subject: subject,  
          text: body,  
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }

      setTimeout(() => {
        channel.ack(msg);
        console.log('Worker 3 completed task');
      }, 5000); 
    }
  }, { noAck: false });
};

startWorker();
