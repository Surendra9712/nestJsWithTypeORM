import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {DataSource} from "typeorm";
import {UserEntity} from "@models/user/user.entity";
import {getTokenFromHeader} from "@helpers/helper-functions";
import * as jwt from "jsonwebtoken";

@Injectable()
export class SetUserToRequestMiddleware implements NestMiddleware {
    public constructor(private datasource: DataSource) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = getTokenFromHeader(req);
        if (token) {
            const decodeToken = jwt.decode(token);
            req['user'] = await this.datasource.getRepository(UserEntity).createQueryBuilder("user").where({
                email: decodeToken?.['username'],
            }).getOne();
        }
        next();
    }
}
