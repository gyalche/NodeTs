import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  getGoogleOauthHandler,
} from '../controller/userController';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/session/oauth/google', getGoogleOauthHandler);
}
export default routes;
