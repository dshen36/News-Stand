const express = require('express');
const app = express();
const scraperRouter = require("./src/routers/scraperRouter");

const PORT = 9001;

// app.get('/api/firebase', (req, res) => {
//   res.send({ firebase: '[TODO] integrate firebase' });
// });
app.use("/", scraperRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
