import "dotenv/config";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expirationTime = "2h";

if (!process.env.JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is not defined");
}
export { secret, expirationTime };
