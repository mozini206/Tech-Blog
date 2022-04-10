const router = require('express').Router();
const {
	Comment,
	Post,
	User
} = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', async (req, res) => {
	try {
		const commentData = await Comment.findAll({});
		const comments = commentData.map((comment) => comment.get({
			plain: true
		}));
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comment.create({
			post_comment: req.body.post_comment,
			post_id: req.body.post_id,
			user_id: req.session.user_id
		});
		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});
		if (!commentData) {
			res.status(404).json({
				message: 'No comment found with this id!'
			});
			return;
		}
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});