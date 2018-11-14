const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const imageUrl = 'https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw';

/* GET users listing. */
router.get('/:name', (req, res, next) => {
    console.log(req.params)
    const title = req.params.name.toLowerCase();
    fs.readFile(path.join(__dirname, '..', 'stories', title + '.txt'), 'utf8', function (err, data) {
        if (err) {
            console.error(err)
            const message = {
                "fulfillmentText": 'Je n\'ai pas trouvé l\'histoire de ' + req.params.name,
                "source": 'StoryService'
            };
            res.send(message);
        } else {
            console.log(data)
            const message = {
                "fulfillmentText": 'Je vais raconter l\'histoire de ' + req.params.name,
                "fulfillmentMessages": [
                    {
                        "card": {
                            "title": title.toUpperCase(),
                            "subtitle": data,
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
        }
    });
});

router.post('/', (req, res, next) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
    console.log(req.body.queryResult.parameters.title);
    const title = req.body.queryResult.parameters.title.toLowerCase();
    fs.readFile(path.join(__dirname, '..', 'stories', title.replace(/ /gi, '_') + '.txt'), 'utf8', function (err, data) {
        if (err) {
            console.error(err)
            const message = {
                "fulfillmentText": 'Je n\'ai pas trouvé l\'histoire de ' + req.body.queryResult.parameters.title,
                "source": 'StoryService'
            };
            res.send(message);
        } else {
            console.log(data);
            const fulfillmentMessages = [
                {
                    "image": {
                        "imageUri": 'https://node-story.herokuapp.com/images/' + title + '.png',
                        "accessibilityText": title
                    }
                }, {
                    "text": {
                        "text": [
                            'Je vais te raconter l\'histoire de ' + req.body.queryResult.parameters.title + '.'
                        ]
                    }
                }];

            data.split('\n').forEach(p => {
                fulfillmentMessages.push({
                    "text": {
                        "text": [p]
                    }
                });
            });

            const message = {
                "fulfillmentText": 'Je vais raconter l\'histoire de ' + req.body.queryResult.parameters.title,
                "fulfillmentMessages": fulfillmentMessages,
                "source": 'StoryService'
            };
            res.send(message);
        }
    });
});

module.exports = router;
