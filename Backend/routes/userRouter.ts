import {Router} from 'express';
import {createUser} from "../controllers/usersController";
import {getUsersScores, updateUserScore} from "../controllers/usersScoreController";

const router = Router();

router.get('/get-users', getUsersScores);
router.post('/create-user', createUser);
router.post('/update-score', updateUserScore);

export default router;