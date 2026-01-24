
const dbAPIRequests = {
    // ==================== Запросы для работы с пользователями ====================

    'createUser': `INSERT INTO users (username, password) VALUES (?, ?)`,

    'getUserByUsername': `SELECT * FROM users WHERE username = ?`
};

export default dbAPIRequests;
