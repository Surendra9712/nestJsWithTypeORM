import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {UserSerializer} from "@models/user/user.serializer";

@Injectable()
export class UserService extends BaseService{
    constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository) {
        super(userRepository);
    }

    public findUserByEmail(email: string): Promise<UserSerializer> {
        return this.userRepository.findUserByEmail(email);
    }
}
