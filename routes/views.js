var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

router.get('/dashboard/:viewname', function(req, res) {
    res.render('dashboard-ng/'+req.params.viewname);
});

module.exports = router;
