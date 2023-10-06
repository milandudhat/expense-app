const { NestInterceptor } = require('@nestjs/common');


class CustemInterceptor implements NestInterceptor {
    intercept(context, next) {
        return next.handle();
    }
}