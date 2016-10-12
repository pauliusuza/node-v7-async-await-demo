// An example class which generates a hello world greeting
class Demo {
  async greeting() {
    const h = await this.world();
    return h;
  }
  world() {
    return Promise.resolve('hello world');
  }
}

// Import Koa v2 dependency
const Koa = require('koa');

// Initialize Demo class instance
const demo = new Demo();

// Initialize Koa v2 instance
const app = new Koa();
const port = 3000;

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next(); // wait until we execute the next function down the chain, then continue;
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

// Set up a route
app.use(async ctx => {
  const retval = await demo.greeting();
  ctx.body = retval;
});

// Start listening on specified port
app.listen(port, function() {
  console.log("listening on port", port);
});

// Start the app with "node --harmony-async-await" flag, and go to http://localhost:3000
