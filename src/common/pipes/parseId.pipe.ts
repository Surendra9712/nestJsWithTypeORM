import { ArgumentMetadata, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { SnapBadRequestException } from '@snapSystem/exceptions/snap-bad-request.exception';

export class ParseIdPipe extends ParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parsedValue = await super.transform(value, metadata);

    if (parsedValue < 0) {
      throw new SnapBadRequestException('Value must be a positive integer');
    }

    return parsedValue;
  }
}
