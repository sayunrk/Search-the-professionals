import User from '../models/user.model.js';

export async function getUserList(req, res) {
    try {
        const users = await User.find({}, '-password'); 
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
export async function updateProfile(req, res) {
    try {
        const { id } = req.params;
        const allowedUpdates = ["username", "email", "designation", "address", "bio", "experience"];
        
        const updates = {};

        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }
        

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.json({ message: "Profile updated successfully", user: userResponse });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error updating profile" });
    }
}
