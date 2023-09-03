import mongoose from 'mongoose';

const connect = async () => mongoose.connect(process.env.MONGODB_URI);

export default connect;