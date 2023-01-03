import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../lib/authenticate";
import { useAtom } from "jotai";
import { profileAtom } from "../store";
import { getUserProfile } from "../lib/userData";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
  const [profile, setProfile] = useAtom(profileAtom);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  async function updateProfile() {
    const updatedProfile = await getUserProfile();
    console.log("Updated profile:");
    console.log(updatedProfile);
    setProfile((data) => [...data, updatedProfile]);
    console.log(typeof profile);
    console.log("This is the profile after update");
    console.log(profile);
  }

  useEffect(() => {
    // ensure that atoms are up to date when the user refreshes the page
    //updateProfile();

    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  });

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
