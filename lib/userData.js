import { getToken } from "../lib/authenticate";

export async function getUserProfile(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TWO}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}

export async function addName(name) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TWO}/name`, {
    method: "POST",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}

export async function addInterests(interestsArray) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TWO}/lookingfor`, {
    method: "POST",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interests: interestsArray }),
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}

export async function addCountry(country) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_TWO}/location/country/${country}`,
    {
      method: "PUT",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}

export async function addCity(city) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_TWO}/location/city/${city}`,
    {
      method: "PUT",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}

export async function addDob(date) {
  console.log(date);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_TWO}/dob`, {
    method: "POST",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return "";
  }
}
