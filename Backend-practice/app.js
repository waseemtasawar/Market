import express from 'express'
import prodRoute from './routes/prodRoutes.js'
const app = express();
app.use(express.json());

const indexPage = (req, res)=>{
    res.status(200).json({message:"Hello from server",
      app:'Market-Place'
    })
  }

app.get('/' ,indexPage)

app.use('/api/products', prodRoute)
export default app