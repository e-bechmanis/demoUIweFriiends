import { getToken } from "../lib/authenticate";

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
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
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/`,
    {
      method: "GET",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addToHistory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
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
    return [];
  }
}

export async function removeFromHistory(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`,
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

export async function getHistory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/`,
    {
      method: "GET",
      headers: {
        Authorization: `JWT ${getToken()}`,
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
