import BaseError from "./BaseError";

export default class InvalidPasswordError extends BaseError {
    constructor(msg: string) {
        super(msg, 401);
    }
}