import jwt_decode from "jwt-decode";

// Attempts to obtain a JWT from server at the route "/api/login", given a specific user and password.
// Stores the token locally if the status code from "/api/login" is 200, otherwise throws
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ email: user, password: password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function authenticateViaFacebook() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facebook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      email: user,
      password: password,
      password2: password2,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message);
  }
}

// Stores the token in localStorage
function setToken(token) {
  localStorage.setItem("access_token", token);
}

// Retrieves the token from "localStorage" using getItem().
// If the token does not exist, it will return null
export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

// Removes the token from localStorage using removeItem().
export function removeToken() {
  localStorage.removeItem("access_token");
}

// Obtains the payload from the JWT.
// This is accomplished by first retrieving the token from localStorage (using getToken()),
// followed by reading the token using "jwt_decode"
export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}

// Attempts to read token (readToken()).
// If a value is returned, return true otherwise, return false.
// This will be used to determine whether or not a user is allowed to proceed to a specific route / page.
export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}
