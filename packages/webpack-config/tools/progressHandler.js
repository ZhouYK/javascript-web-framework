let i;
const gap = '-';
const progressHandler = '=';
const total = 50;
const perProgress = 2;
const stream = process.stderr;
const handler = (percentage, message, ...args) => {
  const temp = Math.floor(percentage * 100);
  if (i === undefined) {
    i = temp;
  } else {
    if (temp - i >= 1 || temp === 0) {
      stream.write('\u001B[2J\u001B[0;0f');
      const n = Math.floor(temp / perProgress);
      const repeatProgress = progressHandler.repeat(n);
      const repeatSpace = gap.repeat(total - n);
      i = temp;
      const text = `[${repeatProgress}${repeatSpace}]${i}%\n`;
      //readline.cursorTo(stream, 0);
      stream.write(text);
      //readline.clearLine(stream);
    }
  }
};
module.exports = handler;
