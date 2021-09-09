function MethodDecorator(route, method) {
    console.log("Method decorator called");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("target:", target);
        console.log("propertyKey:", propertyKey);
        console.log("descriptor:", descriptor);
    };
}

export default class App {
    getUser() {}

    @MethodDecorator("/:id", "get")
    addUser() {
        console.log("addUser is called");
    }
}
