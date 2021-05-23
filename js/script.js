import {
	youtube_parser,
	numberIncreamentAnimation,
	setLocalStorage,
	getLocalStorage,
} from "./utility.js";

// element selectors
const apodContainer = document.querySelector(".apod__container");
const apodText = document.querySelector(".apod__text");
const benefic = document.querySelector("#beneficiaries");
const countries = document.querySelector("#countries");
const members = document.querySelector("#members");
const nav = document.querySelector(".navigation");

// Intializing Libraries
particlesJS.load("particle-js", "js/particles.json", function () {
	console.log("callback - particles.js config loaded");
});
const controller = new ScrollMagic.Controller();
Scrollbar.initAll();

// gsap-timelines
// reveal-timeline
const revealTimeline = gsap.timeline({
	defaults: { duration: 1, ease: "expo.inOut" },
});

// Implementin Astronomy Picture of the Day from NASA's API
const auth = "T7Z6BYNlOOApYYAp4PD2ERaw1h6pCtuzt8lmI7dO";

async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: "GET",
		headers: {
			Accepts: "application/json",
			Authorization: auth,
		},
	});

	const data = await dataFetch.json();
	setLocalStorage("data", {
		url: data.url,
		explanation: data.explanation,
		media_type: data.media_type,
	});
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
	let data = getLocalStorage("data");
	console.log(data);
	data = await fetchApi(`https://api.nasa.gov/planetary/apod?api_key=${auth}`);
	generatePicture(data);
}

loadAPOD();

// Implementing increasing number animation for aen numbers
// function
function startNumberAnimation() {
	numberIncreamentAnimation(benefic, 0, 2500, 5, 3000);
	numberIncreamentAnimation(countries, 0, 11, 1, 3000);
	numberIncreamentAnimation(members, 0, 150, 1, 3000);
}

// implementing section-reveal animation
const sections = document.querySelectorAll(".section");
let revealScene;
sections.forEach((section) => {
	revealTimeline.fromTo(
		section,
		{ opacity: "0", transform: "translateY(8rem)" },
		{ opacity: "1", transform: "translateY(0rem)" }
	);
	revealScene = new ScrollMagic.Scene({
		triggerElement: section,
		triggerHook: 0.9,
		reverse: false,
	})
		.setTween(revealTimeline)
		.addTo(controller);
});

// scroll-magic
const numbersScene = new ScrollMagic.Scene({
	triggerElement: ".aen-at-glance__numbers",
	triggerHook: 0.8,
	reverse: false,
})
	.on("start", startNumberAnimation)
	.addTo(controller);

const navScene = new ScrollMagic.Scene({
	triggerElement: ".apod",
	triggerHook: 0,
})
	.on("start", () => {
		nav.classList.toggle("shadow-on");
	})
	.addTo(controller);
