import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {CategoryRepository} from "@appModules/category/repositories/category.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryEntity} from "@models/category/category.entity";

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository]
})
export class CategoryModule {}
