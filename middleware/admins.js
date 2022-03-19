

function isAdmin(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('Not Admin. Forbidden');
    next();
}


module.exports = isAdmin;