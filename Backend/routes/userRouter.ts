import {Router} from 'express';
import {getUsers, saveUser} from "../controllers/usersController";

const router = Router();

router.get('/get-users', getUsers);
router.post('/save-user', saveUser);

export default router;