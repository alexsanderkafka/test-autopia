import BaseError from "./BaseError";

export default class TokenJWTError extends BaseError {
    constructor(msg: string) {
        super(msg, 401);
    }
}