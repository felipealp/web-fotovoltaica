import { IJwt } from "../interfaces/jwt.interface";
import jwt_decode from "jwt-decode";

export const fetchJwt = () => {
  var value = localStorage.getItem("jwt");
  return value;
};

export const fetchDecodedJwt = (): IJwt => {
  let decoded: IJwt;
  var jwt = fetchJwt();

  decoded = jwt_decode(jwt != null ? jwt : "");
  return decoded;
};