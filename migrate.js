const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'quiz.html',
    'dados.html',
    'endereco.html',
    'checkout.html',
    'processando.html',
    'sucesso.html',
    'upsell.html',
    'upsell-correios.html',
    'upsell-iof.html',
    'pix.html',
    'orderbump.html',
    'admin.html',
    'admin-backredirects.html',
    'admin-gateways.html',
    'admin-leads.html',
    'admin-pages.html',
    'admin-tracking.html',
    'admin-utmfy.html'
];

const cssFiles = ['style.css'];
const jsFiles = ['script.js', 'server.js'];

// Helpers for replacing exact phrases
function replaceInText(text) {
    let newText = text;
    // Specific phrases first
    newText = newText.replace(/iFood Entregador/g, 'Parceiro Stone');
    newText = newText.replace(/iFood entregador/g, 'Parceiro Stone');
    newText = newText.replace(/Mochila iFood/gi, 'Maquininha Stone');
    newText = newText.replace(/Bolsa iFood Oficial/gi, 'Maquininha Stone Oficial');
    newText = newText.replace(/Bag do iFood/gi, 'Maquininha da Stone');
    newText = newText.replace(/Bag iFood/gi, 'Maquininha Stone');
    newText = newText.replace(/Bolsa iFood/gi, 'Maquininha Stone');
    newText = newText.replace(/Frete padrao iFood/g, 'Frete padrao Stone');
    newText = newText.replace(/Frete padrão iFood/g, 'Frete padrão Stone');
    newText = newText.replace(/Frete iFood/gi, 'Frete Stone');
    newText = newText.replace(/Seguro Bag/gi, 'Seguro Maquininha');
    newText = newText.replace(/kit parceiro iFood/gi, 'kit parceiro Stone');
    newText = newText.replace(/Envio Economico iFood/g, 'Envio Economico Stone');

    // Individual words
    newText = newText.replace(/\bMochila\b/g, 'Maquininha');
    newText = newText.replace(/\bmochila\b/g, 'maquininha');
    newText = newText.replace(/\bBolsa\b/g, 'Maquininha');
    newText = newText.replace(/\bbolsa\b/g, 'maquininha');
    
    // Replace Bag/bag carefully. "bag" is used in "bagfoto.webp", "bagfoto-home.webp"
    // Wait, replacing \bBag\b or \bbag\b won't match "bagfoto" because of the word boundary.
    newText = newText.replace(/\bBag\b/g, 'Maquininha');
    newText = newText.replace(/\bbag\b/g, 'maquininha');
    
    newText = newText.replace(/\bBAG\b/g, 'MAQUININHA');

    // Replace iFood with Stone
    newText = newText.replace(/\biFood\b/g, 'Stone');
    
    // Image replacements
    newText = newText.replace(/assets\/ifoodentregadores\.webp/g, 'assets/stone_logo.webp');
    newText = newText.replace(/assets\/bagfoto\.webp/g, 'assets/stone_maquininha.webp');
    newText = newText.replace(/assets\/bagfoto-home\.webp/g, 'assets/stone_maquininha_home.webp');

    return newText;
}

function processFiles(files) {
    for (const file of files) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let updated = replaceInText(content);
            fs.writeFileSync(filePath, updated, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.warn(`File not found: ${file}`);
        }
    }
}

// Update script.js specifically for text replacements but not keys
function processJsFiles(files) {
    for (const file of files) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Do NOT replace ifood with stone blindly in JS. 
            // We want to replace user-facing strings only.
            let updated = replaceInText(content);
            
            // Wait, replaceInText replaces \biFood\b and \bbag\b and \bBag\b
            // This might replace variable names or keys like `ifoodbag.shipping`. 
            // But `ifoodbag` is one word, and \b won't match inside `ifoodbag.shipping`. It matches boundaries.
            // Let's test if `ifoodbag.shipping` matches any rule.
            // \biFood\b no, because it's ifoodbag.
            // \bbag\b no, because it's ifoodbag.
            // What about `ifood-logo`? `-` is a word boundary. So \biFood\b won't match `ifood-logo` because `i` is boundary but `d` -> `-` is boundary. Wait, ifood is bordered by `-`, so \b matches! 
            // Oh, \biFood\b will match `ifood-logo` and turn it into `Stone-logo`, breaking CSS.
            // Let's restore class names and IDs in the JS/HTML.
            
            updated = updated.replace(/Stone-logo/g, 'ifood-logo');
            updated = updated.replace(/Stone-logo--wide/g, 'ifood-logo--wide');
            updated = updated.replace(/Stone_upsell/g, 'ifood_upsell');
            updated = updated.replace(/__StoneBackRedirectInit/g, '__ifoodBackRedirectInit');

            fs.writeFileSync(filePath, updated, 'utf8');
            console.log(`Updated JS/HTML file ${file}`);
        }
    }
}

processFiles(htmlFiles);
processJsFiles(jsFiles);

// Specific CSS processing
function processCssFiles(files) {
    for (const file of files) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace iFood red with Stone green (roughly #00A868 and variations)
            // #EA1D2C -> #00A868
            // #ea1d2c -> #00A868
            content = content.replace(/#EA1D2C/gi, '#00A868');
            content = content.replace(/#ea1d2c/gi, '#00A868');
            
            // Gradients using #ff5b6a, #ff4f5b, #ff5460, #ff5964, #ff3d4d
            // We will just replace these pinkish/lighter reds with lighter greens
            content = content.replace(/#ff5b6a/g, '#00C87B');
            content = content.replace(/#ff4f5b/g, '#00C87B');
            content = content.replace(/#ff5460/g, '#00C87B');
            content = content.replace(/#ff5964/g, '#00C87B');
            content = content.replace(/#ff3d4d/g, '#00C87B');

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated CSS file ${file}`);
        }
    }
}

processCssFiles(cssFiles);

console.log("Migration script executed.");
