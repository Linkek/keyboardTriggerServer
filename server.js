const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.json());

// Open keyboard
app.post('/openKeyboard', (req, res) => {
    
    console.log('Try to open the keyboard.')

    exec('./openKeyboard.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
    });
    res.send('Keyboard opend!');
});

// Close keyboard
app.post('/closeKeyboard', (req, res) => {
    
    console.log('Try to close the keyboard.')

    exec('./closeKeyboard.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
    });
    res.send('Close Keyboard!');
});


app.post('/youClickedOn', (req, res) => {
    console.log('You clicked:', req.body.clickedElement);
    res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
