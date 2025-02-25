import Thought from '../models/Thought';
import User from '../models/User';
// Get all thoughts
export const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching thoughts', error });
    }
};
// Get a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching thought', error });
    }
};
// Create a new thought
export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
};
// Update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating thought', error });
    }
};
// Delete a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};
// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!updatedThought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding reaction', error });
    }
};
// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!updatedThought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};
