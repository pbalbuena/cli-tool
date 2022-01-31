#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r)=> setTimeout(r, ms))

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        "Who wants to be a Millionaire?\n"
    );
    await sleep();
    rainbowTitle.stop();
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Cuál es tu nombre?',
        default(){
            return 'Jugador 1';
        },
    });
    playerName = answers.player_name;
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Quién fue el creador de Linux?',
        choices: [
            'Elon Musk',
            'Albert Einstein',
            'Linus Torvalds',
            'Bill Gates',
        ],
    });

    return handleAnswer(answers.question_1 == 'Linus Torvalds');
}

async function question2(){
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Cuál de estas es una base de datos NoSQL...',
        choices: [
            'MongoDB',
            'MySQL',
            'Oracle',
            'Access',
        ],
    });

    return handleAnswer(answers.question_2 == 'MongoDB');
}

async function question3(){
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Hablando de estructuras de datos... Cómo se comporta una pila?',
        choices: [
            'Primero en entrar, último en salir (FILO)',
            'Primero en entrar, primero en salir (FIFO)',
            'Los elementos salen y entran según demanda',
            'Los elementos no pueden estar repetidos',
        ],
    });

    return handleAnswer(answers.question_3 == 'Primero en entrar, último en salir (FILO)');
}

async function question4(){
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Javascript se creó en 10 días, después se lanzó oficialmente en...',
        choices: [
            'Mayo, 23rd, 1995',
            'Noviembre, 24th, 1995',
            'Diciembre, 4th, 1995',
            'Diciembre, 17th, 1996',
        ],
    });

    return handleAnswer(answers.question_4 == 'Diciembre, 4th, 1995');
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if(isCorrect){
        spinner.success({
            text: `Buen trabajo ${playerName}. Has dado en el clavo!`
        })
    } else{
        spinner.error({
            text: `Error! Juego terminado. Has perdido, ${playerName}.`
        });
        process.exit(1);
    }
}

function winner(){
    console.clear();
    const msg = `Felicidades, ${playerName} ! \n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await askName();
await welcome();
await question1();
await question2();
await question3();
await question4();
winner();