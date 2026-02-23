const fs = require('fs');

const file = 'script.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /const questions = \{[\s\S]*?\n\};\n?/m;

const newPromoQuestions = `const questions = {
    start: {
        id: 'start',
        text: 'Qual é a sua maquininha de cartão atual?',
        options: [
            { text: 'Ton', icon: '🟢', next: 'taxas_atuais' },
            { text: 'Mercado Pago', icon: '🔵', next: 'taxas_atuais' },
            { text: 'PagSeguro / Outras', icon: '🟡', next: 'taxas_atuais' },
            { text: 'Nenhuma, quero começar', icon: '🚀', next: 'taxas_atuais' }
        ]
    },
    taxas_atuais: {
        id: 'taxas_atuais',
        text: 'Você acha as taxas da sua maquininha atual (ou das concorrentes) muito altas?',
        options: [
            { text: 'Sim, são absurdas!', icon: '🤬', next: 'beneficio_zero' },
            { text: 'Poderiam ser menores', icon: '📉', next: 'beneficio_zero' },
            { text: 'Quero a menor taxa do Brasil', icon: '👑', next: 'beneficio_zero' }
        ]
    },
    beneficio_zero: {
        id: 'beneficio_zero',
        text: 'E se você pudesse ter uma das melhores maquininhas do mercado com TAXA ZERO nos primeiros 30 dias?',
        options: [
            { text: 'Eu QUERO muito!', icon: '😍', next: 'envio' },
            { text: 'Onde eu clico?!', icon: '👇', next: 'envio' }
        ]
    },
    envio: {
        id: 'envio',
        text: 'Ótimo! Para onde devemos enviar a sua Maquininha Stone Oficial de presente?',
        options: [
            { text: 'Para o meu negócio', icon: '🏢', next: 'personal_step' },
            { text: 'Para a minha casa', icon: '🏠', next: 'personal_step' }
        ]
    }
};
`;

content = content.replace(regex, newPromoQuestions);
fs.writeFileSync(file, content, 'utf8');
console.log("Promo Quiz injected.");
