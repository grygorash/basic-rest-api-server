import { Router } from 'express';

import { usersController } from '../controllers';

const router = Router();
const { users_get, user_signup, user_signin, single_user_delete } = usersController;

router.get('/', users_get);

router.post('/signup', user_signup);

router.post('/signin', user_signin);

router.delete('/:userId', single_user_delete);

export default router;