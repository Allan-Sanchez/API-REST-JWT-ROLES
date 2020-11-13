import {Router} from 'express';
const router = Router();

import * as userCtl from '../controllers/user.controller'
import {authjwt,verifySignup} from '../middlewares';

router.post('/',[authjwt.verifyToken, authjwt.isAdmin,verifySignup.checkRolesExisted],userCtl.createUser);

export default router;