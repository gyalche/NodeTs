import mongoose from 'mongoose';
import config from 'config';
import log from './logger';
function connect() {
  const dbUri = config.get<string>('dbUri');
  mongoose
    .connect(dbUri)
    .then((data) => {
      log.info(`database is connect at ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
export default connect;
