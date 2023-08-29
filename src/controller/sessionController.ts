import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate user password
  const user = validatePassword();
  if (!user) {
    return res.status(404).send('Invalid email and password');
  }
  //create session;
  const session = createSession(user.id, user.get('user-agent') || '');
  //create an access token;
  //create a refresh token;
  //return access and refresh token;
}
