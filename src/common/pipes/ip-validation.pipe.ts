import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class IpValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!net.isIP(value)) {
      throw new BadRequestException('Invalid IP address');
    }
    return value;
  }
}
