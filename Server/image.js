const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a07a94f78a5a42febf38b492c96f1c30'
  });

const handleApiCall = (req, res) =>
{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json("Api Call Failed");
    })
}

const handleImage = (req, res, database) => {
    const { id } = req.body;
    database('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            }
            else {
                res.json("No such Profile");
            }
        })
        .catch(err => {
            res.status(400).json("Unspecified Error");
        })
}

module.exports = {
    handleImage,
    handleApiCall
}