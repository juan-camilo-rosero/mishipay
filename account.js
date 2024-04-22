import apiKeys from "./api_keys.js"
import { showError } from "./transitions.js";

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
            showError("Error al crear el usuario");
            return false;
        }
    } catch (error) {
        console.error('Error de red:', error.message);
        return false
    }
}

async function createUserInDB(email, tel, name) {
  const newUser = {
    email,
    tel: parseInt(tel),
    name,
    money: 0
  },
  
  url = `https://mishipay-api-rest.onrender.com/users`; // URL para conectar con la API REST

  try {

    // Petición a la API REST

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
          // Si el usuario se crea exitosamente
          return data;
      } else {
          // Hubo un error en la creación del usuario
          showError("Error al crear el usuario");
          return false;
      }
  } catch (error) {
      console.error('Error de red:', error.message);
      return false
  }
}

// Función para validar los inputs si se intenta crear cuenta

export function validateSignUp(email, password, name, tel) {
  // Expresión regular para validar el email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validar que el email sea válido
  if (!emailRegex.test(email)) {
      return {
          message: "El correo ingresado es inválido.",
          isValid: false
      };
  }

  // Validar la longitud de la contraseña
  if (password.length < 6 || password.length > 16) {
      return {
          message: "La contraseña debe tener entre 6 y 16 caracteres.",
          isValid: false
      };
  }

  // Validar la longitud del nombre
  if (name.length < 4 || name.length > 25) {
      return {
          message: "El nombre debe tener entre 4 y 25 caracteres.",
          isValid: false
      };
  }

  // Validar el formato del teléfono
  if (!(/^\d{10}$/.test(tel))) {
      return {
          message: "El teléfono ingresado no es válido.",
          isValid: false
      };
  }

  // Si todas las validaciones pasan, retornar true
  return {
      message: "",
      isValid: true
  };
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
    
    const validation = validateSignUp(emailValue, passwordValue, nameValue, telValue)
    if(!validation.isValid) {
        console.log(validation)
        showError(validation.message)
        return false
    }

    const user = await createUser(emailValue, passwordValue) // Crear cuenta
    const userInDB = await createUserInDB(emailValue, telValue, nameValue)

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
        showError("Algún valor no es válido")
        return false
    }

    const res = await validateUser(emailValue, passwordValue) // Validar inicio de sesión

    if(!res){
        // Si el inicio de sesión es inválido
        showError("Usuario o contraseña inválidos")
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

// Función para obtener la información de un usuario

export async function getUserInfoTel(tel) {
  
  const url = `https://mishipay-api-rest.onrender.com/users-tel/${tel}`; // URL para conectar con la API REST

  try {

    // Petición a la API REST

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      const data = await response.json();

      if (response.ok) {
          // Si el usuario se crea exitosamente
          return data;
      } else {
          // Hubo un error en la creación del usuario
          showError("Error al obtener la información del usuario");
          return false;
      }
  } catch (error) {
      console.error('Error de red:', error.message);
      return false
  }
}
export async function getUserInfo(email) {
  
  const url = `https://mishipay-api-rest.onrender.com/users/${email}`; // URL para conectar con la API REST

  try {

    // Petición a la API REST

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      const data = await response.json();

      if (response.ok) {
          // Si el usuario se crea exitosamente
          return data;
      } else {
          // Hubo un error en la creación del usuario
          showError("Error al obtener la información del usuario");
          return false;
      }
  } catch (error) {
      console.error('Error de red:', error.message);
      return false
  }
}

// Funciones para eliminar usuario

export async function deleteUserInDB(email) {
  email = encodeURIComponent(email)
  console.log(email);
  const url = `https://mishipay-api-rest.onrender.com/users/${email}`; // URL para conectar con la API REST

  try {

    // Petición a la API REST

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if (response.ok) {
        // Si el usuario se crea exitosamente
        return data;
    } else {
        // Hubo un error en la creación del usuario
        showError("Error: " + data.detail);
        return data;
      }
  } catch (error) {
    console.error('Error de red:', error.message);
    return false
  }
}

export async function deleteUser(email, idToken) {
  // URL de la API REST de Firebase para eliminar un usuario
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=${apiKeys.firebase}`;

  // Prepara los datos para enviar a la API REST de Firebase
  const data = {
      idToken: idToken,
      email: email
  };

  try {
      // Realiza la solicitud HTTP DELETE a la API REST de Firebase
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          // Si hay un error, arroja un error con el mensaje correspondiente
          const errorData = await response.json();
          throw new Error(errorData.error.message);
      }

      // Respuesta exitosa
      const result = await response.json();
      console.log('Usuario eliminado:', result);
      return result;
  } catch (error) {
      console.error('Error eliminando el usuario:', error);
      throw error;
  }
}
