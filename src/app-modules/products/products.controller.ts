import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateProductDto} from "@appModules/products/dto/create-product.dto";
import {ProductsService} from "@appModules/products/products.service";
import {ProductParamsDto} from "@appModules/products/dto/product-params.dto";
import {Public} from "@appModules/auth/decorator/public.decorator";
import {ParseIdPipe} from "@common/pipes/parseId.pipe";
import {UpdateProductDto} from "@appModules/products/dto/update-product.dto";
import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";

@Controller('api/products')
@ApiTags('Products')
@Public()
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @Get()
    public async findAll(@Query() productParamsDto: ProductParamsDto){
        return this.productsService.getProductList(productParamsDto);
    }

    @Post()
    public async create(@Body() createProductDto: CreateProductDto): Promise<BaseEntitySerializer> {
        const tags = createProductDto.tags.join('|');
        return this.productsService.create({...createProductDto, tags});
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIdPipe) id: number): Promise<BaseEntitySerializer> {
        return this.productsService.findOneProductOrFail(id);
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIdPipe) id: number,
        @Body() updateDto: UpdateProductDto,
    ): Promise<BaseEntitySerializer> {
        const tags = updateDto.tags.join('|');
        return this.productsService.update(id, {...updateDto,tags});
    }

    @Delete(':id')
    public async remove(@Param('id', ParseIdPipe) id: number): Promise<boolean> {
        return this.productsService.remove(id);
    }
}
