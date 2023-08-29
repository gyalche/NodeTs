import { Request, Response } from 'express';
import log from '../utils/logger';
import { createUser } from '../service/user.service';
import { createUserInput } from '../schema/user.schema';
import { omit } from 'lodash';
export async function createUserHandler(
  req: Request<{}, {}, createUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getGoogleOauthHandler(req: Request, res: Response) {}
