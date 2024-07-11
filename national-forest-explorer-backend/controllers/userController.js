const { User, Post, Review, Achievement } = require('../models');

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Post, as: 'posts' },
                { model: Review, as: 'reviews' },
                { model: Achievement, as: 'achievements' },
            ],
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, profilePicture, coverPhoto, profilePhoto } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.coverPhoto = coverPhoto || user.coverPhoto;
        user.profilePhoto = profilePhoto || user.profilePhoto;

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};