import { Router } from 'express';
const router = Router();

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/user-controller'


// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUser);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export {router as userRoutes}