import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { TownsController } from './towns.controller';
import { TownsService } from './towns.service';

describe('TownsController', () => {
  let townsController: TownsController;

  const mockTownsService = {
    create: vi
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 'town-id', ...dto })),
    findAll: vi.fn().mockResolvedValue([{ id: 'town-id', name: 'Townsville' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TownsController],
      providers: [{ provide: TownsService, useValue: mockTownsService }],
    }).compile();

    townsController = module.get<TownsController>(TownsController);
  });

  describe('createTown', () => {
    it('should create a town', async () => {
      const data = { name: 'Townsville' };
      const result = await townsController.createTown(data);
      expect(result).toEqual({ id: 'town-id', ...data });
    });
  });

  describe('getTowns', () => {
    it('should get all towns', async () => {
      const result = await townsController.getTowns();
      expect(result).toEqual([{ id: 'town-id', name: 'Townsville' }]);
    });
  });
});
