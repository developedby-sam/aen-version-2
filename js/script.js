import { youtube_parser, numberIncreamentAnimation } from "./utility.js";

const controller = new ScrollMagic.Controller();

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

// Implementing increasing number animation for aen numbers
const benefic = document.querySelector("#beneficiaries");
const countries = document.querySelector("#countries");
const members = document.querySelector("#members");
// function
function startNumberAnimation() {
	numberIncreamentAnimation(benefic, 0, 2500, 5, 3000);
	numberIncreamentAnimation(countries, 0, 11, 1, 3000);
	numberIncreamentAnimation(members, 0, 150, 1, 3000);
}

// SCROLL MAGIC CODES
const numbersScene = new ScrollMagic.Scene({
	triggerElement: ".aen-at-glance__numbers",
	triggerHook: 0.8,
	reverse: false,
})
	// .addIndicators({ colorStart: "white", colorTrigger: "white" })
	.on("start", startNumberAnimation)
	.addTo(controller);

// ////////////////////////////////
// Test codes
// document.body.addEventListener("wheel", (e) => {
// 	window.scrollTo({
// 		top: window.pageYOffset + event.deltaY * 10,
// 		left: 0,
// 		behavior: "smooth",
// 	});
// });
