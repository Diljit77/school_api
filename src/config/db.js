import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import "dotenv/config";

// Step 1: Ensure DB exists (works only if you split config)
// ❌ Skip this step if you’re using DATABASE_URL
const ensureDatabase = async () => {
  if (process.env.DATABASE_URL) {
    console.log("Skipping ensureDatabase: using DATABASE_URL");
    return;
  }

  try {
 const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true, // or false if you face cert issues
  }
});

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    await connection.end();
  } catch (error) {
    console.error("Error ensuring database:", error);
  }
};

await ensureDatabase();

// Step 2: Create Sequelize instance
let sequelize;

if (process.env.DATABASE_URL) {
  // ✅ Use service_url directly
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // ❌ accept self-signed certs
    },
  },
});

} else {
  // ✅ Fallback: use split env variables
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false,
      dialectOptions: {
        ssl: { rejectUnauthorized: true },
      },
    }
  );
}

export default sequelize;
