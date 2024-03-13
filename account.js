import apiKeys from "./api_keys.js"

const d = document,
ls = localStorage

// Función para crear usuario en firebase

export async function createUser(email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKeys.firebase}`; // URL para conectar con firebase

    try {

      // Petición a firebase

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true, // Se pone en true que retorne un token y se inicie sesión automáticamente
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Si el usuario se crea exitosamente
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

// Función para validar los inputs si se intenta crear cuenta

export function validateSignUp(email, password, name, tel) {
    return true
}

// Función para validar los inputs si se intenta iniciar sesión

export function validateLogin(email, password, name, tel) {
    return true
}

// Función crear cuenta (validar inputs, crear usuario y guardar datos de nombre y teléfono)

export async function signUp(email, password, name, tel) {

    const emailValue = d.querySelector(email).value,
    passwordValue = d.querySelector(password).value,
    nameValue = d.querySelector(name).value,
    telValue = d.querySelector(tel).value

    // Validación de inputs
    
    if(!validateSignUp(emailValue, passwordValue, nameValue, telValue)) {
        alert("Algún valor no es válido")
        return false
    }

    const user = await createUser(emailValue, passwordValue) // Crear cuenta

    ls.setItem("id-token", user["idToken"]) // Guardar token para que se inicie sesión de forma automática
    location.href = "https://mishipay.vercel.app//panel.html" // Se redirige al panel
}

// Función para validar inicio de sesión en firebase

export async function validateUser(user, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKeys.firebase}`; // URL para conectar con firebase

    // Petición a firebase

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password,
          returnSecureToken: true, // Se pone en true para que retorne un token y se pueda iniciar sesión de forma automática
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Si el inicio de sesión es exitoso
        return data
      } else {
        // Hubo un error en el inicio de sesión
        return false
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
}

// Función para iniciar sesión (validar inputs y validar sesión)

export async function login(email, password) {

    const emailValue = d.querySelector(email).value,
    passwordValue = d.querySelector(password).value

    // Validar inputs

    if(!validateLogin(emailValue, passwordValue)) {
        alert("Algún valor no es válido")
        return false
    }

    const res = await validateUser(emailValue, passwordValue) // Validar inicio de sesión

    if(!res){
        // Si el inicio de sesión es inválido
        alert("Usuario o contraseña inválidos")
    }
    else{
        // Si el inicio de sesión es exitoso
        ls.setItem("id-token", res["idToken"]) // Guardar el token para que se pueda iniciar sesión de forma automática
        location.href = "https://mishipay.vercel.app/panel.html" // Se redirige al panel
    }
}

// Función para validar sesión por token

export async function validateSessionIdToken(idToken) {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKeys.firebase}`; // URL para conectar con firebase
  
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
      return data; // Si la validación es exitosa, se retorna la información del usuario
    } catch (error) {
      console.error("Error al validar la sesión:", error.message);
      return false;
    }
}