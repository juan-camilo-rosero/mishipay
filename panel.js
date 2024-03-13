import { validateSessionIdToken } from "./account.js";

const d = document,
ls = localStorage

d.addEventListener("DOMContentLoaded", e => {
    const session = validateSessionIdToken(ls.getItem("id-token")).then(data => {
        if(!data) {
            ls.setItem("has-to-login", true)
            location.href = "https://mishipay.vercel.app/index.html"
        }

        const userEmail = data["users"][0]["email"]
        d.querySelector(".userEmail").textContent = userEmail
    })
})