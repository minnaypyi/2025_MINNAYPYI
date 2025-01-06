# 2025_MINNAYPYI

# Coincheck App

This repository contains both the frontend and backend for the Coincheck application.

## Frontend (React)
- Located in the `frontend/coinchecktest` directory.
- Run `npm install` to install dependencies and `npm start` to start the React app.

## Backend (Spring Boot)
- Located in the `backend/coincheck` directory.
- Run `mvn spring-boot:run` to start the Spring Boot application.

## Docker
- This project can also be run using Docker. Run below to build and run
- docker build -t coincheck-app . 
- docker run -p 8080:8080 coincheck-app 

## Instruction Manual
- Enter a valid amount (min 0.00, max 10,000.00)
- Choose at least one coin denomination
