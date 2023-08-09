import { Request, Response } from 'express';

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate user password
  const user = validatePassword();
  //create session;
  //create an access token;
  //create a refresh token;
  //return access and refresh token;
}
