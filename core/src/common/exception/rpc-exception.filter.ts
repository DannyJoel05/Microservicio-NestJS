
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost) {
        console.log("RpcCustomExceptionFilter")
        console.log(exception)
        console.log(host)
        const context = host.switchToHttp();
        const response = context.getResponse();
        const rpcError = exception.getError();
        if (
            typeof (rpcError) === "object" &&
            "status" in rpcError &&
            "message" in rpcError
        ) {
            const status = !rpcError.status ? 400 : rpcError.status;
            return response.status(status).json(rpcError);
        } else return response.status(400).json(rpcError);
    }
}
