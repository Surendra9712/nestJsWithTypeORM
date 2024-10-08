import * as process from 'process';
import {Request} from 'express';

export function frontAppUrl() {
    return process.env.FRONT_APP_URL
}

export function getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

export function getTimeDifferenceInSeconds(firstDate: Date, secondDate = new Date()): number {
    const difference = secondDate.getTime() - firstDate.getTime();
    const differenceInSeconds = (difference / 1000).toFixed(2);
    return Number(differenceInSeconds)

}

export function getPasswordResetTokenExpireTime(): number {
    return Number(process.env.PASSWORD_RESET_TOKEN_EXPIRE_TIME) || 7200
}