const router = require('express').Router();

const {
    gUsers,
    gOneUser,
    cUser,
    uUser,
    dUser,
    aFriend,
    dFriend,
} = require('../../controllers/userController');

router.route('/')
    .get(gUsers)
    .post(cUser);

router.route('/:userId')
    .get(gOneUser)
    .put(uUser)
    .delete(dUser);

router.route('/:userId/friends/:friendId')
    .post(aFriend)
    .delete(dFriend);

module.exports = router;