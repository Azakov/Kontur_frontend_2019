function parseFiles(files) {

    const patternTodo = /\/\/\s*todo\s*:?.*/ig;
    return files
        .map(file => [file[0], file[1].match(patternTodo)])
        .filter(linesFromFile => linesFromFile[1] != null)
        .map(linesFromFile => parseLinesFromFiles(linesFromFile))
        .reduce((arr, element) => arr.concat(element), []);
}

function parseLinesFromFiles(linesFromFile) {
    const [nameOfFile, lines] = [linesFromFile[0], linesFromFile[1]];
    return lines.map(line => parseLine(line, nameOfFile));

}

function parseLine(line, nameOfFile) {
    const pattern = /\s*([^;]*(?=;)|);?\s*(\d{4}-\d{2}-\d{2}(?=;)|);?\s*(.*)/i;
    let [fullLine,userName,date,comment] = line.replace(/\/\/\s*todo\s*:?/ig, '').match(pattern);
    const markExist = /!/.test(comment);
    let markAmount = 0;
    if (markExist) {
        markAmount = comment.split('!').length - 1;
    }
    return {
        userName: userName,
        date: date,
        comment: comment,
        fileName: nameOfFile,
        markExist: markExist,
        markAmount: markAmount
    };
}

module.exports = {
    parseFiles
};