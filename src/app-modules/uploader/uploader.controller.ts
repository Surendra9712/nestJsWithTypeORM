import {
    Controller,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import {UploaderService} from './uploader.service';
import {ApiTags} from '@nestjs/swagger';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import * as process from 'process';
import {generateRandomString} from '@snapSystem/helpers/helpers';
import {UploadFileTypeValidator} from "@appModules/uploader/validators/upload-file-type.validator";
import {Public} from "@appModules/auth/decorator/public.decorator";
import {FileTypes} from "@common/types/file.type";

const fileStorage = diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            process.env.FILE_UPLOAD_BASE_DIRECTORY +
            process.env.FILE_UPLOAD_IMAGE_DIRECTORY,
        );
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${Date.now() + '-' + generateRandomString()}${extname(
                file.originalname,
            )}`,
        );
    },
});

@Controller('/api/upload-files')
@ApiTags('Upload Files')
export class UploaderController {
    constructor(private readonly uploaderService: UploaderService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: fileStorage}))
    async uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 5 * 1024 * 1024,
                        message: 'Supported file size must be under 5 MB.',
                    }),
                    new UploadFileTypeValidator({
                        fileType: FileTypes,
                    }),
                ],
            }),
        )
            file: Express.Multer.File,
    ) {
        return await this.uploaderService.uploadSingleFile(file);
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('files', 100, {storage: fileStorage}))
    async uploadMultipleFiles(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 10 * 1024 * 1024,
                        message: 'Supported file size must be under 10 MB.',
                    }),
                    new UploadFileTypeValidator({
                        fileType: FileTypes,
                    }),
                ],
            }),
        )
            files: Express.Multer.File[],
    ) {
        return await this.uploaderService.uploadMultipleFiles(files);
    }
}
