import apiKeys from "./api_keys.js"

const d = document,
ls = localStorage

export async function createUser(email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKeys.firebase}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Usuario creado exitosamente");
            return data;
        } else {
            // Hubo un error en la creación del usuario
            alert("Error al crear el usuario");
            return false;
        }
    } catch (error) {
        console.error('Error de red:', error.message);
        return false
    }
}

export function validateSignUp(email, password, name, tel) {
    return true
}

export function validateLogin(email, password, name, tel) {
    return true
}

export async function signUp(email, password, name, tel) {

    const emailValue = d.querySelector(email).value,
    passwordValue = d.querySelector(password).value,
    nameValue = d.querySelector(name).value,
    telValue = d.querySelector(tel).value

    if(!validateSignUp(emailValue, passwordValue, nameValue, telValue)) {
        alert("Algún valor no es válido")
        return false
    }

    const user = await createUser(emailValue, passwordValue)

    ls.setItem("id-token", user["idToken"])
    location.href = "https://mishipay.vercel.app//panel.html"
}

export async function validateUser(user, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKeys.firebase}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password,
          returnSecureToken: true,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("inicio de sección exitoso");
        return data
      } else {
        // Hubo un error en el inicio de sesión
        return false
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
}

export async function login(email, password) {

    const emailValue = d.querySelector(email).value,
    passwordValue = d.querySelector(password).value

    if(!validateLogin(emailValue, passwordValue)) {
        alert("Algún valor no es válido")
        return false
    }

    const res = await validateUser(emailValue, passwordValue)

    if(!res){
        alert("Usuario o contraseña inválidos")
    }
    else{
        ls.setItem("id-token", res["idToken"])
        location.href = "https://mishipay.vercel.app/panel.html"
    }
}

export async function validateSessionIdToken(idToken) {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKeys.firebase}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al validar el ID Token');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al validar la sesión:", error.message);
      return false;
    }
}