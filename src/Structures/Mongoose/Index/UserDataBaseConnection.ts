import mongoose from 'mongoose';
import config from '../../../Data/config';
//No this isn't setup yet but will do it soon
let UserDataBaseConnection = mongoose.createConnection(config.database.user, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: false,
	poolSize: 5,
	connectTimeoutMS: 10000,
	family: 4,
});

//Why export here???
//Because if i want to add something here i can without moving it and all.
export default UserDataBaseConnection;
