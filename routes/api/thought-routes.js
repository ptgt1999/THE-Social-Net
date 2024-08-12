const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    cThought,
    uThought,
    dThought,
    aReaction,
    dReaction,
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(cThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(uThought)
    .delete(dThought);

router.route('/:thoughtId/reactions')
    .post(aReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(dReaction);

module.exports = router;