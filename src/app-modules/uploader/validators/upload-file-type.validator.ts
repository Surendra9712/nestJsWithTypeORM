import {FileValidator} from '@nestjs/common';

export interface CustomUploadTypeValidatorOptions {
    fileType: string[];
    message?: string
}

export class UploadFileTypeValidator extends FileValidator {
    private allowedMimeTypes: string[];
    private message: string;

    constructor(
        protected readonly validationOptions: CustomUploadTypeValidatorOptions,
    ) {
        super(validationOptions);
        this.allowedMimeTypes = this.validationOptions.fileType;
        this.message = this.validationOptions.message || 'Upload not allowed. Upload only files of type:  jpg, png, jpeg, gif, svg, pdf, doc, docx, xlsx, xls.';
    }

    public isValid(file?: Express.Multer.File): boolean {
        return this.allowedMimeTypes.includes(file.mimetype);
    }

    public buildErrorMessage(): string {
        return this.message;
    }
}
