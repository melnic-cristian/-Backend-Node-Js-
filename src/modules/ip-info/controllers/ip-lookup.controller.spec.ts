import { Test, TestingModule } from '@nestjs/testing';
import { IpLookupController } from './ip-lookup.controller';
import { IpLookupService } from '../services/ip-lookup.service';
import { IpInfo } from '../domain/entities/ip-info.entity';

describe('IpLookupController', () => {
  let controller: IpLookupController;
  let service: IpLookupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpLookupController],
      providers: [
        {
          provide: IpLookupService,
          useValue: {
            getIpInfo: jest.fn().mockResolvedValue(new IpInfo()),
            removeCache: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<IpLookupController>(IpLookupController);
    service = module.get<IpLookupService>(IpLookupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getIpInfo', () => {
    it('should return an IpInfo object', async () => {
      const result = await controller.getIpInfo('127.0.0.1', {} as any);
      expect(result).toBeInstanceOf(IpInfo);
      expect(service.lookupIp).toHaveBeenCalledWith('127.0.0.1');
    });
  });

  describe('removeCache', () => {
    it('should call the removeCache method on the service', async () => {
      await controller.removeCache('127.0.0.1', {} as any);
      expect(service.lookupIp).toHaveBeenCalledWith('127.0.0.1');
    });
  });
});