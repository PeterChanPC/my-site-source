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
    this.Display();
    document.getElementById('display2').innerHTML += 'Game Started';
  }

  Game(input) {
    if (!this.inputC) {
      console.log('Game not Started');
      return;
    }
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
  }

  Wins() {
    this.score.win += 1;
    this.Display(false, false, 'You Win');
  }

  Loses() {
    this.score.lose += 1;
    this.Display(false, false, 'You Lose');
  }

  Ties() {
    this.score.tie += 1;
    this.Display(false, false, 'It\'s a Tie');
  }

  Display(reset = false, pop = false, result = null) {
    let s1 = `Win: ${this.score.win}<br>Lose: ${this.score.lose}<br>Tie: ${this.score.tie}<br>`;
    let s2 = 'Score Reset';
    let s3 = `Computer chose <span class="result">${this.inputC}</span><br>You chose <span class="result">${this.inputP}</span><br><span style="font-weight: bold;">${result}</span>`

    if (reset) s1 += s2;
    if (pop) alert(s1);
    if (result) s1 += s3;

    document.getElementById('display2').innerHTML = s1;
  }

  ResetScore() {
    this.inputC = 0;
    this.score.win = this.score.lose = this.score.tie = 0;
    localStorage.removeItem('score');
    this.Display(true);
  }
}

//Exercise 3
class DOM {
  constructor() {

  }

  ShowExercise() {
    cart = new Cart();
    RPS = new RockPaperScissor;
    document.querySelectorAll('.Exercise').forEach((elm) => elm.style.display = 'flex');
    this.Display();
    const buttonelm = document.querySelector('.ex3-button');
    buttonelm.textContent = 'Hide Exercises';
    buttonelm.setAttribute('onclick', 'ex3.HideExercise()')
  }

  HideExercise() {
    document.querySelectorAll('.Exercise').forEach((elm) => elm.style.display = 'none');
    const buttonelm = document.querySelector('.ex3-button');
    buttonelm.textContent = 'Show Exercises';
    buttonelm.setAttribute('onclick', 'ex3.ShowExercise()');
  }

  //load everything when page is loaded
  Display() {
    cart.Display(); RPS.Display();
  }
}
let ex3 = new DOM;
let cart = null;
let RPS = null;