const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');



// Azure SQL Database Configuration
const dbConfig = {
    user: 'ecoadmin',
    password: 'admin#123',
    server: 'poc-igc2024-ecobalancer-sql.database.windows.net',
    database: 'poc-igc2024-ecobalancer-sql',
    options: {
        encrypt: true, // Use this if connecting to Azure
        enableArithAbort: true,
    },
};

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to Azure SQL Database');
    }

    // Api endpoint for Contact Us
    app.post('/contactus', async (req, res) => {
        const { name, email, message} = req.body;
    
    
        try {
            
    
            const query = 'INSERT INTO [dbo].[contact_us] ([name], [email], [message]) VALUES (@name, @email, @message)';
            await pool.request()
                .input('name', sql.NVarChar, name)
                .input('email', sql.NVarChar, email)
                .input('message', sql.NVarChar, message)
                .query(query);
    
            res.status(200).send({ message: 'Thanks for your message, our team will be in touch with you soon....!' });
        } catch (err) {
            console.error('error sending message', err.message, err.stack);
            res.status(500).send({ message: 'Error saving user to database', error: err.message });
        }
    });
    // API Endpoint for Signup
                  
    app.post('/signup', async (req, res) => {
        const { username,company_name , email, password, confirmPassword } = req.body;
    
        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match!" });
        }
    
        try {
            
    
            const query = 'INSERT INTO [dbo].[User] ([username],[company_name], [email], [password]) VALUES (@Username,@company_name, @Email, @Password)';
            await pool.request()
                .input('Username', sql.NVarChar, username)
                .input('company_name', sql.NVarChar, company_name)
                .input('Email', sql.VarChar, email)
                .input('Password', sql.VarChar, password)
                .query(query);
    
            res.status(200).send({ message: 'Signup successful!' });
        } catch (err) {
            console.error('Signup error:', err.message, err.stack);
            res.status(500).send({ message: 'Error saving user to database', error: err.message });
        }
    });
    
    app.post('/ai', async (req, res) => {
        const { company_name,electricity_usage,data_center_usage,pue,transportation_distance,fuel_consumption,cloud_compute_hours,data_storage,data_transfer } = req.body;
    
            
        try {
            
    
            const query = 'INSERT INTO [dbo].[carbon_emission] ([company_name],[electricity_usage],[data_center_usage],[pue],[transportation_distance],[fuel_consumption],[cloud_compute_hours],[data_storage],[data_transfer]) VALUES (@company_name,@electricity_usage,@data_center_usage,@pue,@transportation_distance,@fuel_consumption,@cloud_compute_hours,@data_storage,@data_transfer)';
            await pool.request()
                .input('company_name', sql.NVarChar, company_name)
                .input('electricity_usage', sql.Float, electricity_usage)
                .input('data_center_usage', sql.Float, data_center_usage)
                .input('pue', sql.Float, pue)
                .input('transportation_distance', sql.Float, transportation_distance)
                .input('fuel_consumption', sql.Float, fuel_consumption)
                .input('cloud_compute_hours', sql.Float, cloud_compute_hours)
                .input('data_storage', sql.Float, data_storage)
                .input('data_transfer', sql.Float, data_transfer)
                .query(query);
    
            res.status(200).send({ message: 'data inserted!' });
        } catch (err) {
            console.error('Error saving user to database:', err.message, err.stack);
            res.status(500).send({ message: 'Error saving user to database', error: err.message });
        }
    });
    

    // API Endpoint for Login
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await pool.request()
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, password)
                .query('SELECT * FROM [dbo].[User] WHERE email = @email AND password = @password');

            if (result.recordset.length > 0) {
                res.status(200).send({ message: 'Login successful' });
                const query = 'INSERT INTO [dbo].[Recent_User] ([email]) VALUES (@email)';
            await pool.request()
                .input('email', sql.NVarChar, email)
                .query(query);
            } else {
                res.status(401).send({ message: 'Invalid credentials' });
            }
        } catch (err) {
            console.error('Error querying data:', err);
            res.status(500).send({ message: 'Error during login' });
        }
    });
}).catch(err => {
    console.error('Database connection failed:', err);
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
