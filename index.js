const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    const { sessionId, phoneNumber, text } = req.body;
    const input = text.split('*');
    let response = '';

    const level = input.length;

    if (text === '') {
        response = `CON Welcome to Favourite Food App.\nMurakaza neza kuri Favourite Food App, hitamo ururimi.\n1. English\n2. Kinyarwanda`;
    }
    // Language selected
    else if (level === 1) {
        if (input[0] === '1') {
            response = `CON Select category:\n1. Fast Food\n2. Traditional\n3. Back`;
        } else if (input[0] === '2') {
            response = `CON Hitamo icyiciro:\n1. Ibiryo byihuse\n2. Ibiryo gakondo\n3. Gusubira inyuma`;
        } else {
            response = `END Invalid language selection.`;
        }
    }
    // Category selected
    else if (level === 2) {
        if (input[1] === '3') {
            // Back to language
            response = `CON Welcome to Favourite Food App.\nMurakaza neza kuri Favourite Food App, hitamo ururimi.\n1. English\n2. Kinyarwanda`;
        } else if (input[0] === '1') {
            if (input[1] === '1') {
                response = `CON Choose your food:\n1. Chips and Chicken\n2. Burger\n3. Back`;
            } else if (input[1] === '2') {
                response = `CON Choose your food:\n1. Cassava Bread\n2. Beef and Plantain\n3. Back`;
            } else {
                response = `END Invalid category.`;
            }
        } else if (input[0] === '2') {
            if (input[1] === '1') {
                response = `CON Hitamo ifunguro:\n1. Ifiriti n’Inkoko\n2. Burger\n3. Gusubira inyuma`;
            } else if (input[1] === '2') {
                response = `CON Hitamo ifunguro:\n1. Ubugari\n2. Agatogo\n3. Gusubira inyuma`;
            } else {
                response = `END Icyiciro nticyumvikanye.`;
            }
        }
    }
    // Food selected
    else if (level === 3) {
        const lang = input[0];
        const category = input[1];
        const foodOption = input[2];

        if (foodOption === '3') {
            // Go back to category level
            if (lang === '1') {
                response = `CON Select category:\n1. Fast Food\n2. Traditional\n3. Back`;
            } else {
                response = `CON Hitamo icyiciro:\n1. Ibiryo byihuse\n2. Ibiryo gakondo\n3. Gusubira inyuma`;
            }
        } else {
            let foodName = '';

            if (lang === '1') {
                if (category === '1') {
                    foodName = foodOption === '1' ? 'Chips and Chicken' : 'Burger';
                } else {
                    foodName = foodOption === '1' ? 'Cassava Bread' : 'Beef and Plantain';
                }
            } else {
                if (category === '1') {
                    foodName = foodOption === '1' ? 'Ifiriti n’Inkoko' : 'Burger';
                } else {
                    foodName = foodOption === '1' ? 'Ubugari' : 'Agatogo';
                }
            }

            response = `END Your favourite food is ${foodName}. Thank you!`;
        }
    } else {
        response = `END Invalid input.`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ USSD app running on port ${PORT}`);
});
