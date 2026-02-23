const fs = require('fs');

const file = 'script.js';
let content = fs.readFileSync(file, 'utf8');

// The original block ends with:
//     horario_pico: {
//         ...
//     }
// };
// Let's use a regex to match from "const questions =" up to the first "};\r\n" or "};\n"

const regex = /const questions = \{[\s\S]*?\n\};\n?/m;

const newQuestions = `const questions = {
    start: {
        id: 'start',
        text: 'Qual o seu modelo de negócio?',
        options: [
            { text: 'Pessoa Física (CPF)', icon: '👤', next: 'faturamento' },
            { text: 'Pessoa Jurídica (CNPJ)', icon: '🏢', next: 'faturamento' }
        ]
    },
    faturamento: {
        id: 'faturamento',
        text: 'Qual o seu faturamento médio mensal?',
        options: [
            { text: 'Até R$ 5.000', icon: '🌱', next: 'necessidade' },
            { text: 'De R$ 5.000 a R$ 15.000', icon: '📈', next: 'necessidade' },
            { text: 'Acima de R$ 15.000', icon: '🚀', next: 'necessidade' }
        ]
    },
    necessidade: {
        id: 'necessidade',
        text: 'Qual a sua principal necessidade hoje?',
        options: [
            { text: 'Maquininha com menor taxa', icon: '💳', next: 'maquininha_atual' },
            { text: 'Vender online', icon: '🌐', next: 'maquininha_atual' },
            { text: 'Conta PJ gratuita', icon: '🏦', next: 'maquininha_atual' }
        ]
    },
    maquininha_atual: {
        id: 'maquininha_atual',
        text: 'Você já possui alguma maquininha de cartão?',
        options: [
            { text: 'Sim, mas as taxas são altas', icon: '⚠️', next: 'personal_step' },
            { text: 'Não, será minha primeira', icon: '✨', next: 'personal_step' },
            { text: 'Sim, quero uma reserva', icon: '♻️', next: 'personal_step' }
        ]
    }
};
`;

content = content.replace(regex, newQuestions);
fs.writeFileSync(file, content, 'utf8');
console.log("Updated script.js successfully.");
