import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {AccessTokenEntity} from "@models/auth/access-token.entity";
import {AccessTokenSerializer} from "@models/auth/access-token.serializer";
import {AuthFilter} from "@appModules/auth/filters/auth.filter";
import {SnapUnauthorizedException} from "@snapSystem/exceptions/snap-unauthorized.exception";

export class AuthRepository extends BaseRepository<
    AccessTokenEntity,
    AccessTokenSerializer
> {
    public constructor(@InjectRepository(AccessTokenEntity) repo: Repository<AccessTokenEntity>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    protected transform(model: AccessTokenEntity): AccessTokenSerializer {
        return plainToInstance(AccessTokenSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<AccessTokenEntity>,
    ): BaseFilter<AccessTokenEntity> {
        return new AuthFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<AccessTokenEntity>): void {
    }

    public async verifyToken(tokenId: string): Promise<boolean> {
        return this.first({where: {tokenId}}).then(async (tokenInfo) => {
            if (!tokenInfo) {
                return Promise.reject(new SnapUnauthorizedException())
            }
            if (tokenInfo.revoked) {
                return Promise.reject(new SnapUnauthorizedException('Token has been expired.'));
            }
        })
    }

    public async logout(tokenId: string): Promise<boolean> {
        let tokenInfo = await this.findOne({where: {tokenId}});
        if (tokenInfo && !tokenInfo.revoked) {
            tokenInfo.revoked = true;
            return this.save(tokenInfo).then(() => {
                return Promise.resolve(true);
            }).catch(error => {
                return Promise.reject(error);
            });
        } else {
            return Promise.reject(new SnapUnauthorizedException());
        }
    }
}
