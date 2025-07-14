import { connectKafka } from './kafka';
import { connectMongoose } from './mongoose';

export const setupApp = async (createServerCallback: () => void) => {
  try {
    await connectMongoose();
    await connectKafka();
    createServerCallback();
  } catch (err) {
    console.error(err);
  }
};
