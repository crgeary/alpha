# @alpha/http-server

> Part of [Alpha](https://github.com/crgeary/alpha).

## Usage

```ts
const app = express();

@Controller()
class ExampleController {
    @Get("/example")
    example(req: Request, res: Response) {
        return res.json({
            message: "Hello, World!",
        });
    }
}

useExpressServer(app, {
    controllers: [ExampleController],
});

app.listen(4000, () => {
    console.log(`🚀 http://localhost:4000`);
});
```

## Decorators

```ts
@Controller()

// Http Status Code
@HttpCode()

// Http Methods
@Get()
@Post()
@Put()
@Patch()
@Delete()
@Head()
@Options()
@All()
```
