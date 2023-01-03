import { atom } from "jotai";
import { getUserProfile } from "./lib/userData";

export const profileAtom = atom(getUserProfile());
