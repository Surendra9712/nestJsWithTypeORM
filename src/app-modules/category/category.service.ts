import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryRepository} from "@appModules/category/repositories/category.repository";

@Injectable()
export class CategoryService extends BaseService {
    constructor(@InjectRepository(CategoryRepository)
                private categoryRepository: CategoryRepository) {
        super(categoryRepository);
    }
}
