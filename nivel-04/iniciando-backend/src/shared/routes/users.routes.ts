import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import CreateUserService from '../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const userId = request.user.id;
    const avatarFilename = request.file.filename;

    const user = await updateUserAvatarService.execute({
      userId,
      avatarFilename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;