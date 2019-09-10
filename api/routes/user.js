import { Router } from 'express';

import checkAuth from '../middleware/check-auth';
import { usersController } from '../controllers';

const router = Router();
const { users_get, user_signup, user_signin, single_user_delete } = usersController;

router.get('/', checkAuth, users_get);

router.post('/signup', user_signup);

router.post('/signin', user_signin);

router.delete('/:userId', checkAuth, single_user_delete);

export default router;