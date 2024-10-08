import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PasswordResetEntity} from "@models/auth/password-reset.entity";
import {generateHash, generateRandomString} from "@snapSystem/helpers/helpers";
import {PasswordResetSerializer} from "@models/auth/password-reset.serializer";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {UserRepository} from "@appModules/users/repositories/user.repository";
import {ResetPasswordDto} from "@appModules/auth/dto/reset-password.dto";
import {frontAppUrl, getPasswordResetTokenExpireTime, getTimeDifferenceInSeconds} from "@helpers/helper-functions";
import {SnapBadRequestException} from "@snapSystem/exceptions/snap-bad-request.exception";

export class PasswordResetRepository extends Repository<PasswordResetEntity> {
    public constructor(@InjectRepository(PasswordResetEntity) repo: Repository<PasswordResetEntity>,
    @InjectRepository(UserRepository) private userRepository: UserRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    public async createPasswordResetEntityAndGetResetUrl(email: string): Promise<string> {
        let resetPasswordEntity = {}
        resetPasswordEntity = await this.findOne({where: {email}}).then();
        if (!resetPasswordEntity) {
            const entity = {
                token: generateRandomString(50),
                email
            }
            resetPasswordEntity = this.create(entity);
        } else {
            resetPasswordEntity["token"] = generateRandomString(50);
        }
        return this.save(resetPasswordEntity).then((entity) => {
            const url = `${frontAppUrl()}/users/password-reset?token=${entity.token}&email=${entity.email}`;
            return Promise.resolve(url);
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

    public async findOneOrFailByToken(token: string): Promise<PasswordResetSerializer> {
        return this.findOneOrFail({where: {token}}).then((entity) => {
            return Promise.resolve( this.transform(entity));
        }).catch(err => {
            return Promise.reject(new SnapBadRequestException('The password reset token has expired or is invalid.'));
        });
    }

    protected transform(model: PasswordResetEntity): PasswordResetSerializer {
        return plainToInstance(PasswordResetSerializer, instanceToPlain(model));
    }

    public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        let user = await this.userRepository.findUserByEmail(resetPasswordDto.email);
        const passwordInfo = await this.findOneOrFailByToken(resetPasswordDto.token);
        const time = getTimeDifferenceInSeconds(passwordInfo.createdAt);
        if (time > getPasswordResetTokenExpireTime()) {
            return Promise.reject(new SnapBadRequestException('The password reset token has expired or is invalid.'));
        }
        user.password = await generateHash(resetPasswordDto.newPassword);
        return await this.userRepository.save(user).then(_ => {
            return Promise.resolve(true)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}
