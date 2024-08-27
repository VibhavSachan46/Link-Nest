import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=> {
            console.log('Mongodb connected successfully');
            
        })

        connection.on('error', (err)=> {
            console.log('Mongodb connected successfully'+ err);
             process.exit()
        })
    } catch (error) {
        console.log("SOmething went wrong");
        console.log(error);
    }
    
}