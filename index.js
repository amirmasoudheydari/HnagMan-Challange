class Hangman {
  constructor() {
    this.createAlphabet();
    this.createWord()
    timerBtn.onclick = () => {
      this.timer()
      this.activeBtn()
      this.handelClick()
    }
  }

  // Construction and adding number to DOM
  createAlphabet() {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    alphabet.forEach(item => {
      let input = document.createElement('input');

      input.classList.add('alphabet');
      input.setAttribute('type', 'button')
      input.setAttribute('disabled', '')
      input.value = item.toUpperCase();
      resultNumber.appendChild(input);
    })

  }

  // counter game
  timer() {
    let timer = 599
    setInterval(function () {
      let display = document.getElementById('timerResoult')
      let minutes;
      let seconds;

      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        // Error printing error
        gameOverWrong.classList.remove('disable')

        // reset page
        setTimeout(() => {
          window.location.reload();
        }, 2000)

      }
    }, 1000);
  }

  // Activate the buttons after clicking
  activeBtn() {
    let alphabets = document.querySelectorAll('.alphabet')
    alphabets.forEach(element => {
      element.removeAttribute('disabled')
    });
  }

  // Create words and word-for-word values that we have to guess
  createWord() {
    this.words = ['game','scrawl', 'nad', 'stabel', 'mors', 'words', 'alone', 'list', 'score', 'both', 'cheat', 'prague'];
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.sword = (this.word.toUpperCase()).split('')
    correct.innerText = ''
    console.log(this.sword);

    for (let i = 0; i < this.word.length; i++) {
      correct.innerText += '-'
    }

    this.display = (correct.innerText).split('');
  }


  handelClick() {
    let item = document.querySelectorAll('.alphabet')
    item.forEach(e => {

      e.onclick = (event) => {
        this.letter = event.target.value;

        if (this.sword.includes(this.letter)) {
          let index = this.sword.indexOf(this.letter)
          this.displayResult()

          this.sword.splice(index, 1)
          
          if(this.sword.length == 0){
            this.createWord()
          }
        } 
        else
         {

          wrong.innerText += this.letter
          let num = wrong.innerText.length


          // handel wrong 
          if (num <= 10) {
            wrongImg.setAttribute('src', `./images/hm${num}.gif`)
          }
           else 
          {
            // Error printing error
            gameOverWrong.classList.remove('disable')

            // reset page
            setTimeout(() => {
              window.location.reload();
            }, 2000)
          }
        }
      }

    });
  }
  // Display output on page
  displayResult(){

    let index = (this.word.toUpperCase()).indexOf(this.letter)
    this.display[index] = this.letter;
    let litt = this.display.join("")
    console.log(litt);
    correct.innerText = this.display.join("")
    
  }

}

let hangman = new Hangman;