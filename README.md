# ParaDox AI

ParaDox AI is a microservices-based AI workspace that enables users to upload PDFs, organize them into folders, generate summaries, and chat with documents using Retrieval-Augmented Generation (RAG).

## Key Features

* PDF Upload & Processing
* Folder-Based Document Management
* AI-Powered PDF Chat
* Document Summarization
* Authentication with JWT (Access & Refresh Tokens)
* Real-Time Notifications
* Multi-PDF Knowledge Retrieval
* Background Job Processing

## Architecture

* Frontend: React, Vite
* API Gateway: Express.js
* Backend Services: Node.js, TypeScript
* AI Service: FastAPI, Sentence Transformers, Groq
* Database: PostgreSQL + Prisma
* Vector Database: ChromaDB
* Queue System: Redis + BullMQ
* Event Streaming: Kafka
* Real-Time Communication: Socket.IO
* Containerization: Docker & Docker Compose

## System Flow

```text
User
  |
  v
Frontend (React)
  |
  v
API Gateway
  |
  +--> Auth Service
  +--> Folder Service
  +--> Document Service
  +--> Chat Service
  |
  v
AI Service (FastAPI)
  |
  +--> ChromaDB
  +--> Groq LLM

PDF Upload
   |
   v
Redis Queue
   |
   v
Worker
   |
   v
AI Processing
   |
   v
Kafka Event
   |
   v
Notification Service
   |
   v
Socket.IO → Frontend
```

