import { Router } from "express";
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } from "../../controllers/thought-controller";


const router = Router();

// /api/thoughts
router.route('/').get(getThoughtById).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as thoughtRoutes };