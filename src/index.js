import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import guestbookRoutes from './routes/guestbook.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Gästebuch-Routen
app.use('/api/guestbook', guestbookRoutes);

mongoose.connect(process.env.MONGODB_URI)

.then(() => {
  console.log('Verbunden mit MongoDB');
  app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Fehler beim Verbinden mit MongoDB:', error.message);
});
