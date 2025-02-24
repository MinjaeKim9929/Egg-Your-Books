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

addLogBtn.addEventListener('click', () => {
	const log = {
		book: bookInput.value,
		author: authorInput.value,
		rate: getSelectedRating(),
	};
	if (log.book && log.author) {
		const li = document.createElement('li');
		li.textContent = `${log.book} by ${log.author} - ${log.rate} eggs`;
		bookList.appendChild(li);
		bookInput.value = '';
		authorInput.value = '';
		setSelectedRating(0);
	}
});

document.addEventListener('DOMContentLoaded', (event) => {
	const bookInput = document.getElementById('bookInput');
	const authorInput = document.getElementById('authorInput');
	const rate = getSelectedRating();
	const bookList = document.getElementById('book-list');
	const addLogBtn = document.getElementById('addLogBtn');

	if (addLogBtn) {
		addLogBtn.addEventListener('click', () => {
			const log = {
				book: bookInput.value,
				author: authorInput.value,
				rate: getSelectedRating(),
			};
			if (log.book && log.author) {
				const li = document.createElement('li');
				li.textContent = `${log.book} by ${log.author} - ${log.rate} eggs`;
				bookList.appendChild(li);
				bookInput.value = '';
				authorInput.value = '';
				setSelectedRating(0);
			}
		});
	}
});
