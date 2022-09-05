import { User } from "./user.modal";

export class AuthUser {
    constructor(public user: User, public token: string) {}
}