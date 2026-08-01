import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockUsersService = {
    create: vi
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 'user-id', ...dto })),
  };

  const mockAuthService = {
    validateUser: vi.fn(),
    login: vi.fn().mockResolvedValue({ access_token: 'mocked_jwt_token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const result = await authController.register(data);
      expect(result).toEqual({ id: 'user-id', ...data });
      expect(mockUsersService.create).toHaveBeenCalledWith(data);
    });
  });

  describe('login', () => {
    it('should return token if validation succeeds', async () => {
      const credentials = { email: 'test@example.com', password: 'password' };
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        role: 'CUSTOMER',
      };

      mockAuthService.validateUser.mockResolvedValueOnce(mockUser);

      const result = await authController.login(credentials);
      expect(result).toEqual({ access_token: 'mocked_jwt_token' });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should return error if validation fails', async () => {
      const credentials = { email: 'test@example.com', password: 'wrong' };
      mockAuthService.validateUser.mockResolvedValueOnce(null);

      const result = await authController.login(credentials);
      expect(result).toEqual({ error: 'Invalid credentials' });
    });
  });
});
