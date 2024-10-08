import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {SnapForbiddenException} from "@snapSystem/exceptions/snap-forbidden.exception";
import {DataSource} from "typeorm";
import {getTokenFromHeader} from "@helpers/helper-functions";
import * as jwt from "jsonwebtoken";
import {UserEntity} from "@models/user/user.entity";

@Injectable()
export class UserAccountVerificationMiddleware implements NestMiddleware {
    public constructor(private datasource: DataSource) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = getTokenFromHeader(req);
        if (token) {
            const decodeToken = jwt.decode(token);
            const user = await this.datasource.getRepository(UserEntity).createQueryBuilder("user").where({
                id: decodeToken?.sub,
            }).getOne();
            if (user && user.isLocked) {
                throw new SnapForbiddenException('Your account is not verified. Please verify your account to gain further access.')
            }
        }
        next();
    }
}
