import BaseError from "./BaseError";

export default class ExistingEntityError extends BaseError {
    constructor(msg: string) {
        super(msg, 409);
    }
}