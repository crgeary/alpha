# @alpha/http-server

> Part of [Alpha](https://github.com/crgeary/alpha).

## Usage

```ts
const app = express();

@Controller()
class ExampleController {
    @Get("/users/:userId")
    example(@Res() res: Response, @Params('userId') userId: string) {
        return res.json({
            user: {
                id: userId,
                ...
            }
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

| Decorator       | Type      | Description                   |
| :-------------- | :-------- | :---------------------------- |
| `@Controller()` | Class     | Marks a class as a Controller |
| `@Get()`        | Method    | Use HTTP GET method           |
| `@Post()`       | Method    | Use HTTP POST method          |
| `@Put()`        | Method    | Use HTTP POST method          |
| `@Patch()`      | Method    | Use HTTP PATCH method         |
| `@Delete()`     | Method    | Use HTTP DELETE method        |
| `@Head()`       | Method    | Use HTTP HEAD method          |
| `@Options()`    | Method    | Use HTTP OPTIONS method       |
| `@All()`        | Method    | Use any HTTP method           |
| `@HttpCode()`   | Method    | Set HTTP status code          |
| `@Req()`        | Parameter | Express: Request              |
| `@Res()`        | Parameter | Express: Response             |
| `@Next()`       | Parameter | Express: NextFunction         |
| `@Params()`     | Parameter | Express: Request.params       |
| `@Query()`      | Parameter | Express: Request.query        |
| `@Body()`       | Parameter | Express: Request.body         |
| `@Headers()`    | Parameter | Express: Request.headers      |
| `@Cookies()`    | Parameter | Express: Request.cookies      |
