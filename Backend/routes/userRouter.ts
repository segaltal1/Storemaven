import {Router} from 'express';
import {createUser, getUsersScores, updateUserScore} from "../controllers/usersController";

const router = Router();

router.get('/get-users', getUsersScores);
router.post('/create-user', createUser);
router.post('/update-score', updateUserScore);

export default router;