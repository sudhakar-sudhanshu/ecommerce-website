Full Stack E-Commerce Web Application (React + Django)

A production-ready full-stack e-commerce platform built using React.js and Django REST Framework, featuring secure authentication, seamless payments, and a powerful admin dashboard.

Features
👤 User Features
🔐 JWT-based Authentication (Login/Register)
🛍️ Browse Products with detailed views
🛒 Add to Cart / Remove from Cart
💳 Secure Checkout with Razorpay
📦 Order Placement & Tracking
📱 Fully Responsive UI
🛠️ Admin Features
📊 Admin Dashboard
➕ Add / Edit / Delete Products
📦 Manage Orders & Update Status
👥 Manage Users
🧑‍💻 Tech Stack
Frontend
⚛️ React.js
🎨 CSS / Bootstrap
🔄 Axios (API Calls)
Backend
🐍 Django
🔗 Django REST Framework
🔐 JWT Authentication
Database
🗄️ MySQL
Payment Integration
💳 Razorpay Payment Gateway




React Frontend  →  Django REST API  →  MySQL Database
                        ↓
                  Razorpay Integration


ecommerce-project/
│
├── frontend/         # React App
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/         # Django Project
│   ├── api/
│   ├── models/
│   ├── views/
│   └── serializers/
│
└── README.md


Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project

Backend Setup (Django)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start
🔐 Environment Variables

Create a .env file in backend:

SECRET_KEY=your_secret_key
DEBUG=True
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
💳 Payment Flow
User places order
Razorpay order is created
Payment completed on frontend
Backend verifies payment signature
Order status updated ✅
                  
