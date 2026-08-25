/* =========================================
   ELLIE'S LITTLE CORNER
   MAIN JAVASCRIPT
========================================= */


/* ---------- CLOCK ---------- */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

}


setInterval(
    updateClock,
    1000
);

updateClock();



/* ---------- DATE ---------- */

function updateDate() {

    const date =
        document.getElementById("date");

    if (!date) return;

    const today =
        new Date();

    date.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

}


updateDate();



/* ---------- FLOWER FACTS ---------- */

const flowerFacts = [

    "Sunflowers can follow the sun while they are young. 🌻",

    "Vanilla comes from an orchid. 🌸",

    "Roses belong to the same plant family as apples and strawberries. 🌹",

    "Some flowers have ultraviolet patterns that insects can see but humans cannot. 🦋",

    "Some flowers only open at night. 🌙",

    "Lotus flowers can help regulate the temperature of their blossoms. 🌷",

    "Some flowers use scent to attract specific pollinators. 🌺",

    "Cherry blossoms are strongly associated with spring and renewal in Japan. 🌸",

    "Lavender has been grown and used for its fragrance for centuries. 💜",

    "Some flowers close their petals at night and open again during the day. 🌼"

];


function newFlowerFact() {

    const fact =
        flowerFacts[
            Math.floor(
                Math.random() *
                flowerFacts.length
            )
        ];


    const small =
        document.getElementById(
            "flower-fact"
        );


    const large =
        document.getElementById(
            "large-flower-fact"
        );


    if (small) {

        small.textContent =
            fact;

    }


    if (large) {

        large.textContent =
            fact;

    }

}



/* ---------- WELCOME ---------- */

function showWelcome() {

    alert(
        "🌸 Welcome to Ellie's Little Corner! ♡"
    );

}



/* ---------- DAY / NIGHT ---------- */

const themeButton =
    document.getElementById(
        "theme-toggle"
    );


function loadTheme() {

    const saved =
        localStorage.getItem(
            "ellieTheme"
        );


    if (saved === "night") {

        document.body.classList.add(
            "night"
        );

        if (themeButton) {

            themeButton.textContent =
                "☀️";

        }

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "night"
    );


    const night =
        document.body.classList.contains(
            "night"
        );


    localStorage.setItem(
        "ellieTheme",
        night
            ? "night"
            : "day"
    );


    if (themeButton) {

        themeButton.textContent =
            night
                ? "☀️"
                : "🌙";

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}


loadTheme();



/* ---------- FLOATING FLOWERS ---------- */

function createFlower() {

    const container =
        document.getElementById(
            "flower-container"
        );

    if (!container) return;


    const flower =
        document.createElement(
            "div"
        );


    const flowers = [
        "🌸",
        "🌷",
        "🌼",
        "🌺",
        "✿",
        "❀"
    ];


    flower.className =
        "floating-flower";


    flower.textContent =
        flowers[
            Math.floor(
                Math.random() *
                flowers.length
            )
        ];


    flower.style.left =
        Math.random() * 100 + "%";


    flower.style.fontSize =
        14 +
        Math.random() * 18 +
        "px";


    flower.style.animationDuration =
        7 +
        Math.random() * 6 +
        "s";


    container.appendChild(
        flower
    );


    setTimeout(
        () => flower.remove(),
        14000
    );

}


setInterval(
    createFlower,
    1800
);
