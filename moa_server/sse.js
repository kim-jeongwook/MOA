const SSE = require("sse");

module.exports = (server) => {
    const sseObj = new SSE(server);
    let start = new Date();
    let time;

    sseObj.on("connection", (client) => {
        setInterval(() => {
            time = Date.now() - start;

            const Hour = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minute = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const second = Math.floor((time % (1000 * 60)) / 1000);
            
            client.send((Hour >= 10? Hour:"0"+Hour) + ":" +
                        (minute >= 10? minute:"0"+minute) + ":" + 
                        (second >= 10? second:"0"+second));
        }, 1000);

        /* setInterval(() => {
            client.send((++second).toString());
        }, 1000); */
    }); 
}