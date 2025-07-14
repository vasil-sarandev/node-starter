import { connectKafka } from './kafka';
import { connectMongoose } from './mongoose';

export const setupApp = async (createServerCallback: () => void) => {
  try {
    await connectMongoose();
    console.log('Connected Mongo successfully');
    await connectKafka();
    console.log('Connected Kafka successfully');
    createServerCallback();
  } catch (err) {
    console.error('failed to setup app dependencies');
    console.error(err);
  }
};
