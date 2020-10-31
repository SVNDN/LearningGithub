let code;
let turtle;

function addExampleButton(title, codeText) {
    let $exampleButton = $(
      '<label class="btn btn-secondary"> \
          <input type="radio" autocomplete="off"> ' + title +
       '</label>');
    $exampleButton.click(function() {
      code.value(codeText);
      walkTurtle();
    });
    $('#exampleButtonContainer').append($exampleButton);

}

function setup() {
  let cnv = createCanvas(400,400)
  cnv.style('display', 'block');
  cnv.parent('sketch-holder');
  code = select('#code');
  translate(width/2, height/2);

  addExampleButton("rectangle", "fd 100 rt 90 fd 150 rt 90 fd 100 rt 90 fd 140");
  addExampleButton("5-Star", "repeat 5 [fd 140 rt 144]");
  addExampleButton("example", "fd 70 rt 130 fd 30 home pu fd 90 pd fd 40 rt 80 fd 77");
  addExampleButton("repeated", "repeat 30 [fd 70 rt 130 fd 30 home pu fd 90 pd fd 40 rt 80 fd 77 pu home pd rt 10]");

  code.input(walkTurtle);
  walkTurtle();
}
function walkTurtle() {
  background(22,22,22);
  turtle = new Turtle(0, 0, 0);
  parser = new Parser(code.value(), 0);
  var cmds = parser.getCommands();
  console.log(cmds);
  for (cmd of cmds) {
    cmd();
  }
}
