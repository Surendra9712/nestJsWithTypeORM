import * as process from 'process';
import {AppConfigOption} from 'src/config/types/config.types';
import {registerAs} from '@nestjs/config';

export default registerAs(
    'app',
    (): AppConfigOption => ({
        url: process.env.APP_URL || 'http://localhost:3000',
        secret: process.env.APP_SECRET || '',
        expireIn: process.env.TOKEN_EXPIRE_IN || '10h',
        debug: process.env.APP_DEBUG == 'true',
        frontAppUrl: process.env.FRONT_APP_URL || 'http://localhost:3000',
        mailHost: process.env.MAIL_HOST,
        mailUser: process.env.MAIL_USERNAME,
        mailPass: process.env.MAIL_PASSWORD,
        mailPort: process.env.MAIL_PORT,
        mailFrom: process.env.MAIL_FROM_ADDRESS,
    }),
);
