import mongoose from 'mongoose';

const MONGOOSE_CONNECTION_STRING = process.env.MONGOOSE_CONNECTION_STRING as string;

export const connectMongoose = async (callback: () => void) => {
  try {
    await mongoose.connect(MONGOOSE_CONNECTION_STRING);
    callback();
  } catch (err) {
    console.error(err);
  }
};
