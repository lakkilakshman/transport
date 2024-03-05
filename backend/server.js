const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
app.use(express.json())

app.use('/api/cars/' , require('./routes/bikesRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/recommend', async (req, res) => {
    try {
      // Fetch user preferences from the request body
      const  user_preferences  = {
        max_rent_per_hour: 2000,
        fuel_type: 'Petrol',
        seating_capacity: 4,
      };
  
      // Make a POST request to the Flask API with the user preferences
      const response = await axios.post('http://127.0.0.1:5000/recommend', user_preferences );
      
      // Return the response from the Flask API as the recommendation
      res.json(response.data);
     
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))