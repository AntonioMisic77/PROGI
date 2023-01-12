import { UserDto } from "../Api/Api";

export interface UserContextObject {
   user: UserDto | undefined,
   setUser: (user: UserDto) => void;
}