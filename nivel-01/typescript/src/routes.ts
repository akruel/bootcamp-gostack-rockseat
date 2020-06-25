import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Anderson',
    email: 'anderson.kruel@gmail.com',
    password: 'senha',
    techs: [
      'Node.js',
      'ReactJS',
      'React Native',
      { title: 'Javascript', experience: 100 },
    ],
  });
  return response.json({ message: 'Olá mundo!' });
}
