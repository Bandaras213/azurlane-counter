let domain = location.pathname
let count
let savebox

window.onload = async function () {
    let cookiesaved = await readcookies(domain)
    savebox = document.getElementById("save")
    inputsave(cookiesaved)
    document.querySelectorAll(".buttons")
        .forEach(btn => btn.addEventListener("click", add, false));
}

async function readcookies(a1) {
    let cookieread = Cookies.get('save', {
        path: a1
    })
    return cookieread
}

async function setcookie(a1) {
    Cookies.set('save', a1, {
        path: domain,
        expires: 365
    })
}

function clearcookie() {
    if (confirm(`This removes the saved ships for ${domain} are you sure?`)) {
        if (location.pathname.includes("3-4.html") || location.pathname.includes("3-4hard.html")) {
            count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 27 Ships
            savebox.value = count
            setcookie(count, domain)
        }
        count.forEach((e, index) => {
            var button = document.getElementById(index);
            button.innerHTML = e;
        })
    } else {}
}

function inputsave(a1) {
    if (a1 != null || a1 != undefined) {
        count = a1.split(",")
        savebox.value = count
        count.forEach((e, index) => {
            var button = document.getElementById(index);
            button.innerHTML = e;
        })
    } else {
        if (location.pathname.includes("3-4.html") || location.pathname.includes("3-4hard.html")) {
            count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 27 Ships
            savebox.value = count
            setcookie(count, domain)
            count.forEach((e, index) => {
                var button = document.getElementById(index);
                button.innerHTML = e;
            })
        }
    }
}

function add() {
    let button = this
    count[this.id]++;
    button.innerHTML = count[this.id];
    savebox.value = count
    setcookie(count, domain)
}

function load() {
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
}