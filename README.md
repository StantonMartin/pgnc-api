# PGNC REST API

[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.0-blue.svg)](https://www.postgresql.org/)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Overview

The PGNC REST API provides programmatic access to the PGNC (Plant Gene Nomenclature Committee) gene database. Built with NestJS 10.x, this API enables efficient querying, searching, and management of plant gene nomenclature data through RESTful endpoints.

### Key Features

- **Gene Data Access**: Comprehensive access to gene symbols, names, locations, and cross-references
- **Search Integration**: Direct integration with Apache Solr 8.x for fast full-text search
- **Authentication**: JWT-based authentication with configurable token lifetimes
- **Database Integration**: TypeORM integration with PostgreSQL 17.0
- **API Documentation**: Automated OpenAPI/Swagger documentation
- **Health Monitoring**: Built-in health check endpoints
- **Email Integration**: Nodemailer integration for notifications

## Technology Stack

- **Framework**: NestJS 10.x
- **Runtime**: Node.js (LTS)
- **Database**: PostgreSQL 17.0 with TypeORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest testing framework
- **Validation**: class-validator and class-transformer

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- PostgreSQL 17.0 database
- Environment configuration (`.env` file)

### Installation

1. **Install dependencies**:

   ```bash
   cd api
   npm install
   ```

2. **Configure environment**:
   Copy `.env` from parent directory or configure these variables:

   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pgnc_database
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   API_PORT=3000
   ```

3. **Start the development server**:

   ```bash
   npm run start:dev
   ```

### Authentication

All protected API requests require a valid JWT token in the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Base URLs

- **Development**: `http://localhost:3000/api`
- **Production**: `https://plant.genenames.org/api`
- **Documentation**: `http://localhost:3000/api` (Swagger UI)

## API Endpoints

The API provides comprehensive endpoints for gene data access. Full documentation is available via Swagger UI at the base URL.

### Core Endpoints

- **Health Check**: `GET /health` - Service health status
- **Gene Search**: `GET /genes` - Search and filter genes
- **Gene Details**: `GET /genes/{id}` - Get specific gene information
- **Gene Symbols**: `GET /genes/{id}/symbols` - Get gene symbol history
- **Gene Names**: `GET /genes/{id}/names` - Get gene name history
- **Cross References**: `GET /genes/{id}/xrefs` - Get external database references

### Search Endpoints

- **Full-text Search**: `GET /search` - Powered by Solr integration
- **Autocomplete**: `GET /suggest` - Gene symbol/name suggestions
- **Faceted Search**: `GET /search/facets` - Search with filters

## Docker Integration

The API runs as part of the Docker Compose stack:

```bash
# Start API service
docker compose up -d api

# View API logs
docker compose logs -f api

# Access API documentation
open http://localhost:3000/api
```

## Development

### Running Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Code Quality

```bash
# Linting
npm run lint

# Format code
npm run format

# Generate documentation
npm run doc
```

### Database Operations

The API uses TypeORM for database operations:

- **Auto-sync**: Disabled in production (`DB_SYNC=false`)
- **Migrations**: Manual migration management
- **Entities**: Defined in `src/` directories

## Configuration

### Environment Variables

Key configuration options:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pgnc_database
DB_USER=postgres
DB_PASSWORD=your_password
DB_SYNC=false
DB_AUTOLOAD_ENTITIES=true

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_TOKEN_AUDIENCE=pgnc-api
JWT_TOKEN_ISSUER=pgnc
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400

# Email Configuration
MAIL_HOST=smtp.example.com
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password

# Server Configuration
API_PORT=3000
```

### Security

- **Password Hashing**: bcrypt with configurable rounds
- **JWT Tokens**: Configurable expiration and refresh
- **CORS**: Configured for frontend integration
- **Rate Limiting**: Built-in protection against abuse

## Error Handling

The API returns standardized error responses:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request",
  "timestamp": "2025-09-11T10:00:00.000Z",
  "path": "/api/endpoint"
}
```

### Common HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests
- **500**: Internal Server Error

## Integration

### Frontend Integration

The API integrates seamlessly with the Angular 19.1+ frontend:

- **Proxy Configuration**: Development proxy in `angular/proxy.conf.json`
- **CORS**: Configured for cross-origin requests
- **Authentication**: JWT token management
- **Type Safety**: Shared TypeScript interfaces

### Search Integration

Direct integration with Apache Solr 8.x:

- **Solr Client**: Custom service for Solr communication
- **Index Synchronization**: Automated via Python 3.13+ data pipeline
- **Search Optimization**: Cached queries and optimized search parameters

## Monitoring and Logging

### Health Checks

- **Database**: Connection and query health
- **Dependencies**: External service availability
- **Memory**: Resource usage monitoring

### Logging

- **Request Logging**: All API requests logged
- **Error Tracking**: Detailed error information
- **Performance**: Response time monitoring

## Deployment

The API is deployed as part of the Docker Compose stack with:

- **Auto-restart**: Service restarts on failure
- **Health monitoring**: Docker health checks
- **Load balancing**: Nginx reverse proxy
- **SSL termination**: Let's Encrypt certificates

## Contributing

1. Follow NestJS coding conventions
2. Write comprehensive tests
3. Update API documentation
4. Ensure type safety
5. Test with Docker environment

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the [LICENSE](../LICENSE) file for details.
