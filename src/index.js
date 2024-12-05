import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

// start db connection
connectDB();
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
