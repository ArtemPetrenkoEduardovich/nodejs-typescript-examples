import { Injectable } from './Injectable';
import { Controller } from './Controller';
import { Get } from './Get';
import { Application } from './Application';
import { Request } from 'express';

type User = {
  id: string;
  name: string;
};

const users = [
  {
    id: 'id-1',
    name: 'Alex',
  },
  {
    id: 'id-2',
    name: 'Bob',
  },
];

@Injectable()
class UserRepository {
  async list(): Promise<User[]> {
    return Promise.resolve(users);
  }

  async get(id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user || null);
  }
}

@Injectable()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async list(): Promise<User[]> {
    return this.userRepository.list();
  }

  async get(id: string): Promise<User> {
    const user = await this.userRepository.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

@Controller('/users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async list(): Promise<User[]> {
    return this.userService.list();
  }

  @Get('/:id')
  async getUser(req: Request): Promise<User> {
    return this.userService.get(req.params.id);
  }
}

export const apply = async () => {
  Application.start(8888);
};
