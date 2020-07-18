import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routes/routes.ts";
import { swaggerDoc } from "https://deno.land/x/deno_swagger_doc/mod.ts";

const app = new Application();

const swaggerDefinition = {
  info: {
    title: 'Hello Deno!', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:3000`, // Host (optional)
  basePath: '/', // Base path (optional)
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./routes/routes.ts', './routes/parameters.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerDoc(options);

app.use(async (context, next) => {
  if(context.request.url.pathname === '/swagger.json'){
    context.response.headers.set('Content-Type', 'application/json');
    context.response.status = 200;
    context.response.body = swaggerSpec
  }else{
    await next();
  } 
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });