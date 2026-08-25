/* =========================================
   MY LITTLE ROOM
   ROOM ENGINE
========================================= */


/* ---------- FURNITURE DATA ---------- */

const furniture = {

    beds: [

        {
            name: "Pink Bed",
            emoji: "🛏️"
        },

        {
            name: "Cute Bed",
            emoji: "🛏️"
        },

        {
            name: "Cozy Bed",
            emoji: "🛌"
        }

    ],


    desks: [

        {
            name: "Desk",
            emoji: "🖥️"
        },

        {
            name: "Cute Desk",
            emoji: "💻"
        }

    ],


    chairs: [

        {
            name: "Chair",
            emoji: "🪑"
        },

        {
            name: "Cute Chair",
            emoji: "💺"
        }

    ],


    sofas: [

        {
            name: "Sofa",
            emoji: "🛋️"
        }

    ],


    dressers: [

        {
            name: "Dresser",
            emoji: "🗄️"
        }

    ],


    shelves: [

        {
            name: "Bookshelf",
            emoji: "📚"
        }

    ],


    tables: [

        {
            name: "Table",
            emoji: "🪴"
        }

    ],


    nightstands: [

        {
            name: "Nightstand",
            emoji: "🗃️"
        }

    ],


    plants: [

        {
            name: "Plant",
            emoji: "🪴"
        },

        {
            name: "Flower",
            emoji: "🌸"
        },

        {
            name: "Small Plant",
            emoji: "🌱"
        }

    ],


    plushies: [

        {
            name: "Teddy Bear",
            emoji: "🧸"
        },

        {
            name: "Bunny",
            emoji: "🐰"
        }

    ],


    lamps: [

        {
            name: "Lamp",
            emoji: "💡"
        }

    ],


    rugs: [

        {
            name: "Pink Rug",
            emoji: "🧶"
        }

    ],


    wall: [

        {
            name: "Picture",
            emoji: "🖼️"
        },

        {
            name: "Heart Decor",
            emoji: "💗"
        }

    ]

};


/* ---------- STATE ---------- */

let selectedItem = null;

let highestZ = 10;


/* ---------- DOM ---------- */

const room =
    document.getElementById("room");

const roomItems =
    document.getElementById(
        "room-items"
    );

const itemList =
    document.getElementById(
        "item-list"
    );

const controls =
    document.getElementById(
        "item-controls"
    );

const selectedName =
    document.querySelector(
        ".selected-name"
    );

const status =
    document.getElementById(
        "room-status"
    );


/* ---------- LOAD CATEGORY ---------- */

function showCategory(category) {

    itemList.innerHTML = "";


    const items =
        furniture[category] || [];


    items.forEach(item => {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "item-button";


        button.innerHTML = `

            <span class="item-preview">
                ${item.emoji}
            </span>

            <span class="item-name">
                ${item.name}
            </span>

        `;


        button.addEventListener(
            "click",
            () => addItem(item)
        );


        itemList.appendChild(
            button
        );

    });

}


/* ---------- ADD ITEM ---------- */

function addItem(data) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "room-item";


    item.textContent =
        data.emoji;


    item.dataset.name =
        data.name;


    item.style.left =
        "40%";


    item.style.top =
        "40%";


    item.style.zIndex =
        ++highestZ;


    roomItems.appendChild(
        item
    );


    makeDraggable(item);

    selectItem(item);


    status.textContent =
        `${data.name} added ♡`;

}


/* ---------- SELECT ITEM ---------- */

function selectItem(item) {

    if (selectedItem) {

        selectedItem.classList.remove(
            "selected"
        );

    }


    selectedItem = item;


    item.classList.add(
        "selected"
    );


    controls.classList.remove(
        "hidden"
    );


    selectedName.textContent =
        item.dataset.name;


    status.textContent =
        `${item.dataset.name} selected ♡`;

}


/* ---------- DRAGGING ---------- */

function makeDraggable(item) {

    let dragging = false;

    let offsetX = 0;

    let offsetY = 0;


    item.addEventListener(
        "mousedown",
        startDrag
    );


    function startDrag(event) {

        event.preventDefault();

        selectItem(item);

        dragging = true;


        const rect =
            item.getBoundingClientRect();


        offsetX =
            event.clientX -
            rect.left;


        offsetY =
            event.clientY -
            rect.top;


        item.style.zIndex =
            ++highestZ;

    }


    document.addEventListener(
        "mousemove",
        event => {

            if (!dragging) return;


            const roomRect =
                room.getBoundingClientRect();


            let x =
                event.clientX -
                roomRect.left -
                offsetX;


            let y =
                event.clientY -
                roomRect.top -
                offsetY;


            x = Math.max(
                0,
                Math.min(
                    x,
                    roomRect.width - 110
                )
            );


            y = Math.max(
                0,
                Math.min(
                    y,
                    roomRect.height - 110
                )
            );


            item.style.left =
                x + "px";


            item.style.top =
                y + "px";

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            dragging = false;

        }
    );

}


/* ---------- ROTATION ---------- */

function rotateItem(amount) {

    if (!selectedItem) return;


    let rotation =
        Number(
            selectedItem.dataset.rotation
        ) || 0;


    rotation += amount;


    selectedItem.dataset.rotation =
        rotation;


    updateTransform();

}


/* ---------- SCALE ---------- */

function scaleItem(amount) {

    if (!selectedItem) return;


    let scale =
        Number(
            selectedItem.dataset.scale
        ) || 1;


    scale += amount;


    scale = Math.max(
        .5,
        Math.min(
            2,
            scale
        )
    );


    selectedItem.dataset.scale =
        scale;


    updateTransform();

}


/* ---------- TRANSFORM ---------- */

function updateTransform() {

    if (!selectedItem) return;


    const rotation =
        selectedItem.dataset.rotation || 0;


    const scale =
        selectedItem.dataset.scale || 1;


    selectedItem.style.transform =

        `rotate(${rotation}deg)
         scale(${scale})`;

}


/* ---------- DELETE ---------- */

function deleteSelected() {

    if (!selectedItem) return;


    const name =
        selectedItem.dataset.name;


    selectedItem.remove();


    selectedItem = null;


    controls.classList.add(
        "hidden"
    );


    status.textContent =
        `${name} removed ♡`;

}


/* ---------- LAYERS ---------- */

function moveFront() {

    if (!selectedItem) return;


    selectedItem.style.zIndex =
        ++highestZ;

}


function moveBack() {

    if (!selectedItem) return;


    selectedItem.style.zIndex =
        1;

}


/* ---------- THEMES ---------- */

function changeTheme(theme) {

    const themes = [

        "pink",
        "kawaii",
        "cottage",
        "fairy",
        "y2k",
        "gothic",
        "cozy",
        "academia",
        "minimal",
        "garden"

    ];


    themes.forEach(name => {

        room.classList.remove(
            `room-${name}`
        );

    });


    room.classList.add(
        `room-${theme}`
    );


    document
        .querySelectorAll(
            ".theme-button"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );

        });


    status.textContent =
        `${theme} theme selected ♡`;

}


/* ---------- CATEGORY BUTTONS ---------- */

document
    .querySelectorAll(
        ".category-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".category-button"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                showCategory(
                    button.dataset.category
                );

            }
        );

    });


/* ---------- THEME BUTTONS ---------- */

document
    .querySelectorAll(
        ".theme-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                changeTheme(
                    button.dataset.theme
                );

            }
        );

    });


/* ---------- CONTROLS ---------- */

document
    .getElementById("rotate-left")
    .addEventListener(
        "click",
        () => rotateItem(-15)
    );


document
    .getElementById("rotate-right")
    .addEventListener(
        "click",
        () => rotateItem(15)
    );


document
    .getElementById("make-smaller")
    .addEventListener(
        "click",
        () => scaleItem(-.1)
    );


document
    .getElementById("make-bigger")
    .addEventListener(
        "click",
        () => scaleItem(.1)
    );


document
    .getElementById("delete-item")
    .addEventListener(
        "click",
        deleteSelected
    );


document
    .getElementById("move-front")
    .addEventListener(
        "click",
        moveFront
    );


document
    .getElementById("move-back")
    .addEventListener(
        "click",
        moveBack
    );


/* ---------- CLEAR ---------- */

document
    .getElementById("clear-room")
    .addEventListener(
        "click",
        () => {

            roomItems.innerHTML = "";

            selectedItem = null;

            controls.classList.add(
                "hidden"
            );

            status.textContent =
                "Room cleared ♡";

        }
    );


/* ---------- SAVE ---------- */

document
    .getElementById("save-room")
    .addEventListener(
        "click",
        () => {

            const items = [];

            document
                .querySelectorAll(
                    ".room-item"
                )
                .forEach(item => {

                    items.push({

                        name:
                            item.dataset.name,

                        emoji:
                            item.textContent,

                        left:
                            item.style.left,

                        top:
                            item.style.top,

                        zIndex:
                            item.style.zIndex,

                        rotation:
                            item.dataset.rotation || 0,

                        scale:
                            item.dataset.scale || 1

                    });

                });


            localStorage.setItem(
                "ellieRoom",
                JSON.stringify(items)
            );


            status.textContent =
                "Room saved ♡";

        }
    );


/* ---------- START ---------- */

showCategory("beds");
