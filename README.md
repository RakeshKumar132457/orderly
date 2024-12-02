# Orderly

A full-stack application for managing work orders, contractors, and billing using Angular, Node.js, and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Angular CLI (v19.0.0)
- Git

## MongoDB Setup

1. Create data directory for MongoDB ReplicaSet:
```bash
mkdir -p ~/data/rs0
```

2. Start MongoDB with ReplicaSet:
```bash
mongod --replSet rs0 --dbpath ~/data/rs0
```

3. Initialize ReplicaSet:
```bash
mongosh
> rs.initiate()
```

## Project Setup

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/orderly?directConnection=true&replicaSet=rs0
CORS_ORIGIN=http://localhost:4200
JWT_SECRET=this_is_jwt_super_secret
JWT_EXPIRE=30d
```

3. Set up Prisma:
```bash
npx prisma generate
npx prisma db push
```

4. Start development server:
```bash
npm run dev
```

The backend server will start on http://localhost:3000

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

Application will be available at http://localhost:4200

## API Documentation

Swagger documentation is available at:
http://localhost:3000/docs

## Available Scripts

### Backend
- `npm run dev`: Start development server
- `npm run build`: Build application
- `npm start`: Start production server
- `npm run clean`: Remove build directory
- `npm run build:clean`: Clean and rebuild

### Frontend
- `npm start`: Start development server
- `npm run build`: Build application
- `npm test`: Run unit tests
- `npm run watch`: Build with watch mode

## Environment Variables (Backend)

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| DATABASE_URL | MongoDB URL | mongodb://localhost:27017/orderly?directConnection=true&replicaSet=rs0 |
| CORS_ORIGIN | CORS origin | http://localhost:4200 |
| JWT_SECRET | JWT secret | this_is_jwt_super_secret |
| JWT_EXPIRE | JWT expiration | 30d |

## Common Issues

1. **MongoDB Connection**: Ensure ReplicaSet is running
2. **Prisma**: Run `npx prisma generate` after schema changes
3. **CORS**: Verify CORS_ORIGIN matches frontend URL

## Support
Contact: Rakesh Kumar <rakesh.kumar.132457@gmail.com>

## License
ISC