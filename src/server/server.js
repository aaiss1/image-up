const vision = require('@google-cloud/vision');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const keyFilename = './src/server/keys.json';

app.use(cors());

app.get('/labels', async(req, res) => {

    // Creates a client
    const client = new vision.ImageAnnotatorClient({keyFilename});

    // Performs label detection on the image file
    const [result] = await client.labelDetection(req.query.imageUrl);
    const imageLabels = result.labelAnnotations;
    let labels = [];
    imageLabels.forEach(label => labels.push(label.description));

    res.send(labels);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

