import amqp,{ Channel, Connection} from "amqplib";

let connection:Connection
let channel:Channel

export const connectRabbitMQ = async ()=>{
    try{
        connection = await amqp.connect('amqp://localhost')
        channel = await connection.createChannel();
        await channel.assertQueue('addNumbersQueue',{durable:true})
        await channel.assertQueue('convertToUppercaseQueue',{durable:true})
        await channel.assertQueue('sendEmailQueue',{durable:true})
        console.log('Connected to RabbitMQ');
    }catch(err){
        console.error('Error connecting to RabbitMQ', err);
    }
}

export const getChannel = () => channel;
