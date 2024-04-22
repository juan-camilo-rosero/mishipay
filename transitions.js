const d = document

// Función para hacer transición suave entre dos pantallas

export function changeScreen(screenToHide, screenToShow) {
    const $screenToHide = d.querySelector(screenToHide),
    $screenToShow = d.querySelector(screenToShow)
    $screenToHide.classList.add("hidden")
    setTimeout(() => {
        $screenToHide.classList.add("none")
        $screenToShow.classList.remove("none")
    }, 400);
    setTimeout(() => {
        $screenToShow.classList.remove("hidden")
    }, 500);
}

export function appearDiv(div) {
    const $div = d.querySelector(div)
    $div.classList.remove("none")
    setTimeout(() => $div.classList.remove("hidden"), 400);
}

export function dissappearDiv(div) {
    const $div = d.querySelector(div)
    $div.classList.add("hidden")
    setTimeout(() => $div.classList.add("none"), 400);
}

export function changeTitle(title, section) {
    const $section = d.querySelector(section),
    $title = d.querySelector(title)

    $title.classList.add("hidden")
    $title.textContent = $section.getAttribute("data-title")
    setTimeout(() => $title.classList.remove("hidden"), 300);
}

export function showError(msg) {
    const $alert = d.querySelector(".alert"),
    $closeAlert = d.querySelector(".close-alert"),
    $msg = d.querySelector(".alert-text")

    $alert.classList.remove("success-alert")
    $alert.classList.add("error-alert")
    $closeAlert.classList.remove("green")
    $msg.classList.remove("green")
    $closeAlert.classList.add("red")
    $msg.classList.add("red")
    $msg.textContent = msg
    $alert.classList.remove("none")
    setTimeout(() => $alert.classList.remove("hidden"), 200);
}

export function showSuccess(msg) {
    const $alert = d.querySelector(".alert"),
    $closeAlert = d.querySelector(".close-alert"),
    $msg = d.querySelector(".alert-text")

    $alert.classList.add("success-alert")
    $alert.classList.remove("error-alert")
    $closeAlert.classList.add("green")
    $msg.classList.add("green")
    $closeAlert.classList.remove("red")
    $msg.classList.remove("red")
    $msg.textContent = msg
    $alert.classList.remove("none")
    setTimeout(() => $alert.classList.remove("hidden"), 200);
}

export function closeAlert() {
    const $close = d.querySelector(".close-alert"),
    $alert = d.querySelector(".alert")

    $close.addEventListener("click", e => {
        $alert.classList.add("hidden")
        setTimeout(() => $alert.classList.add("none"), 200);
    })
}