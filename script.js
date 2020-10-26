let count
let savebox
let leveldata
let checknumber
let rar0 = 0
let rar1 = 0
let rar2 = 0
let rar3 = 0

async function getjson(a1) {
    try {
        let data = await fetch([a1] + ".json");
        let result = await data.json();
        return result;
    } catch (e) {
        console.error(e);
    }
}

function htmldombuilder(a1, a2, a3, a4) {
    let a = document.createElement(a1);
    if (a2 != undefined) {
        a.className = a2;
    }
    //a.draggable = false;
    if (a1 == "img") {
        a.alt = ""
    }
    if (a3 != undefined) {
        if (a3.style != undefined) {
            for (let i = 0; i < Object.entries(a3.style).length; i++) {
                a.style[Object.entries(a3.style)[i][0]] = a3.style[Object.entries(a3.style)[i][0]];
            }
        }
        if (a3.addon != undefined) {
            for (let i = 0; i < Object.entries(a3.addon).length; i++) {
                if (Object.entries(a3.addon)[i][0] == "text") {
                    let ttext = tiertext(a3.addon[Object.entries(a3.addon)[i][0]]);
                    a.innerHTML = ttext
                }
                if (Object.entries(a3.addon)[i][0] == "innerHTML") {
                    a.innerHTML = a3.addon[Object.entries(a3.addon)[i][0]]
                }
                if (Object.entries(a3.addon)[i][0] == "innerText") {
                    a.innerText = a3.addon[Object.entries(a3.addon)[i][0]]
                }
                if (Object.entries(a3.addon)[i][0] == "src") {
                    a.src = a3.addon[Object.entries(a3.addon)[i][0]]
                }
                if (Object.entries(a3.addon)[i][0] == "href") {
                    a.href = a3.addon[Object.entries(a3.addon)[i][0]]
                    a.target = "_blank"
                    a.rel = "noopener"
                    a.ariaLabel = a2
                }
                if (Object.entries(a3.addon)[i][0] == "id") {
                    a.id = a3.addon[Object.entries(a3.addon)[i][0]]
                }
                if (Object.entries(a3.addon)[i][0] == "dataCloseButton") {
                    a.setAttribute("data-close-button", "")
                }
                if (Object.entries(a3.addon)[i][0] == "type") {
                    a.setAttribute("type", a3.addon[Object.entries(a3.addon)[i][0]])
                }
            }
        }
    }
    if (a4 != undefined) {
        a4.appendChild(a)
    } else {
        maincont.appendChild(a)
    }
}

window.onload = async function () {
    document.querySelectorAll('.diffbutton').forEach(btn => btn.addEventListener("click", changediff, false));

    leveldata = await getjson("leveldata");
    buildcounterhtml()
    document.querySelectorAll("[id^='clear']")
        .forEach(btn => btn.addEventListener("click", clearcookie, false));
    let openLevelButtons = document.querySelectorAll('[data-level-target]')
    let closeLevelButtons = document.querySelectorAll('[data-close-button]')
    savebox = document.getElementById("save")
    document.querySelectorAll(".counterbuttons")
        .forEach(btn => btn.addEventListener("click", add, false));

    openLevelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = document.querySelector(button.dataset.levelTarget)
            openLevel(level)
        })
    })

    closeLevelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.closest('.levelpop')
            closeLevel(level)
        })
    })
}

function changediff() {
    if (this.src.includes("normal")) {
        this.src = "./assets/misc/hard.png"
        document.querySelectorAll('.levelbutton').forEach((e) => {
            if (e.classList.contains("normal")) {
                e.classList.remove("normal")
                e.classList.add("hard")
                e.setAttribute("data-level-target", e.getAttribute("data-level-target") + "-hard")
            }
        })
    } else if (this.src.includes("hard")) {
        this.src = "./assets/misc/normal.png"
        document.querySelectorAll('.levelbutton').forEach((e) => {
            if (e.classList.contains("hard")) {
                e.classList.remove("hard")
                e.classList.add("normal")
                e.setAttribute("data-level-target", e.getAttribute("data-level-target").replace("-hard", ""))
            }
        })
    }
}

function buildcounterhtml() {
    document.querySelectorAll(".levelpop").forEach((e) => {
        let difficulty
        let levelid
        let worldnumber
        let worldlevel
        if (!e.id.includes("hard")) {
            levelid = e.id.split("-")
            worldnumber = levelid[0].split("w")
            worldlevel = levelid[1].split("l")
            difficulty = "normal"
        } else {
            levelid = e.id.split("-")
            worldnumber = levelid[0].split("w")
            worldlevel = levelid[1].split("l")
            if (leveldata[levelid[0]].hasOwnProperty("hard")) {
                difficulty = levelid[2]
            } else {
                difficulty = "normal"
            }
        }
        htmldombuilder("div", "levelpop-header", undefined, document.getElementById(e.id))
        htmldombuilder("div", "levelpop-titlebox", undefined, document.getElementById(e.id).getElementsByClassName("levelpop-header")[0])
        htmldombuilder("div", "levelpop-titlebg", undefined, document.getElementById(e.id).getElementsByClassName("levelpop-titlebox")[0])
        htmldombuilder("button", "clear-" + e.id, {
            addon: {
                id: "clear",
                innerHTML: "Clear",
                type: "button3"
            }
        }, document.getElementById(e.id).getElementsByClassName("levelpop-titlebox")[0])
        htmldombuilder("div", "levelpop-title", {
            addon: {
                innerHTML: `${worldnumber[1] + "-" + worldlevel[1]} Drop Counter`
            }
        }, document.getElementById(e.id).getElementsByClassName("levelpop-titlebg")[0])
        htmldombuilder("button", "close-button", {
            addon: {
                innerHTML: "×",
                dataCloseButton: ""
            }
        }, document.getElementById(e.id).getElementsByClassName("levelpop-header")[0])
        htmldombuilder("div", "levelpop-body", undefined, document.getElementById(e.id))
        htmldombuilder("table", undefined, {
            style: {
                maxHeight: "555px",
                maxWidth: "960px"
            }
        }, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0])
        htmldombuilder("tbody", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild)
        leveldata[levelid[0]][difficulty][levelid[1]].forEach((ship) => {
            if (ship.rarity == "0") {
                rar0++
            }
            if (ship.rarity == "1") {
                rar1++
            }
            if (ship.rarity == "2") {
                rar2++
            }
            if (ship.rarity == "3") {
                rar3++
            }
        })
        createtable(rar0, rar1, rar2, rar3, e)
        let tablelist = document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].querySelector("table").querySelector("tbody").querySelectorAll("tr")
        let sortid = 0
        let rarity0 = 0
        let rarity1 = 0
        let rarity2 = 0
        let almainget
        leveldata[levelid[0]][difficulty][levelid[1]].forEach((ship, index) => {
            if (ship.rarity == "0" || ship.rarity == "1") {
                rarity0++
                if (rarity0 <= 10) {
                    sortid = 0
                } else if (rarity0 > 10 && rarity0 <= 20) {
                    sortid = 2
                }
                htmldombuilder("div", "almain", undefined, tablelist[sortid].querySelector("td"))
                almainget = document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].querySelectorAll(".almain")
                if (ship.rarity == "0") {
                    htmldombuilder("div", "alhoverbox rarity-5", undefined, almainget[almainget.length - 1])
                }
                if (ship.rarity == "1") {
                    htmldombuilder("div", "alhoverbox rarity-4", undefined, almainget[almainget.length - 1])
                }
                if (ship.bossonly != undefined) {
                    htmldombuilder("div", "albosstext", {
                        addon: {
                            innerHTML: `Boss only`
                        }
                    }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                }
                htmldombuilder("img", undefined, {
                    addon: {
                        src: ship.thumbnail
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                htmldombuilder("div", "alhoverboxmain", undefined, almainget[almainget.length - 1])
                htmldombuilder("div", "alhoverboxtext", {
                    addon: {
                        innerHTML: ship.name
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverboxmain")[0])
                htmldombuilder("button", "counterbuttons", {
                    addon: {
                        id: e.id + "-" + index
                    }
                }, tablelist[sortid + 1].querySelector("td"))
            } else if (ship.rarity == "2") {
                rarity1++
                if (rarity0 > 10) {
                    if (rarity1 <= 10) {
                        sortid = 4
                    } else if (rarity1 > 10 && rarity1 <= 20) {
                        sortid = 6
                    }
                } else {
                    if (rarity1 <= 10) {
                        sortid = 2
                    } else if (rarity1 > 10 && rarity1 <= 20) {
                        sortid = 4
                    }
                }
                htmldombuilder("div", "almain", undefined, tablelist[sortid].querySelector("td"))
                almainget = document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].querySelectorAll(".almain")
                htmldombuilder("div", "alhoverbox rarity-3", undefined, almainget[almainget.length - 1])

                if (ship.bossonly != undefined) {
                    htmldombuilder("div", "albosstext", {
                        addon: {
                            innerHTML: `Boss only`
                        }
                    }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                }
                htmldombuilder("img", undefined, {
                    addon: {
                        src: ship.thumbnail
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                htmldombuilder("div", "alhoverboxmain", undefined, almainget[almainget.length - 1])
                htmldombuilder("div", "alhoverboxtext", {
                    addon: {
                        innerHTML: ship.name
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverboxmain")[0])
                htmldombuilder("button", "counterbuttons", {
                    addon: {
                        id: e.id + "-" + index
                    }
                }, tablelist[sortid + 1].querySelector("td"))
            } else if (ship.rarity == "3") {
                rarity2++
                if (rarity1 > 10) {
                    if (rarity2 <= 10) {
                        sortid = 8
                    } else if (rarity2 > 10 && rarity2 <= 20) {
                        sortid = 10
                    }
                } else {
                    if (rarity2 <= 10) {
                        sortid = 4
                    } else if (rarity2 > 10 && rarity2 <= 20) {
                        sortid = 6
                    }
                }
                htmldombuilder("div", "almain", undefined, tablelist[sortid].querySelector("td"))
                almainget = document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].querySelectorAll(".almain")
                htmldombuilder("div", "alhoverbox rarity-2", undefined, almainget[almainget.length - 1])
                if (ship.bossonly != undefined) {
                    htmldombuilder("div", "albosstext", {
                        addon: {
                            innerHTML: `Boss only`
                        }
                    }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                }
                htmldombuilder("img", undefined, {
                    addon: {
                        src: ship.thumbnail
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverbox")[0])
                htmldombuilder("div", "alhoverboxmain", undefined, almainget[almainget.length - 1])
                htmldombuilder("div", "alhoverboxtext", {
                    addon: {
                        innerHTML: ship.name
                    }
                }, almainget[almainget.length - 1].getElementsByClassName("alhoverboxmain")[0])
                htmldombuilder("button", "counterbuttons", {
                    addon: {
                        id: e.id + "-" + index
                    }
                }, tablelist[sortid + 1].querySelector("td"))
            }
        })
    })
}

function createtable(a1, a2, a3, a4, e) {
    for (i = 0; i < Math.ceil((a1 + a2) / "10"); i++) {
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
    }
    for (i = 0; i < Math.ceil(a3 / "10"); i++) {
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
    }
    for (i = 0; i < Math.ceil(a4 / "10"); i++) {
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
        htmldombuilder("tr", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild)
        htmldombuilder("td", undefined, undefined, document.getElementById(e.id).getElementsByClassName("levelpop-body")[0].lastElementChild.lastElementChild.lastElementChild)
    }
}

async function openLevel(level) {
    if (level == null) return
    let cookiesaved = await readcookies(level.id)
    inputsave(cookiesaved, level.id)
    level.classList.add('active')
    overlay.classList.add('active')
}

function closeLevel(level) {
    if (level == null) return
    level.classList.remove('active')
    overlay.classList.remove('active')
}

async function readcookies(a1) {
    let cookieread = Cookies.get('save-' + a1)
    return cookieread
}

async function setcookie(a1, a2) {
    Cookies.set('save-' + a2, a1, {
        expires: 365
    })
}

function clearcookie() {
    let buttonidf = this.classList[0].split("-")
    if (this.classList[0].includes("hard")) {
        if (confirm(`This removes the saved ships for ${buttonidf[1].replace("w", "World ") + " " + buttonidf[2].replace("l", "Level ") + " " + buttonidf[3]} are you sure?`)) {
            count = [];
            let buttonlevel = document.getElementById(buttonidf[1] + "-" + buttonidf[2] + "-" + buttonidf[3]).querySelectorAll(".counterbuttons")
            document.getElementById(buttonidf[1] + "-" + buttonidf[2] + "-" + buttonidf[3]).querySelectorAll(".almain").forEach((e, index) => {
                count.push(0)
            })
            //savebox.value = count
            setcookie(count, buttonidf[1] + "-" + buttonidf[2] + "-" + buttonidf[3])
            count.forEach((e, index) => {
                var button = buttonlevel[index];
                button.innerHTML = e;
            })
        }
    } else {
        if (confirm(`This removes the saved ships for ${buttonidf[1].replace("w", "World ") + " " + buttonidf[2].replace("l", "Level ")} are you sure?`)) {
            count = [];
            let buttonlevel = document.getElementById(buttonidf[1] + "-" + buttonidf[2]).querySelectorAll(".counterbuttons")
            document.getElementById(buttonidf[1] + "-" + buttonidf[2]).querySelectorAll(".almain").forEach((e, index) => {
                count.push(0)
            })
            //savebox.value = count
            setcookie(count, buttonidf[1] + "-" + buttonidf[2])
            count.forEach((e, index) => {
                var button = buttonlevel[index];
                button.innerHTML = e;
            })
        }
    }
}

function inputsave(a1, a2) {
    let buttonlevel = document.getElementById(a2).querySelectorAll(".counterbuttons")
    if (a1 != null || a1 != undefined) {
        count = a1.split(",")
        //savebox.value = count
        count.forEach((e, index) => {
            var button = buttonlevel[index];
            button.innerHTML = e;
        })
    } else {
        count = [];
        document.getElementById(a2).querySelectorAll(".almain").forEach((e, index) => {
            count.push(0)
        })
        //savebox.value = count
        setcookie(count, a2)
        count.forEach((e, index) => {
            var button = buttonlevel[index];
            button.innerHTML = e;
        })
    }
}

function add() {
    let button = this
    let buttonidf = button.id.split("-")
    if (!button.id.includes("hard")) {
        count[buttonidf[2]]++;
        button.innerHTML = count[buttonidf[2]];
        //savebox.value = count
        setcookie(count, buttonidf[0] + "-" + buttonidf[1])
    } else {
        count[buttonidf[3]]++;
        button.innerHTML = count[buttonidf[3]];
        //savebox.value = count
        setcookie(count, buttonidf[0] + "-" + buttonidf[1] + "-" + buttonidf[2])
    }
}

/*function load() {
    let str = savebox.value;
    let res = str.split(",");
    if (location.pathname.includes("3-4.html") || location.pathname.includes("3-4hard.html")) {
        if (res.length == 0 || res.length < 27 || res[26] == "") {
            if (res[26] == "" || res[26] == undefined) {
                var newres = res.length - 1
                alert("Falsche anzahl von Zahlen! " + "Gefunden: " + newres + " Gebraucht: 27\n" + res)
            } else {
                alert("Falsche anzahl von Zahlen Gefunden: " + res.length + " Gebraucht: 27\n" + res)
            }
        } else {
            count = []
            count = res
            setcookie(count, domain)
            count.forEach((e, index) => {
                var button = document.getElementById(index);
                button.innerHTML = e;
            })
        }
    }
}*/