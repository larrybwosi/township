export class User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'client';
  createdAt: Date;
  updatedAt: Date;
}
