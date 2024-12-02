# Orderly

A full-stack application for managing work orders, contractors, and billing using Angular, Node.js, and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Angular CLI (v19.0.0)
- Git

## MongoDB ReplicaSet Setup

1. Edit the default MongoDB configuration file:
```bash
sudo nano /etc/mongod.conf
```

2. Update the configuration to enable replication:
```yaml
# Update/add these settings in mongod.conf
replication:
   replSetName: "rs0"
```

3. Restart MongoDB service:
```bash
sudo systemctl restart mongod
```

4. Initialize ReplicaSet:
```bash
mongosh
> rs.initiate()
> rs.status()  # Verify replication status
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

## Features

- Contractor Management
- Entity and Location Management
- Work Order Creation and Tracking
- Bill Generation
- JWT Authentication
- Swagger API Documentation
- Logging System
- Responsive UI with Tailwind CSS

## Troubleshooting MongoDB ReplicaSet

1. **Verify MongoDB Configuration**:
```bash
# Check MongoDB service status
sudo systemctl status mongod

# View MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Check current MongoDB configuration
cat /etc/mongod.conf
```

2. **Common MongoDB Commands**:
```bash
# Check replication status
rs.status()

# Check configuration
rs.conf()
```

3. **Permission Issues**:
- Ensure MongoDB service has proper permissions
- Check log file permissions if there are access issues

## Support

Contact: Rakesh Kumar <rakesh.kumar.132457@gmail.com>

## License

ISC