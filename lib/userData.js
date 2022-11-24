import { getToken } from "../lib/authenticate";

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      //body: JSON.stringify({ id: id }),
      headers: {
        Authorization: `JWT ${getToken()}`,
        "content-type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        Authorization: `JWT ${getToken()}`,
        "content-type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/`, {
    method: "GET",
    body: JSON.stringify({ id: id }),
    headers: {
      Authorization: `JWT ${getToken()}`,
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
