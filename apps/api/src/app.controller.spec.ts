import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { TownsService } from './towns/towns.service';
import { PropertiesService } from './real-estate/properties/properties.service';
import { BookingsService } from './real-estate/bookings/bookings.service';
import { ProductsService } from './marketplace/products/products.service';
import { OrdersService } from './marketplace/orders/orders.service';

describe('AppController', () => {
  let appController: AppController;
  let usersService: UsersService;
  let authService: AuthService;

  const mockUsersService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'user-id', ...dto })),
    findOne: vi.fn(),
  };

  const mockAuthService = {
    validateUser: vi.fn(),
    login: vi.fn().mockResolvedValue({ access_token: 'mocked_jwt_token' }),
  };

  const mockTownsService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'town-id', ...dto })),
    findAll: vi.fn().mockResolvedValue([{ id: 'town-id', name: 'Townsville' }]),
  };

  const mockPropertiesService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'property-id', ...dto })),
    findAll: vi.fn().mockResolvedValue([]),
    findOne: vi.fn(),
  };

  const mockBookingsService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'booking-id', ...dto })),
    findByUser: vi.fn(),
  };

  const mockProductsService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'product-id', ...dto })),
    findAll: vi.fn().mockResolvedValue([]),
  };

  const mockOrdersService = {
    create: vi.fn().mockImplementation((dto) => Promise.resolve({ id: 'order-id', ...dto })),
    findByUser: vi.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: TownsService, useValue: mockTownsService },
        { provide: PropertiesService, useValue: mockPropertiesService },
        { provide: BookingsService, useValue: mockBookingsService },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: OrdersService, useValue: mockOrdersService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    usersService = app.get<UsersService>(UsersService);
    authService = app.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('auth/register', () => {
    it('should register a new user successfully', async () => {
      const data = { email: 'test@example.com', password: 'password', name: 'Test User' };
      const result = await appController.register(data);
      expect(result).toEqual({ id: 'user-id', ...data });
      expect(mockUsersService.create).toHaveBeenCalledWith(data);
    });
  });

  describe('auth/login', () => {
    it('should return token if validation succeeds', async () => {
      const credentials = { email: 'test@example.com', password: 'password' };
      const mockUser = { id: 'user-id', email: 'test@example.com', role: 'CUSTOMER' };

      mockAuthService.validateUser.mockResolvedValueOnce(mockUser);

      const result = await appController.login(credentials);
      expect(result).toEqual({ access_token: 'mocked_jwt_token' });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(credentials.email, credentials.password);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should return error if validation fails', async () => {
      const credentials = { email: 'test@example.com', password: 'wrong' };
      mockAuthService.validateUser.mockResolvedValueOnce(null);

      const result = await appController.login(credentials);
      expect(result).toEqual({ error: 'Invalid credentials' });
    });
  });

  describe('towns', () => {
    it('should create a town', async () => {
      const data = { name: 'Townsville' };
      const result = await appController.createTown(data);
      expect(result).toEqual({ id: 'town-id', ...data });
    });

    it('should get all towns', async () => {
      const result = await appController.getTowns();
      expect(result).toEqual([{ id: 'town-id', name: 'Townsville' }]);
    });
  });
});
