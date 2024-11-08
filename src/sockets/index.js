/**
 * 
 * @param {*} io 
 */
export const commonSocket = (io) => { 
    
    io.on('connection', (socket) => {

        console.log(`A new client connected on socket - ${socket.id}`);

        // Handle socket connection errors
        socket.on('connect_error', () => {
            console.log("Something went wrong in connection");
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
            console.log(`A new client disconnected on socket - ${socket.id}`);
        });
    });
};
