import User from '../models/user.model.js';

export async function getUserList(req, res) {
    try {
        const users = await User.find({}, '-password'); // exclude password
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

export async function searchUser(req, res) {
    try {
        const { username, role } = req.query;
        let query = {};
        if (username && username.trim() !== "") {
            query.username = { $regex: username, $options: "i" };
        }
        if (role && role.trim() !== "") {
            query.role = { $regex: role, $options: "i" };
        }
        const users = await User.find(query, "-password");
        res.json({ users });
    } catch (e) {
        res.status(500).json({ message: "Error searching users" });
    }
}
