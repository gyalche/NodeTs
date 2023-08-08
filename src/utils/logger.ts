import logger from 'pino';
import dayjs from 'dayjs';
import valid from '../middleware/validateResource';
const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
export default log;
