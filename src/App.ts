// https://medium.com/litslink/typescript-decorators-in-examples-c3afcd3c7ff8

import { log } from "console";
import { Router } from "express";
import { MyUtil } from "./my_utils";
import { UserUdpatableUserFields } from "./types";

function classDecorator(...args: any): ClassDecorator {
    return function <TFunction extends Function>(target: TFunction): TFunction | void {
        // do something
    };
}

function addProperty<T>(name: string, value: T): ClassDecorator {
    console.log(`[Class 🟩] Add property`);
    return function (target: any): void {
        target.prototype[name] = value;
        const instance = new target() as User;
        instance.firstName = "Will";
        instance.lastName = "Smith";
        console.log("New user", instance);
    };
}

function MyRouter<T>(path?: string): ClassDecorator {
    console.log(`[Class 🟩] Add property`);
    return function (target: any): void {
        target.prototype.consturctor = () => {
            console.log("--------------------- constructor called!");
        };
    };
}

function propertyDecorator(...args: any): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol): void {
        // do something
    };
}

function methodDecorator(...args: any): MethodDecorator {
    return function <T>(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void {
        // do something
    };
}

export function methodDecoratorExample(): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        console.log("⚠️ DATA", { target, propertyKey, descriptor });

        const original = descriptor.value;

        descriptor.value = (...args: any) => {
            const originalResult = original.apply(target, args);
            return originalResult + 4;
        };
    };
}

export function MyRoute<ParamsType = any, ReqBodyType = any, QueryStringType = any>(
    path: string,
    method: "get" | "put" | "delete" | "post"
): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        console.log("⚠️ DATA", { target, propertyKey, descriptor });

        console.log("typeof(target):", typeof target);

        const original = descriptor.value;

        // // @ts-ignore
        // target.route[method](
        //     path,
        //     [],
        //     MyUtil.getHttpRequestHandler<ParamsType, ReqBodyType, QueryStringType>(async (req) => {
        //         return await original();
        //     })
        // );
    };
}

function parameterDecorator(...args: any): ParameterDecorator {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number): void {
        // do something
    };
}

function logData(message: string): ClassDecorator {
    console.log(`Message is: ${message}`);
    return function (): void {
        console.log("logdata.constructor");
    };
}

function logProperty(message: string): PropertyDecorator {
    console.log(`[Property 🟡] Message is: ${message}`);
    return function (): void {
        console.log("[Property 🟡] constructor");
    };
}

function logMethod(message: string): MethodDecorator {
    console.log(`[Method 🟠] Message is: ${message}`);
    return function (): void {
        console.log("[Method 🟠] constructor");
    };
}

function logParameter(message: string): ParameterDecorator {
    console.log(`[Parameter 🔵] Message is: ${message}`);
    return function (): void {
        console.log("[Parameter 🔵] constructor");
    };
}

@addProperty("injected", "bla")
@logData("Hello world")
class User {
    @logProperty("Property message")
    public firstName: string;
    public lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;

        console.log("User.constructor called.");
    }

    @logMethod("THis is the method")
    sayHello(@logParameter("This is the parameter!") msg = "Hello") {
        console.log(`This is ${this.firstName}. ${msg}!`);
    }
}

console.log("Creating user ...");
const user = new User("Spider", "Man");
user.sayHello();
user.sayHello();
console.log("Creating user ... done");
console.log("user:", user);
// @ts-ignore
console.log("user:", user.injected);

console.log("Creating user2 ...");
const user2 = new User("Mary", "Jane");
user2.sayHello();
user2.sayHello();
console.log("Creating user2 ... done");
console.log("user2:", user2);
// @ts-ignore
console.log("user2:", user2.injected);

@MyRouter("/users")
class UserRouter {
    @propertyDecorator(100)
    bla = 2;

    getUser() { }

    @MyRoute<{ id: string }>("/:id", "post")
    // @log()
    async addUser(params, req, res, qry) {
        console.log("UserRouter.addUser called.");
        for (let i = 0; i < 1000000000; i++) { }
        await setTimeout(() => console.log("addUser is called"), 3000);
        console.log("UserRouter.addUser returning.");
    }

    async register() {

    }
}

@MyRouter("/auth")
class AuthRouter {

    @MyRoute("/login", "post")
    async login() {

    }
}

class App {

}

export default UserRouter;
