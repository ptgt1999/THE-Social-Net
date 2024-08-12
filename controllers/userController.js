const { User, Thought } = require('../models');

module.exports = {
    async gUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong!, users not retrieved', details: err });
        }
    },

    async gOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!, no user found', details: error });
        }
    },

    async cUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!, user not created', details: error });
        }
    },

    async uUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, user not updated', details: error });
        }
    },

    async dUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thought.deleteMany({ username: user.username });
            res.json({ message: 'User thoughts deleted!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, user not deleted', details: error });
        }
    },

    async aFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, friend not added', details: error });
        }
    },

    async dFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong!, friend not deleted', details: error });
        }
    },
};