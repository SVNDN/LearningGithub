class Commands {
  static move(a) {
    return function() {
      turtle.move(a);
    };
  }

  static rotate(angle) {
    return function() {
      turtle.rotate(angle);
    };
  }

  static repeat(n, cmds) {
    return function() {
      for (var i = 0; i < n; i++) {
        for (var cmd of cmds) {
          cmd();
        }
      }
    };
  }

  static pen(onPaper) {
    return function() {
      turtle.pen = onPaper;
    };
  }

  static home() {
    return function() {
      turtle.home();
    };
  }

  static goto(x,y) {
    return function() {
      turtle.goto(x,y);
    };
  }
}
