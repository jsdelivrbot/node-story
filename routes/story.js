const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const imageUrl = 'https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw';

/* GET users listing. */
router.get('/:name', (req, res, next) => {
    console.log(req.params)
    res.send('respond ' + req.params.name);
});

router.post('/', (req, res, next) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
    console.log(req.body.queryResult.parameters.title);
    const title = req.body.queryResult.parameters.title.toLowerCase();
    fs.readFile(path.join(__dirname, 'stories', title + '.txt'), function (r) {

        const message = {
            "fulfillmentText": 'Je vais raconter l\'histoire de ' + req.body.queryResult.parameters.title,
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": title.toUpperCase(),
                        "subtitle": r,
                        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                        "buttons": [
                            {
                                "text": "button text",
                                "postback": "https://assistant.google.com/"
                            }
                        ]
                    }
                }
            ],
            "source": 'StoryService'
        };
        res.send(message);
    });
});

module.exports = router;
