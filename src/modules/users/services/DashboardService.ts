import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  authUser: {
    id: string;
    role: string;
  };
}
