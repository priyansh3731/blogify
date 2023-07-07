import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshbalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio : "hii my name is adarsh balika"
  },
  {
    _id: uuid(),
    firstName: "pawan",
    lastName: "kumar",
    username: "priyansh30",
    password: "pawan1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio : "hii my name is pawan"
  },
];
