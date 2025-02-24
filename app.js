const eggs = document.querySelectorAll('.egg');

eggs.forEach((egg) => {
	egg.addEventListener('mouseover', () => {
		let rating = parseInt(egg.getAttribute('data-value'));
		updateEggs(rating);
	});

	egg.addEventListener('mouseout', () => {
		updateEggs(getSelectedRating());
	});
	egg.addEventListener('click', () => {
		let rating = parseInt(egg.getAttribute('data-value'));
		setSelectedRating(rating);
	});
});

let selectedRating = 0;

function updateEggs(rating) {
	eggs.forEach((egg) => {
		if (parseInt(egg.getAttribute('data-value')) <= rating) {
			egg.src = './assets/icons/fried-egg-128.png';
		} else {
			egg.src = './assets/icons/egg-128.png';
		}
	});
}

function setSelectedRating(rating) {
	selectedRating = rating;
	eggs.forEach((egg) => {
		if (parseInt(egg.getAttribute('data-value')) <= selectedRating) {
			egg.src = './assets/icons/fried-egg-128.png';
		} else {
			egg.src = './assets/icons/egg-128.png';
		}
	});
}

function getSelectedRating() {
	return selectedRating;
}

const bookInput = document.getElementById('bookInput');
const authorInput = document.getElementById('authorInput');
const rate = getSelectedRating();
const bookList = document.getElementById('book-list');
const addLogBtn = document.getElementById('addLogBtn');

addLogBtn.addEventListener('click', () => {
	const log = {
		book: bookInput,
		author: authorInput,
		rate: rate,
	};
	if (log) {
		const li = document.createElement('li');
		li.textContent = `${log.book} ${log.author} ${log.rate}`;
		bookList.appendChild(li);
		bookInput = '';
		authorInput = '';
	}
});
