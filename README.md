# ParaDox AI

A microservices-based AI workspace that enables users to upload PDFs, organize documents into folders, generate summaries, and interact with their knowledge base using Retrieval-Augmented Generation (RAG).

---

## Features

- PDF Upload & Processing
- Folder-Based Document Organization
- AI-Powered Document Chat
- Retrieval-Augmented Generation (RAG)
- Automatic Document Summarization
- Multi-Document Knowledge Retrieval
- JWT Authentication & Authorization
- Real-Time Notifications
- Background Job Processing
- Dockerized Microservices Architecture

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### AI Layer
- FastAPI
- Sentence Transformers
- Groq API
- Llama 3.3 70B

### Storage
- PostgreSQL
- Prisma ORM
- ChromaDB

### Infrastructure
- Redis
- BullMQ
- Apache Kafka
- Socket.IO
- Docker
- Docker Compose

---

## High Level Architecture

```text
Frontend
    │
    ▼
API Gateway
    │
 ┌──┼───────────────┬─────────────┬────────────┐
 ▼  ▼               ▼             ▼            ▼

Auth Service   Folder Service   Document Service
                                   │
                                   ▼
                            Redis + BullMQ
                                   │
                                   ▼
                                Worker
                                   │
                                   ▼
                               AI Service
                                   │
             ┌─────────────────────┼────────────────────┐
             ▼                     ▼                    ▼

         ChromaDB            Groq LLM          Embedding Model

                                   │
                                   ▼
                               Kafka
                                   │
                                   ▼
                         Notification Service
                                   │
                                   ▼
                               Socket.IO
                                   │
                                   ▼
                               Frontend


PDF Processing Flow

Upload PDF
    │
    ▼
Document Service
    │
    ▼
Redis Queue
    │
    ▼
Worker
    │
    ▼
AI Service
    │
    ├── Extract Text
    ├── Generate Summary
    ├── Chunk Document
    ├── Generate Embeddings
    └── Store Vectors
            │
            ▼
         ChromaDB

RAG Pipeline

User Question
      │
      ▼
Chat Service
      │
      ▼
AI Service
      │
      ├── Generate Query Embedding
      ├── Retrieve Relevant Chunks
      ├── Rerank Results
      ├── Build Context
      └── Generate Answer
                │
                ▼
            Groq LLM

Services
API Gateway

Centralized entry point responsible for routing requests to backend services.

Auth Service

Handles authentication, authorization, access tokens, and refresh tokens.

Folder Service

Manages folder creation and document organization.

Document Service

Handles file uploads, metadata storage, and job creation.

Chat Service

Processes user queries and communicates with the AI Service.

AI Service

Performs PDF extraction, chunking, embeddings generation, retrieval, reranking, summarization, and answer generation.

Notification Service

Consumes Kafka events and delivers real-time notifications through Socket.IO.

Why This Architecture?
Microservices for separation of concerns
Redis & BullMQ for asynchronous processing
Kafka for event-driven communication
ChromaDB for vector similarity search
PostgreSQL for structured data storage
Docker for consistent deployment
RAG to reduce hallucinations and improve answer quality
Future Improvements
Multi-user collaboration
OCR support for scanned PDFs
Streaming AI responses
Role-based access control
Advanced analytics dashboard
Kubernetes deployment
Multi-tenant architecture


