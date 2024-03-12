const d = document

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