class Parser {
  constructor(code,index) {
    this.code = code;
    this.index = index;
    this.commands = [];
    this.foundClosingBracket = false;
  }
  getCommands() {
    while (this.index < this.code.length && !this.foundClosingBracket) {
      this.nextCommand();
    }
    return this.commands;
  }
  nextCommand() {
    var p = "";
    p = this.getNextToken();
    append(this.commands, this.cmdSwitch(p));
  }
  cmdSwitch(p) {
    switch (p) {
      case "fd":
        var arg = this.getNextToken();
        return Commands.move(-arg);
      case "bk":
        var arg = this.getNextToken();
        return Commands.move(arg);
      case "rt":
        var arg = this.getNextToken();
        return Commands.rotate(arg);
      case "lt":
        var arg = this.getNextToken();
        return Commands.rotate(-arg);
      case "pu":
        return Commands.pen(false);
      case "pd":
        return Commands.pen(true);
      case "home":
        return Commands.home();
      case "setxy":
        var x = this.getNextToken();
        var y = this.getNextToken();
        return Commands.goto(x,-y);
      case "repeat":
        var arg = this.getNextToken();
        this.index += 2;
        var prsr = new Parser(this.code,this.index);
        var cmds = prsr.getCommands();
        this.index = prsr.index + 1;
        return Commands.repeat(arg,cmds);
    }
  }
  getNextToken() {
    var p = "";
    while (this.index < this.code.length)
    {
      if (this.code[this.index] == ' ')
      {
        if (p.length == 0)
          this.index++;
        else
        {
          return p;
        }
      }
      else if (this.code[this.index] == ']')
      {
        this.foundClosingBracket = true;
        return p;
      }
      else
      {
        p += this.code[this.index++];
      }
    }
    return p;
  }
}
