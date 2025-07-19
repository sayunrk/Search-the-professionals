import User from '../models/user.model.js';

export async function getUserList(req, res) {
    try {
        const users = await User.find({}, '-password'); // exclude password
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}
