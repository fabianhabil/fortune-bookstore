import morgan from 'morgan';
import logger from '../utils/logger.util';

import type { StreamOptions } from 'morgan';

const LOGGING_FORMAT =
    '":method :url" :status - ' +
    ':response-time ms ":user-agent"';

const streamOptions: StreamOptions = {
    write(str) {
        logger.info(str.trim());
    },
};

const handleLogging = morgan(
    LOGGING_FORMAT,
    {
        stream: streamOptions,
    },
);

export default handleLogging;