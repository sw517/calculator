window.onload = function() {
	addBtnListeners();	
}

const addBtnListeners  = () => {
	const calcInput = document.getElementById('input');

	// Add text values to input
	const btns = document.querySelectorAll('.num, .operator');
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', function() {
			const val = this.textContent;

			// don't allow operators to be added if input is empty
			if (!calcInput.innerHTML && btns[i].classList.contains('operator')) {
				return;
			} else {
				calcInput.innerHTML += val;
			}
		});
	}

	// Reset Calculator on AC click
	document.getElementById('cancel').addEventListener('click', function() {
		calcInput.textContent = '';
	});
}