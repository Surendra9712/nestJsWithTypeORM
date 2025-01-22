import {registerAs} from "@nestjs/config";
import {env} from 'process';

export default registerAs('googleOAuth', () => ({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackUrl: env.GOOGLE_CALLBACK_URL,
}))