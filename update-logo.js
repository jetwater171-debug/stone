const fs = require('fs');
const path = require('path');

const files = ['index.html', 'quiz.html', 'dados.html', 'checkout.html', 'upsell.html'];
const search = 'assets/stone_logo.webp';
const replace = 'assets/stone_logo_new.png';

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(search)) {
            content = content.replace(new RegExp(search, 'g'), replace);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated logo in ${file}`);
        }
    }
});
