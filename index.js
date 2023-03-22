import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoutes.js';
import CabangRoute from './routes/CabangRoutes.js';
import DriverRoute from './routes/DriverRoutes.js';
import TambangRoute from './routes/TambangRoutes.js';
import PSewaRoute from './routes/PsewaRoutes.js';
import KendaraanRoute from './routes/KendaraanRoutes.js';
import ReservasiRoute from './routes/ReservasiRoutes.js';
import BBMRoute from './routes/HisBbmRoutes.js';
import ServisRoute from './routes/HisServisRoutes.js';
import PemakaianRoute from './routes/HisPemakaianRoutes.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes 
app.use(UserRoute)
app.use(CabangRoute)
app.use(DriverRoute)
app.use(TambangRoute)
app.use(PSewaRoute)
app.use(KendaraanRoute)
app.use(ReservasiRoute)
app.use(BBMRoute)
app.use(ServisRoute)
app.use(PemakaianRoute)

app.listen(5000, () => console.log("server berjalan...."))