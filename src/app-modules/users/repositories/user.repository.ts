import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {UserEntity} from "@models/user/user.entity";
import {UserSerializer} from "@models/user/user.serializer";
import {UserFilter} from "@appModules/users/filters/user.filter";
import {SnapNotFoundException} from "@snapSystem/exceptions/snap-not-found.exception";
import {SnapBadRequestException} from "@snapSystem/exceptions/snap-bad-request.exception";

export class UserRepository extends BaseRepository<
    UserEntity,
    UserSerializer
> {
    public constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    protected transform(model: UserEntity): UserSerializer {
        return plainToInstance(UserSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<UserEntity>,
    ): BaseFilter<UserEntity> {
        return new UserFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<UserEntity>): void {
    }

    public async findUserByEmail(email: string): Promise<UserSerializer> {
        return this.findOneOrFail({where: {email}}).then((entity: UserEntity) => {
            return Promise.resolve(entity ? this.transform(entity) : null);
        }).catch(() => {
            return Promise.reject(new SnapNotFoundException('User not found.'));
        });
    }

    public async verifyUser(email: string): Promise<boolean> {
        const user = await this.findUserByEmail(email);
        if(user && !user.isLocked){
            return Promise.reject(new SnapBadRequestException('Your account has been already verified.'))
        }
        user.isLocked = false;
        user.emailVerifiedAt = new Date();
        return this.save(user).then(() => {
            return Promise.resolve(true);
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}
