//load everything when page is loaded
function onload() {
  cart.Display(); RPS.Display();
}

//Exercise 1
function Cart() {
  this.quantity = 0;

  this.Show = function() {
    alert(`Quantity: ${this.quantity}`);
  }

  this.Increment = function(amount) {
    this.quantity += amount;
    this.Display();
  }

  this.Reset = function() {
    this.quantity = 0;
    this.Display(true);
  }

  this.Display = function(reset = false) {
    let s = `Quantity: ${this.quantity}`
    if (reset) s += '\nCart Reset'
    document.getElementById('display1').textContent = s;
  }
}
let cart = new Cart();

//Exercise 2
class RockPaperScissor {
  constructor() {
    this.inputP = 0;
    this.inputC = 0;
    this.ROCK = 'ROCK';
    this.PAPER = 'PAPER';
    this.SCISSOR = 'SCISSOR';
    this.inputs = [this.ROCK, this.PAPER, this.SCISSOR];
    this.score = JSON.parse(localStorage.getItem('score')) || {
      win: 0,
      lose: 0,
      tie: 0
      };
  }
  //This program can further be optimized by using indexes instead of strings

  StartGame() {
    this.inputC = this.inputs[Math.floor(Math.random() * 3)];
    console.log(`Computer chose ${this.inputC}`);
  }

  Game(input) {
    if (!this.inputC) {
      console.log('Game not Started');
      return;
    }
    console.log(`You chose ${input}`);
    this.inputP = input;
    this.GameEnd();
  }

  GameEnd() {
    this.condition1 = (this.inputP === this.ROCK && this.inputC === this.SCISSOR);
    this.condition2 = (this.inputP === this.PAPER && this.inputC === this.ROCK);
    this.condition3 = (this.inputP === this.SCISSOR && this.inputC === this.PAPER);

    if (this.inputP === this.inputC)
      this.Ties();
    else {
      (this.condition1 || this.condition2 || this.condition3) ?
      this.Wins() : this.Loses();
    }

    localStorage.setItem('score', JSON.stringify(this.score));
    this.inputC = 0;
    this.Display();
  }

  Wins() {
    console.log('You Win!');
    this.score.win += 1;
  }

  Loses() {
    console.log('You Lose!');
    this.score.lose += 1;
  }

  Ties() {
    console.log('Tie');
    this.score.tie += 1;
  }

  Display(reset = false, pop = false) {
    let s1 = `Win: ${this.score.win}\nLose: ${this.score.lose}\nTie: ${this.score.tie}`;
    let s2 = '\nScore Reset';
    if (reset) {
      s1 += s2;
    }
    if (pop) alert(s1);
    document.getElementById('display2').textContent = s1;
  }

  ResetScore() {
    this.inputC = 0;
    this.score.win = this.score.lose = this.score.tie = 0;
    localStorage.removeItem('score');
    this.Display(true);
  }
}
let RPS = new RockPaperScissor;

//Exercise 3
