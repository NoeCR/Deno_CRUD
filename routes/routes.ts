import { Router } from "https://deno.land/x/oak/mod.ts";
import * as userController from '../controllers/index.controllers.ts';

const router = new Router();

  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
router
  .get("/users", userController.getUsers)
  .get("/user/:id", userController.getUser)
  .post('/user', userController.createUsers)
  .put("/user/:id", userController.updateUsers)
  .delete("/user/:id", userController.deleteUsers);
  
  export {
    router
  }