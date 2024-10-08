import {Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {UserParamsDto} from "@appModules/users/dto/user-params.dto";
import {PageResultDto} from "@snapSystem/base-entity/dto/page-result.dto";
import {generateHash} from "@snapSystem/helpers/helpers";

@Controller('api/users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    public async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<BaseEntitySerializer> {
        createUserDto.password = await generateHash(createUserDto.password);
        return this.service.create(createUserDto);
    }

    @Get()
    public async findAll(
        @Query() paramsDto: UserParamsDto,
    ): Promise<BaseEntitySerializer[] |PageResultDto<BaseEntitySerializer>> {
        return this.service.findAll(paramsDto);
    }
}
