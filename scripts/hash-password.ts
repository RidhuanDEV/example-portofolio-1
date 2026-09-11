import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-pass -- YOUR_PASSWORD");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

console.log("Add this value to .env.local:");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
