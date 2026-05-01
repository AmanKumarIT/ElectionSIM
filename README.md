# ElectionSim Education Platform 🗳️

ElectionSim is a full-stack interactive election education platform designed to explain the Indian electoral process through immersive simulations, interactive timelines, and an AI-powered assistant.

## ✨ Features

*   **Role-Based Simulation Engine:** Experience the election process from different perspectives:
    *   **Voter:** Journey through registration, verification, and casting a vote.
    *   **Candidate:** Experience the nomination, campaigning, and election process.
    *   **Election Officer:** Manage a polling booth and ensure fair elections.
*   **Interactive Election Timeline:** A visual, step-by-step timeline detailing the chronological phases of an Indian election.
*   **AI Election Assistant:** An integrated AI chatbot powered by the Indian Constitution to answer any questions about democratic systems, the Model Code of Conduct, NOTA, and more.
*   **Futuristic UI:** Built with a stunning, glassmorphism-inspired dark theme design using pure CSS.

## 🏗️ Architecture & Tech Stack

*   **Frontend:** Next.js (React), Framer Motion for animations, pure vanilla CSS for styling (Glassmorphism design).
*   **Backend:** FastAPI (Python), providing a robust REST API for the simulation engine and AI endpoints.
*   **Database:** MongoDB for tracking simulation sessions, user progress, and decisions.
*   **AI Integration:** ASSITANT_API_KEY used for the intelligent, constitutionally-grounded AI Assistant.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   Python (3.10+)
*   MongoDB (Local or Atlas)
*   ASSITANT_API_KEY (for AI features)

### 1. Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
```

Create a virtual environment and install dependencies:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Set up your `.env` file in the `backend` directory:
```env
MONGODB_URL=mongodb://localhost:27017
ASSISTANT_API_KEY=your-assistant-api-key-here
```

Run the FastAPI server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup

Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Set up your `.env.local` file (if any environment variables are required by Next.js):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the development server:
```bash
npm run dev
```

### 3. Open the App
Visit `http://localhost:3000` in your browser to experience ElectionSim!

## 📜 License
This project is for educational purposes.
