import { initializeApp } from 'firebase/app';
import { doc, getDocs, addDoc, updateDoc, getFirestore, collection } from 'firebase/firestore';
import log from 'loglevel';

// Setup Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBv3223D49UTgNIlhbbqzCPfRKSGCO5GuU',
	authDomain: 'egg-your-books.firebaseapp.com',
	projectId: 'egg-your-books',
	storageBucket: 'egg-your-books.firebasestorage.app',
	messagingSenderId: '607247149052',
	appId: '1:607247149052:web:6d6bef135729708d0cf479',
	measurementId: 'G-ERJT4KZ0CE',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Setup Loglevel
log.setLevel('info');
log.info('Application started');
log.debug('Debugging information');
log.error('An error occurred');

// Rating System
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

function initializeAddLogForm() {
	document.getElementById('bookInput').value = '';
	document.getElementById('authorInput').value = '';
	setSelectedRating(0);
}

addLogBtn.addEventListener('click', async () => {
	const log = {
		book: bookInput.value,
		author: authorInput.value,
		rate: getSelectedRating(),
	};
	if (log.book && log.author && log.rate) {
		await addLogToFirestore(log);
		initializeAddLogForm();
	}
});

async function addLogToFirestore(log) {
	await addDoc(collection(db, 'logs'), {
		book: log.book,
		author: log.author,
		rate: log.rate,
	});
}

async function renderLogs() {
	let logs = await getLogsFromFirestore();
	document.getElementById('book-list').innerHTML = '';

	logs.forEach((log, index) => {
		const logItem = document.createElement('li');
		logItem.id = log.id;
		logItem.textContent = `${logItem.data().book} by ${logItem.data().author} - ${logItem.data().rate} eggs`;
		bookList.appendChild(logItem);
	});
}

async function getLogsFromFirestore() {
	let data = await getDocs(collection(db, 'logs'));
	let userData = [];
	data.forEach((doc) => {
		userData.push(doc);
	});
	return userData;
}

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
				rate: rate,
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

// Service worker
const sw = new URL('service-worker.js', import.meta.url);
if ('serviceWorker' in navigator) {
	const s = navigator.serviceWorker;
	s.register(sw.href, {
		scope: '/Egg-Your-Books/',
	})
		.then((_) => console.log('Service Worker Registered for scope:', sw.href, 'with', import.meta.url))
		.catch((err) => console.error('Service Worker Error:', err));
}
