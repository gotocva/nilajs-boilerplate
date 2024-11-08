// ====================================================
// TODO: 
// Need to implement PM2 logs listener and store it into database and stream into SSE ( Server Sent Events)
// ====================================================

const pm2 = require('pm2');

pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
  
    pm2.list((err, list) => {
      console.log(err, list)
  
      // pm2.restart('api', (err, proc) => {
      //   // Disconnects from PM2
      //   pm2.disconnect()
      // })
    });

    pm2.launchBus((err, bus) => {
        // Catching logs emitted from applications
        bus.on('log:out', async (packet) => {

            console.log('log:out',{packet});
            
            // const logEntry = {
            //     app: packet.process.name,
            //     level: 'stdout',
            //     message: packet.data,
            //     timestamp: new Date(),
            // };
            // await logToMongo(logEntry);
            console.log('Stdout log written to MongoDB:', packet);
        });
    });

});