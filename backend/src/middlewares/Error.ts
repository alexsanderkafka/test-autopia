import { Middleware, type ExpressErrorMiddlewareInterface } from "routing-controllers";
import BaseError from "../err/BaseError";

@Middleware({ type: "after" })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface{

    error(error: any, request: any, response: any, next: (err?: any) => any): void {

        if(error instanceof BaseError){
            return response.status(error.httpCode).json(error);
        }
        
        return response.status(500).json({
            detail: 'Internal server error',
            error: error.message
        });

        //next(error);
    }

}