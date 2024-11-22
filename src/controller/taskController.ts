import { Request,Response } from "express";
import { getChannel } from "../config/rabbitmq";

export const submitTask = async (req: Request, res: Response) => {
    const { taskId, taskType, data } = req.body;
  
    if (!taskId || !taskType || !data) {
        res.status(400).json({ message: 'Task ID, Task Type, and Data are required' });
        return;
    }
  
    const channel = getChannel();
  
    try {
      let queueName = '';
      switch (taskType) {
        case 'addNumbers':
          queueName = 'addNumbersQueue';
          break;
        case 'convertToUppercase':
          queueName = 'convertToUppercaseQueue';
          break;
        case 'sendEmail':
          queueName = 'sendEmailQueue';
          break;
        default:
            res.status(400).json({ message: 'Invalid task type' });
            return;
      }
  
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ taskId, taskType, data })), {
        persistent: true,
      });
  
       res.status(200).json({ message: 'Task submitted successfully' });
    } catch (error) {
       res.status(500).json({ message: 'Failed to submit task', error });
    }
  };
  