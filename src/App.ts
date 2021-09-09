// https://medium.com/litslink/typescript-decorators-in-examples-c3afcd3c7ff8

function classDecorator(...args: any): ClassDecorator {
    return function <TFunction extends Function>(target: TFunction): TFunction | void {
        // do something
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

console.log("Creating user2 ...");
const user2 = new User("Mary", "Jane");
user2.sayHello();
user2.sayHello();
console.log("Creating user2 ... done");

@classDecorator()
class App {
    @propertyDecorator(100)
    bla = 2;

    getUser() {}

    @methodDecorator()
    async addUser<T>() {
        for (let i = 0; i < 1000000000; i++) {}
        await setTimeout(() => console.log("addUser is called"), 3000);
    }
}

export default App;
