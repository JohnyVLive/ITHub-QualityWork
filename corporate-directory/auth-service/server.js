import express from 'express'; // Импортируем модуль Express
import cors from 'cors'; // Импортируем модуль CORS
import db from './database.js'; // Импортируем модуль базы данных
import dbAPIRequests from './dbAPIRequests.js'; // Импортируем SQL-запросы
import bcrypt from 'bcryptjs'; // Импортируем bcrypt для хеширования паролей
import jwt from 'jsonwebtoken'; // Импортируем jsonwebtoken для работы с JWT

const app = express();
const PORT = 3001;
//TODO: В рабочей среде нужно изменить секретный ключ на более безопасный
//TODO: Возможно вынести секретный ключ в переменные окружения
const JWT_SECRET = 'change-your-secret-key-in-production';

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(express.json()); 


// ==================== Точки аутентификации ====================

// Регистрация пользователя
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      dbAPIRequests.createUser,
      [username, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Username already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'User created successfully', userId: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Авторизация пользователя
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  db.get(
    dbAPIRequests.getUserByUsername,
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, username: user.username });
    }
  );
});

// Проверка токена
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
