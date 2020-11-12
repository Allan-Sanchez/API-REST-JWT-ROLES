import {Router} from 'express';
const router = Router();

import * as userCtl from '../controllers/user.controller'
import {authjwt} from '../middlewares';

router.post('/',[authjwt.verifyToken, authjwt.isAdmin],userCtl.createUser);

export default router;