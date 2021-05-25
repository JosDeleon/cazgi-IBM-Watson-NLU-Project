const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstardingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstarding = new NaturalLanguageUnderstardingV1 ({
        version : '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstarding;
}

NLU = getNLUInstance();

app.use(express.static('client'));

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});

app.get("/url/emotion", (req,res) => {
    const params = {
        'url' : req.query.url,
        'features' : {
            'emotion' : {}
        }
    }

    NLU.analyze(params)
    .then(results =>{
        emotion = results.result.emotion.document.emotion;
        console.log(emotion);
        return res.send(emotion);
    })
    .catch(error => {
        console.log('Error: ', error);
        return res.send("Processing Error");
    });
});

app.get("/url/sentiment", (req,res) => {
    const params = {
        'url' : req.query.url,
        'features' : {
            'sentiment' : {}
        }
    }

    NLU.analyze(params)
    .then(results =>{
        sentiments = results.result.sentiment.document.label;
        console.log(sentiments);
        return res.send(sentiments);
    })
    .catch(error => {
        console.log('Error: ', error);
        return res.send("Processing Error");
    });
});

app.get("/text/emotion", (req,res) => {
    const params = {
        'text' : req.query.text,
        'features' : {
            'emotion' : {}
        }
    }

    NLU.analyze(params)
    .then(results =>{
        emotion = results.result.emotion.document.emotion;
        console.log(emotion);
        return res.send(emotion);
    })
    .catch(error => {
        console.log('Error: ', error);
        return res.send("Processing Error");
    });
});

app.get("/text/sentiment", (req,res) => {
    const params = {
        'text' : req.query.text,
        'features' : {
            'sentiment' : {}
        }
    }

    NLU.analyze(params)
    .then(results =>{
        sentiments = results.result.sentiment.document.label;
        console.log(sentiments);
        return res.send(sentiments);
    })
    .catch(error => {
        console.log('Error: ', error);
        return res.send("Processing Error");
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
