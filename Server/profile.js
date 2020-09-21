const handleProfile = (req, res, database) => {
    const { id } = req.params;
    database.select('*')
        .from('users')
        .where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            }
            else {
                res.json('No Such User');
            }
        })
        .catch(err => {
            res.status(400).json('Unspecified Error');
        });
}

module.exports = {
    handleProfile
}