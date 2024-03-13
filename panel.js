import { validateSessionIdToken } from "./account.js";

const d = document,
ls = localStorage

d.addEventListener("DOMContentLoaded", e => {

    // Validar si existe un token guardado en el navegador. Si existe, se inicia sesión

    const session = validateSessionIdToken(ls.getItem("id-token")).then(data => {
        if(!data) {
            ls.setItem("has-to-login", true) // Si no hay token, se pone en true para que al redirigirse a la landing page, ésta sepa que debe abrir el apartado de login
            location.href = "https://mishipay.vercel.app/index.html" // Se redirige a la landing page
        }

        // Relleno uwun't
        
        const userEmail = data["users"][0]["email"]
        d.querySelector(".userEmail").textContent = userEmail
    })
})