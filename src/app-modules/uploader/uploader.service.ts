import {Injectable} from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';

@Injectable()
export class UploaderService {
    async uploadSingleFile(file: Express.Multer.File) {
        return await this.processFile(file);
    }

    async uploadMultipleFiles(files: Express.Multer.File[]) {
        const uploadPromises = files.map(file => this.processFile(file));
        return await Promise.all(uploadPromises);
    }

    public replacePublicAndGeneratePath(path: string): string {
        return path.replace('public', '').replace(/[\\\/]+/g, '/');
    }

    private async processFile(file: Express.Multer.File) {
        const fileData = {
            url: process.env.APP_URL + this.replacePublicAndGeneratePath(file.path),
            type: file.mimetype,
            fileName: file.filename,
            thumbnailUrl:null
        };

        // Check if the file is an image
        if (file.mimetype.startsWith('image/')) {
            const thumbnailPath = await this.createThumbnail(file);
            fileData.thumbnailUrl = process.env.APP_URL + thumbnailPath;
        }

        return fileData;
    }

    private async createThumbnail(file: Express.Multer.File) {
        const thumbnailPath = path.join(path.dirname(file.path), `thumb_${file.filename}`);
        const image = sharp(file.path);
        let {width, height} = await image.metadata();
        const originalWidth = width || 150;
        const originalHeight = height || 150;
        const maxDimension = 150; // Max width or height of the thumbnail
        if (width > height) {
            width = maxDimension;
            height = Math.round((maxDimension * originalHeight) / originalWidth);
        } else {
            height = maxDimension;
            width = Math.round((maxDimension * originalWidth) / originalHeight);
        }

        // Generate thumbnail
        await image
            .resize(width, height)
            .toFile(thumbnailPath);

        return this.replacePublicAndGeneratePath(thumbnailPath);
    }
}
