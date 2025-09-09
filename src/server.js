const app= require('./app');
const sequelize= require('src/Infrastructure/Persistence/Sequelize/database');
const UserModel= require('src/Infrastructure/Persistence/Sequelize/models/UserModel');
const{connectRedis}= require('src/Infrastructure/Persistence/Redis/RedisClient');
const config= require('./config/index');

const PORT= config.server.port;

async function startServer(){
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        console.log('Database connected and synchronized!');

        await connectRedis();

        app.listen(PORT, ()=>{
                console.log(`Server is running on port ${PORT}`);
                console.log(`Acess API at http://localhost:${PORT}`);
        });
    }catch(error){
        console.error('Failed to start serve:', error);
        process.exit(1);
    }
}

startServer();