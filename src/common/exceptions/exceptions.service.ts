import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IException, IFormatExceptionMessage } from './exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  public badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  public internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  public forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
}
