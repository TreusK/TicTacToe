'use strict'

// Grab DOM elements
let gameContainer = document.querySelector('#gameBoardContainer');
let squares = document.querySelectorAll('.gameSquare');
let overlay = document.querySelector('#overlay');
let winMessage = document.querySelector('#winmessage');
let noName = document.querySelector('#noNameWarning');
let sameName = document.querySelector('#sameNameWarning');

let p1 = document.querySelector('#inputPlayer1');
let p2 = document.querySelector('#inputPlayer2');

let winButton = document.querySelector('#winButton');
let startButton = document.querySelector('#startButton');


// Game board module 
let gameBoard = (function(id, toggle) {
	let arr = 
		['', '', '',
		 '', '', '',
		 '', '', ''];
		 
	function display() {
		for (let i=0; i<9; i++) {
			squares[i].innerText = arr[i];
		};
	};	 
	
	function changeArr(id, toggle) {
		arr[id] = play.player(toggle);
	};
	
	function analyzeBoard(winCondition) {
		let win = false;
		
		//check rows, then columns, then diagonals
		if (checkRow(arr) || checkCol(arr) || checkDiag(arr)) {
			win = true;
		}
		
		if (win == true) {
			(play.player(turn) == 'X') ? winMessage.innerText = playerOne.name + ' wins!' : winMessage.innerText = playerTwo.name + ' wins!';
			overlay.classList.remove('hide');
		} else {
			if (arr.indexOf('') == -1) {
				winMessage.innerText = 'It\'s a tie!';
				overlay.classList.remove('hide');
			}
		}
    };
	
	function checkRow(a) {
		for (let i=0; i<3; i++) {
			if (a[i*3] != '' && a[i*3] == a[i*3+1] && a[i*3+1] == a[i*3+2]) {
				return true;
			};
		};
	};
	
	function checkCol(a) {
		for (let i=0; i<3; i++) {
			if (a[i] != '' && a[i] == a[1*3+i] && a[1*3+i] == a[2*3+i]) {
				return true;
			};
		};
	};
	
	function checkDiag(a) {
		if ((a[0] != '' && arr[0] == arr[4] && arr[4] == arr[8]) || (a[2] != '' && arr[2] == arr[4] && arr[4] == arr[6])) {
			return true;
		};
	};
	
	return {arr, display, changeArr, analyzeBoard};
})();


// Player factory
function Player(symbol, name) {
	
	return {symbol, name};
}

// General game module
let play = (function(toggle) {
	function player(toggle) {
		if (toggle) {
			return playerOne.symbol;
		} else {
			return playerTwo.symbol;
		}
	};
	
	function resetAll() {
		gameBoard.arr.splice(0);
		let i=0; 
		while (i<9) {
			gameBoard.arr.push('');
			i++;
		};
		overlay.classList.add('hide');
		turn = false;
		gameBoard.display();
	};
	
	return {player, resetAll};
})();



let playerOne;
let playerTwo;

// Events
// ---Tiles click event
let turn = false;

for (let elem of squares) {
	elem.addEventListener('click', function() {
		if (elem.innerText == '') {
			let id = elem.id.slice(6);
			turn = !turn;
			(turn) ? elem.style.color = '#F13D36' : elem.style.color = '#47A5CB';
			gameBoard.changeArr(id, turn);
			gameBoard.display();
			gameBoard.analyzeBoard();
		};
	});
};


// ---Win button new game event
winButton.addEventListener('click', play.resetAll);

// ---Start button new game event
startButton.addEventListener('click', function() {
	if (p1.value == '' || p2.value == '') {
		sameName.classList.add('hide');
		noName.classList.remove('hide');
	} else if (p1.value == p2.value){
		noName.classList.add('hide');
		sameName.classList.remove('hide');
	} else {
		noName.classList.add('hide');
		sameName.classList.add('hide');
		play.resetAll();
		// Create players
		playerOne = Player('X', p1.value);
		playerTwo = Player('O', p2.value);
		gameContainer.classList.remove('visibility');
	};
});
































