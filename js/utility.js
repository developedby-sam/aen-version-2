// UTILITY FUNCTIONS //
export const youtube_parser = (url) => {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return match && match[7].length == 11 ? match[7] : false;
};

export function numberIncreamentAnimation(
	elem,
	start,
	end,
	increament,
	duration
) {
	const range = end - start;
	let current = start;
	const stepTime = Math.abs(Math.floor(duration / range));
	const animTimer = setInterval(() => {
		current += increament;
		elem.innerText = `${current}+`;
		if (current === end) {
			clearInterval(animTimer);
		}
	}, stepTime);
}

export function setLocalStorage(dataRef, { ...data }) {
	const dataDict = {
		...data,
	};

	localStorage.setItem(dataRef, JSON.stringify(dataDict));
}

export function getLocalStorage(dataRef) {
	return JSON.parse(localStorage.getItem(dataRef));
}
