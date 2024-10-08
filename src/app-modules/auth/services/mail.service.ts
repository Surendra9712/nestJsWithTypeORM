import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import { join } from 'path';
import * as handlebars from "handlebars";
import {UserSerializer} from "@models/user/user.serializer";
import {getPasswordResetTokenExpireTime} from "@helpers/helper-functions";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(user: UserSerializer, subject:string, url:string, templateName:string = 'reset-password') {
        const templatePath = join('src/templates', `${templateName}.hbs`);
        const template = fs.readFileSync(templatePath, 'utf8');
        const compiledTemplate = handlebars.compile(template);
        const expireTime = getPasswordResetTokenExpireTime()
        const emailContent = compiledTemplate({ name: user.fullName, url,time:expireTime/3600 });
        await this.mailerService.sendMail({
            to: user.email,
            subject: subject,
            html: emailContent,
        });
    }
}
