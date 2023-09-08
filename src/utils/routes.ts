import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  getGoogleOauthHandler,
} from '../controller/userController';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /healcheck:
   * get:
   *  tag:
   *  -healthcheck
   *  description:Responds if the app is up and running
   *    responses:
   *    200:
   *      description:App is up and running
   */
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  /**
   * @openapi
   * post:
   * tags:
   * -user
   * summary:Register a user;
   * requestBody:
   * required:true
   * contents:
   *  application/json
   * schema:
   *    $ref:'#/components/schemas/createUserInputs'
   */
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  /**
   * @openapi
   * /api/products/${productId}
   * get:
   *  tags:
   *    -product
   *    summary:Get a single product by the productId
   *    parameters:
   *      name:productId
   *      in:path
   *      description:The id of the product
   *      required:true
   *    response:
   *      200:
   *        description:Success
   *        content:
   *          applicatin/json
   *            schema:
   *              $ref:'#/components/schema/Product'
   *      404:
   *        description:Product not found
   *
   */
  app.post('/api/session/oauth/google', getGoogleOauthHandler);
}
export default routes;
