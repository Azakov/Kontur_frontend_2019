const maxSizeOfColumn = {
    exclamationMark: 1,
    userName: 10,
    date: 10,
    comment: 50,
    fileName: 15
};

function makeAnswer(lines) {
    let columnSize = {
        userName: 4,
        date: 4,
        comment: 7,
        fileName: 8
    };

    lines.forEach(line => maxLengthColumns(line, columnSize));
    const titleLine = makeLineTitle(columnSize);
    const minusLine = '-'.repeat(titleLine.length);
    let finalResult = titleLine + '\n' + minusLine + '\n';
    lines.map(line => finalResult = finalResult + makeLineAnswer(line, columnSize) + '\n');
    if (lines.length) finalResult = finalResult + minusLine;
    console.log(finalResult)

}

function makeLineTitle(columnSize) {
    const userName = makeMaxLength('user', columnSize.userName);
    const date = makeMaxLength('date', columnSize.date);
    const comment = makeMaxLength('comment', columnSize.comment);
    const fileName = makeMaxLength('fileName', columnSize.fileName);
    return `  !  |  ${userName}  |  ${date}  |  ${comment}  |  ${fileName}  `;
}

function maxLengthColumns(line, columnSize) {
    if (line.userName.length > columnSize.userName)
        columnSize.userName = Math.min(line.userName.length, maxSizeOfColumn.userName);
    if (line.date.length > columnSize.date)
        columnSize.date = Math.min(line.date.length, maxSizeOfColumn.date);
    if (line.comment.length > columnSize.comment)
        columnSize.comment = Math.min(line.comment.length, maxSizeOfColumn.comment);
    if (line.fileName.length > columnSize.fileName)
        columnSize.fileName = Math.min(line.fileName.length, maxSizeOfColumn.fileName);
}

function makeLineAnswer(line, columnSize) {
    const exclamationMark = line.markExist ? '!' : ' ';
    const userName = makeMaxLength(line.userName, columnSize.userName);
    const date = makeMaxLength(line.date, columnSize.date);
    const comment = makeMaxLength(line.comment, columnSize.comment);
    const fileName = makeMaxLength(line.fileName, columnSize.fileName);
    return `  ${exclamationMark}  |  ${userName}  |  ${date}  |  ${comment}  |  ${fileName}  `;
}

function makeMaxLength(token, currentLength) {
    if (!currentLength) {
        return token
    }
    return token.length > currentLength ? token.substr(0, currentLength - 3) +
        '...' : token + ' '.repeat(currentLength - token.length);
}

module.exports = {
    makeAnswer
};