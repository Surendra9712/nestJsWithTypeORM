import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductRepository} from "@appModules/products/repositories/product.repository";
import {ProductParamsDto} from "@appModules/products/dto/product-params.dto";

@Injectable()
export class ProductsService extends BaseService {
    constructor(@InjectRepository(ProductRepository)
                private productRepository: ProductRepository) {
        super(productRepository);
    }

    public getProductList(productParamsDto: ProductParamsDto){
      return  this.productRepository.getProductList(productParamsDto);
    }

    public async findOneProductOrFail(id:number){
        return this.productRepository.getOneProductDetailOrFail(id);
    }
}
