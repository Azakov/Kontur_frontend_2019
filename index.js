const {getFullPaths, readFile, getFileName} = require('./fileSystem');
const {readLine} = require('./console');
const {makeAnswer} = require('./answerCreate');
const {parseFiles} = require('./parsingLine');


app();

function app() {
    const files = getFiles();
    const arrayOfLines = parseFiles(files);
    const commandAndLine = command => processCommand(command, arrayOfLines);
    console.log('Please, write your command!');
    readLine(commandAndLine);
}

function getFiles() {
    const filePaths = getFullPaths(process.cwd(), 'js');
    return filePaths.map(path => [getFileName(path), readFile(path)]);
}

function comparison(a, b, property) {
    if (a[property] > b[property]) {
        return -1;
    }
    if (a[property] < b[property]) {
        return 1;
    }
    return 0;
}

function processCommand(command, arrayOfLines) {
    const [commandName, commandArgs] = command.split(' ');
    switch (commandName) {
        case 'show':
            makeAnswer(arrayOfLines);
            break;
        case 'important':
            const importantAnswer = arrayOfLines.filter(line => line.markExist);
            makeAnswer(importantAnswer);
            break;
        case 'user':
            const regExp = new RegExp('^' + commandArgs, 'i');
            const userAnswer = arrayOfLines.filter(line => regExp.test(line.userName));
            makeAnswer(userAnswer);
            break;
        case 'sort':
            let sortAnswer;
            if (commandArgs === 'importance') {
                sortAnswer = arrayOfLines.sort((a, b) => comparison(a, b, 'markAmount'));
            } else if (commandArgs === 'user') {
                sortAnswer = arrayOfLines.sort((a, b) => comparison(a, b, 'userName'))
            } else if (commandArgs === 'date') {
                sortAnswer = arrayOfLines.sort((a, b) => comparison(a, b, 'date'))
            } else {
                console.log('Wrong argument for sort');
                break;
            }
            makeAnswer(sortAnswer);
            break;
        case 'date':
            const dateAnswer = arrayOfLines.filter(line => line.date > commandArgs);
            makeAnswer(dateAnswer);
            break;
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
