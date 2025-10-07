import app from './app';
import sequelize from './config/database';

const PORT = 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        await sequelize.sync({
            // force: true, // WARNING: drops & recreates tables in dev
            // alter: true, // This will try to adjust the schema without dropping data
        });
        console.log('Models synchronized...');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log('unable to connect to database : ', err);
    }
})();
