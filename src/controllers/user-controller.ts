import { Request, Response } from "express";
import User from "../models/User.js";
import Thought from "../models/Thought.js";

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "thoughts friends"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user by ID with thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    await user.deleteOne();
    return res.json({ msg: "User deleted with their thoughts." });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// add friend to friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.json({
      msg: "Friend successfully added to your friend list",
      user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// remove friend from friend list
export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.json({ msg: "Friend removed from friend list.", user });
  } catch (err) {
    return res.status(500).json(err);
  }
};
