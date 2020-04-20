const makeBoard = ( table ) => {
  tableSetup = [];
  for( let i = 1; i <= 10; i++ ) {
        tableSetup.push( { value: i, table: table } );
  }
  return tableSetup;
}

const createPlayBoard = () => {
  playBoard.innerHTML = `
        <section class="board flex">
              <div class="play play--value"><p></p></div>
              <div class="play play--times"><p>x</p></div>
              <div class="play play--table"><p></p></div>
        </section>
        <section class="answer">
              <form>
                    <label for="answer">Type het antwoord</label>
                    <input class="answer--input" type="number" name="answer" />
                    <button class="btn answer--submit" hidden></button>
              </form>
        </section>
  `
}

const submit = () => {
  startGame = document.querySelector( '.tables' );
  let submitPlay = document.querySelector( '.btn--submit' );
  submitPlay.addEventListener( 'click', () => {
        play = makeBoard( parseInt( startGame.value ) );
        content( 0, play );
        input.focus();
        message.classList.remove( 'visible' );
        playBoard.classList.add( 'visible' );
  });
}

const createChoice = async ( play, failCount = 2 ) => {
  let choose = document.querySelector( '.message' );

  const choice = () => {
        arr = [];

        tableSetup.forEach( table => {
              let option = `<option>${ table.value }</option>`
              arr.push( option );
        });
        
        return arr.join( '');
  };

  if( play === "start" ) {
        choose.innerHTML = `
              <section class="message--block choose">
                    <h1>Table Game!</h1>
                    <p>Choose the table:</p>
                    <select class="tables">
                          ${ choice() }
                    </select>
                    <a class="btn--submit">Submit</a>
              </section>
        `

  } else {
        choose.innerHTML = await `
              <section class="message--block complete">
                    <h1>Congratulations!</h1>
                    <p>You finished it with <span class="count">${ failCount }</span> fails!</p>
                    <p>Which table you want to play now?</p>
                    <select class="tables">
                          ${ choice() }
                    </select>
                    <a class="btn--submit">Submit</a>
              </section>
        `
        let failCountColor = document.querySelector( '.message--block.complete .count' );

        if ( failCount === 0 ) {
              failCountColor.style.color = '#79D952';
        } else if ( failCount > 0 && failCount < 3 ) {
              failCountColor.style.color = '#f5c76b';
        } else {
              failCountColor.style.color = '#F56B6B';
        }
        submit();
  }
  
};

const content = ( i = 0, play = tableSetup ) => {
  valueToTen.textContent = play[ i ].value;
  tableOfNumber.textContent = play[ 0 ].table;
  input.style.borderColor = '#333';

  return outcome = valueToTen.textContent * tableOfNumber.textContent;
};

const form = () => {
  let countFails = 0;
  const form = document.querySelector( 'form' );
  form.addEventListener( 'submit', ( e ) => {
        e.preventDefault();
        
        
        if( parseInt( valueToTen.textContent ) === parseInt( play.length ) && parseInt( input.value ) === outcome ) {
              createChoice(  "win", countFails );
              message.classList.add( 'visible' );
              playBoard.classList.remove( 'visible' );
              input.value = '';
              i = 0;
              countFails = 0;
        } else if ( parseInt( input.value ) === outcome && valueToTen.textContent !== parseInt( play.length ) ) {
              input.style.borderColor = '#79D952';
              setTimeout( () => { 
                    input.value = '';
                    i++;

                    content( i );
              }, 500 );
        } else {
              input.style.borderColor = '#F56B6B';
              countFails += 1;
              setTimeout( () => { 
                    input.value = '';

                    content( i );
              }, 500 );
        }
        return;
  });
}


let playBoard = document.querySelector( '.play-board' );
createPlayBoard();

const valueToTen = document.querySelector( '.play--value p' );
const tableOfNumber = document.querySelector( '.play--table p' );
let outcome;

let input = document.querySelector( '.answer--input' );
input.focus();
let i = 0;
let play = makeBoard( 1 );

createChoice( "start" );
content( i );

let startGame = document.querySelector( '.tables' );
const message = document.querySelector( '.message' );
message.classList.add( 'visible' );

form();
submit();