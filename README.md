# TryNow AI Clothes Fullstack

An AI-powered virtual clothes try-on application built with a modern fullstack architecture.
Users can upload/select images, try outfits virtually using AI generation, and manage results through a responsive frontend and scalable backend.

---

## 🚀 Features

* AI Virtual Clothes Try-On
* Upload User Photos
* Outfit Template Selection
* AI Generated Preview Images
* Before / After Comparison Slider
* Authentication System
* Subscription / Payment Integration Ready
* Responsive Mobile-Friendly UI

---

## 🛠 Tech Stack

### Frontend

* React Native / Expo
* Expo Router
* Axios
* React Navigation
* RevenueCat / Razorpay (Optional)

### Backend

* Node.js
* Express.js
* MongoDB / Mongoose
* JWT Authentication
* Cloudinary / Image Storage
* Replicate API / AI Model Integration

---

## 📁 Project Structure

```bash
project-root/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── assets/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
REPLICATE_API_TOKEN=your_replicate_api_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/ramji07/trynow.git
cd trynow
```

---

## Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### User

```http
GET /api/user/profile
PUT /api/user/profile
```

### AI Try-On

```http
POST /api/tryon/generate
POST /api/tryon/upload
GET /api/tryon/history
```

---

## 📸 Screenshots

Add your app screenshots here:

```md
![Home Screen](./screenshots/home.png)
![Generate Screen](./screenshots/generate.png)
```

---

## 🚀 Deployment

### Frontend

* Expo EAS Build
* Play Store / App Store

### Backend

* Render / Railway / VPS / AWS

---

## 🔒 Security Notes

* Never commit `.env` files
* Rotate exposed API keys immediately
* Use `.env.example` for sharing config format

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ramjee Chaurasiya**
Full Stack Developer

GitHub: https://github.com/ramji07

---
