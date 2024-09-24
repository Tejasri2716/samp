 // routes/postRoutes.js
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        post.likes += 1;
        await post.save();
        res.send(post);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
module.exports = router;
