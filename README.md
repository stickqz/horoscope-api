# 🔮 Personalized Horoscope API

A TypeScript backend service that generates daily horoscopes based on zodiac signs.

## ✨ Features

- JWT authentication with auto zodiac detection
- Daily horoscopes + 7-day history
- Rate limiting (5 req/min)
- Swagger documentation
- PostgreSQL with Sequelize ORM
- Request logging for monitoring

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm

### Installation Steps

1. **Clone & Install**
   ```bash
   git clone git@github.com:stickqz/horoscope-api.git
   cd horoscope
   npm install
   ```

2. **Environment Configuration**
   
   Note: `.env` file is present in the repo for testing purpose.

   Configure `.env`:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=horoscope_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_SSL=false
   
   # JWT
   JWT_SECRET=your_secret_jwt_key
   JWT_EXPIRES_IN=24h
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

4. **Run Application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

5. **Access Points**
   - API: `http://localhost:3000`
   - Documentation: `http://localhost:3000/api-docs`
   - Health Check: `http://localhost:3000/health`

## 📚 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/horoscope/today` - Today's horoscope (auth required)
- `GET /api/horoscope/history` - Last 7 days (auth required)

## 🧪 Testing

```bash
npm run dev
npm run test
```

## 🏗️ Architecture

```
src/
├── config/          # Database & Swagger
├── controllers/     # Auth & horoscope handlers
├── middleware/      # Auth, validation, rate limiting
├── models/          # Sequelize models
├── routes/          # API routes
├── types/           # TypeScript definitions
├── utils/           # Helper functions
└── server.ts        # Main entry point
```

## 🎯 Design Decisions

- **TypeScript**: Type safety & better DX
- **PostgreSQL + Sequelize**: Robust relational DB with TypeScript support
- **JWT Auth**: Stateless & scalable authentication
- **Rate Limiting**: 5 req/min per IP to prevent abuse
- **Code Simplification**: Utility functions & DRY principles
- **Request Logging**: Console-based monitoring for observability

## 🚀 Future Improvements

- **Individual horoscopes** per user (not zodiac-specific)
- **Push notifications** for daily horoscopes
- **Caching** (Redis) for better performance
- **OAuth integration** (Google, Facebook login)

## 📈 Scaling for Personalized Horoscopes

- **Current**: 12 templates, minimal storage, simple selection
- **Challenges**: Individual content per user, 1000x storage increase
- **Strategy**: Redis caching, background queues, database sharding
- **Impact**: 1 server → 10+ servers, 50-100x cost increase

