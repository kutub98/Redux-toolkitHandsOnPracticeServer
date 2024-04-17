const express = require('express');
const cors = require('cors');


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
run().catch(console.dir);
