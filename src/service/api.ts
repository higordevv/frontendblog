import axios from "axios";
import { parseCookies } from "nookies";

const { "nextauth.token": token } = parseCookies();
export const api = axios.create({
  baseURL: "http://localhost:3000", // url do backend
});

if (token) api.defaults.headers["Authorization"] = `Bearer ${token}`;

export async function recoverUserInfo() {
  return api.get("/user/me");
}
