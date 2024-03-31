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