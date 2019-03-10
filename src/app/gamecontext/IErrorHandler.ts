import {ICustomError} from "../../_common/http/Exceptions";

interface IErrorHandler {
	handleError(err: ICustomError): void;
}

export {IErrorHandler};