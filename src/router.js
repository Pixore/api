const router = require('express').Router();

router.use('/editor/', require('./routes/editor/editor.js'));
router.use('/things/', require('./routes/things/things.js'));
router.use('/users/', require('./routes/users/users.js'));
router.use('/sprites/', require('./routes/sprites/sprites.js'));
router.use('/images/', require('./routes/images/images.js'));
router.use('/palettes/', require('./routes/palettes/palettes.js'));
router.use('/auth/', require('./routes/auth/auth.js'));

router.use('/*', function (req, res) {
  res.status(404).end();
});

module.exports = router;