# Content Engine

A modern, headless CMS built with Vue 3, Spring Boot, and Supabase. This project focuses on a seamless WYSIWYG editing experience and scalable cloud storage.

## Key Features

Real-time Editor: Rich text editing with Tiptap.

Image Pipeline: Direct-to-cloud image uploads via Spring Boot.

Secure: JWT-based authentication.

## Quick Start

### Backend

Configure your application.properties:
`
spring.datasource.url=jdbc:postgresql://db.xxxx.supabase.co:6543/postgres?sslmode=require&prepareThreshold=0
spring.datasource.username=postgres
spring.datasource.password=your_password
`

Run the application via Maven or your IDE.

### Frontend

```Bash
cd frontend
npm install
npm run dev
```

The end goal of this project is creating a provider agnostic engine. While currently utilizing Supabase, the architecture is being refactored to support:

Storage Interface: Swap Supabase for AWS S3 or Local Disk by changing a single @Service implementation.

Database Portability: JPA-compliant entities allow for easy migration to MySQL, MariaDB, or local Postgres.

Headless Frontend: The Vue 3 editor communicates via a standard JSON contract, allowing the "Writer" to be swapped for a mobile app or a different JS framework without touching the Java logic.

### High-Performance Database Pooling 

Challenge: Standard PostgreSQL connections on Supabase are limited to a very small number of concurrent sessions. Spring Boot’s default HikariCP configuration frequently hit the MaxClientsInSessionMode limit, causing the application to crash on startup.

Solution:

- Migrated the connection string to Transaction Mode.

- Modified the PostgresSQL configuration to prevent Hibernate from using server-side prepared statements, which are incompatible with PgBouncer in transaction mode.

- Optimized the Hikari connection pool size to 3 to maintain a lean footprint while ensuring 100% uptime for the API.

### Headless Image Processing Pipeline

Challenge: Enabling a seamless WYSIWYG experience where images are uploaded during the writing process without blocking the UI or bloating the database with Base64 strings.

Solution:

- Developed a Multipart File Service in Spring Boot that acts as a secure bridge to Supabase Storage.

- Solved 401 Unauthorized errors by fine-tuning the Spring Security filter chain to correctly handle multipart/form-data preflight (OPTIONS) requests and JWT extraction.

- Integrated the Tiptap Image Extension with a custom Axios instance to automatically inject cloud-hosted URLs into the document JSON in real-time.
