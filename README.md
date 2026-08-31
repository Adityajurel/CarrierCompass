
# CareerCompass AI 🚀

CareerCompass AI is a full-stack web application designed to help students and job seekers make better career and education decisions.

The platform combines **AI-powered resume analysis** with a **college prediction system** to provide personalized career insights and college recommendations.

---

## 🌐 Live Application

Frontend: https://carrier-compass-ten.vercel.app/

Backend: https://carriercompass-backend.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Access and refresh token mechanism
- HTTP-only cookies for token storage
- Protected routes
- Logout and session management

### 📄 AI Resume Analyzer
Users can upload their resume and receive AI-powered analysis.

The system provides:
- ATS Score
- Resume strengths
- Weaknesses
- Missing skills
- Career recommendations
- Personalized improvement suggestions

### ☁️ Resume Upload
- Resume upload using Cloudinary
- PDF text extraction
- Secure backend processing
- AI analysis using Gemini API

### 🎓 College Predictor
CareerCompass includes a rank-based college prediction system.

Users can provide:
- Examination (JEE / NEET)
- Rank
- Category
- Quota
- Gender
- Preferred state
- Preferred branch

The system uses historical cutoff data to filter and recommend suitable colleges.

Each recommendation includes:
- College name
- Branch
- Opening rank
- Closing rank
- Recommendation score
- Safe / Target / Reach classification
- NIRF rank
- Seats
- Average package
- Highest package
- Fees
- College website

### 📊 Dashboard
The dashboard provides a centralized interface for:
- Resume management
- Resume analysis
- AI insights
- College prediction
- Career recommendations

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Multer

### Database
- MongoDB
- Mongoose

### AI & Services
- Google Gemini API
- Cloudinary
- PDF text extraction

### Deployment & Tools
- Vercel
- Render
- Git
- GitHub
- Postman
- VS Code

---

## 🏗️ Project Architecture

```text
CareerCompass
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── context/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── scripts/
│   │   └── config/
│   └── ...
│
└── README.md
````

---

## 🔄 Resume Analysis Workflow

```text
User
  │
  ▼
Upload Resume
  │
  ▼
Backend API
  │
  ▼
Cloudinary
  │
  ▼
Download PDF
  │
  ▼
Extract Resume Text
  │
  ▼
Gemini API
  │
  ▼
AI Analysis
  │
  ├── ATS Score
  ├── Strengths
  ├── Weaknesses
  ├── Missing Skills
  └── Career Recommendations
  │
  ▼
MongoDB
  │
  ▼
Dashboard
```

---

## 🎓 College Prediction Workflow

```text
User Input
   │
   ├── Exam
   ├── Rank
   ├── Category
   ├── Quota
   ├── Gender
   ├── State
   └── Branch
        │
        ▼
Historical Cutoff Data
        │
        ▼
Filter Matching Colleges
        │
        ▼
Recommendation Scoring
        │
        ▼
Safe / Target / Reach
        │
        ▼
College Recommendations
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=your_frontend_url
```

### Frontend

Configure the backend API URL according to your environment.

**Do not commit `.env` files or API keys to GitHub.**

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Adityajurel/CarrierCompass.git
cd CarrierCompass
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create the required `.env` files and add your credentials.

### 5. Start backend

```bash
npm run dev
```

### 6. Start frontend

```bash
npm run dev
```

The application can then be accessed through the local frontend development server.

---

## 📌 Key Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack application development
* REST API development
* JWT authentication and protected routes
* MongoDB database design
* File upload and cloud storage
* PDF processing
* AI API integration
* Recommendation system development
* Frontend-backend integration
* Deployment using Vercel and Render
* Debugging production issues such as CORS, authentication, API and deployment errors

---

## 🔮 Future Improvements

* Support for additional examination categories
* More comprehensive college datasets
* Advanced recommendation algorithms
* Job recommendation system
* Resume templates
* Career roadmap generation
* More detailed college comparison features

---

## 👨‍💻 Developer

**Aditya Jurel**

B.Tech -- Computer Science and Engineering
Institute of Engineering and Technology, Lucknow

GitHub: https://github.com/Adityajurel

LinkedIn: https://www.linkedin.com/in/aditya-jurel-574506295

---

## 📄 License

This project is developed for educational and portfolio purposes.

