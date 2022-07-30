import { Controller, Get } from "@alpha/http-server";

@Controller()
export class DemoController {
    @Get()
    index() {
        return {
            message: "Hello from the notifications service.",
        };
    }
}
