import { youtube_parser } from "./utility.js";

// Implementin Astronomy Picture of the Day from NASA's API
const auth = "T7Z6BYNlOOApYYAp4PD2ERaw1h6pCtuzt8lmI7dO";
const apodContainer = document.querySelector(".apod__container");
const apodText = document.querySelector(".apod__text");

async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: "GET",
		headers: {
			Accepts: "application/json",
			Authorization: auth,
		},
	});

	const data = await dataFetch.json();
	return data;
}

function generatePicture(data) {
	if (data.media_type === "image") {
		apodContainer.innerHTML = `
			<img class='apod__container--media' src=${data.url} alt=${data.title}></img>
		`;
		apodText.innerHTML = `
			<h3>Astronomy Picture of the Day</h3>
			<p> ${data.explanation} </p>
		`;
	} else if (data.media_type === "video") {
		const videoId = youtube_parser(data.url);
		apodContainer.innerHTML = `
			<iframe class='apod__container--media' src=${
				data.url + `&autoplay=1&playlist=${videoId}&loop=1`
			} width="100%" height="500" allowfullscreen allow="autoplay" >
				<p>
					<a href=${data.url}>
						Fallback link for browsers that don't support iframes
					</a>
				</p>
			</iframe>
			`;
		apodText.innerHTML = `
				<h3> Astronomy Picture of the Day </h3>
				<p>${data.explanation}</p>
			`;
	}
	apodText.style.height = "auto";
}

async function loadAPOD() {
	const data = await fetchApi(
		`https://api.nasa.gov/planetary/apod?api_key=${auth}`
	);
	generatePicture(data);
}

loadAPOD();
