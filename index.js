const server = require('./server.js');

// const port = 2019
// server.listen(port, () => {
//     console.log(`\n** Server listening on ${port}`);
// })

server.listen(9999, () =>  console.log("server on port 9999"));