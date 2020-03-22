const Command = require('common-bin');
const path = require('path');
const pkg = require('./package.json');

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: my-git <command> [options]';

    // load entire command directory
    this.load(path.join(__dirname, 'command'));

    // or load special command file
    // this.add(path.join(__dirname, 'test_command.js'));

    // more custom with `yargs` api, such as you can use `my-git -V`
    this.yargs.alias('V', 'version');
  }
}

module.exports = MainCommand;
