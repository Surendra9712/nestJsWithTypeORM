import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CategoryService} from "@appModules/category/category.service";
import {CreateCategoryDto} from "@appModules/category/dto/create-category.dto";
import {CategoryParamsDto} from "@appModules/category/dto/category-params.dto";
import {UpdateCategoryDto} from "@appModules/category/dto/update-category.dto";
import {ParseIdPipe} from "@common/pipes/parseId.pipe";
import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {PageResultDto} from "@snapSystem/base-entity/dto/page-result.dto";
import {Public} from "@appModules/auth/decorator/public.decorator";

@Controller('api/categories')
@ApiTags('Categories')
@Public()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post()
    public async create(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseEntitySerializer> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    public async findAll(@Query() categoryParamsDto: CategoryParamsDto): Promise<BaseEntitySerializer[] | PageResultDto<BaseEntitySerializer>> {
        return this.categoryService.findAll(categoryParamsDto);
    }


    @Put(":id")
    public async update(@Param('id', ParseIdPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIdPipe) id: number): Promise<BaseEntitySerializer> {
        return this.categoryService.findOrFail(id);
    }


    @Delete(':id')
    public async remove(@Param('id', ParseIdPipe) id: number): Promise<boolean> {
        return this.categoryService.remove(id);
    }
}
