import express from "express";
import 'dotenv/config';
import sequelize from "./config/db.js";
import schoolsRouter from "./routes/schoolroutes.js";

const app = express();
app.use(express.json());


app.get("/", (_req, res) => res.json({ ok: true, message: "School APIs running" }));

app.use("/api/school", schoolsRouter);

// Connect DB + sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected...");
    await sequelize.sync({alter:true}); 
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

const PORT =process.env.PORT|| 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
