# SEA Catering - Healthy Meal Delivery System

Platform web untuk layanan catering makanan sehat dengan sistem subscription yang dapat disesuaikan.

### Access URLs
**Demo Site**: https://seacatering-compfest.vercel.app

## 🚀 Quick Start

### Demo Accounts
| Email | Password | Role |
|-------|----------|------|
| `admin@seacatering.com` | `admin123` | Admin |
| `test@gmail.com` | `Test1234@` | User |
| `sari.dewi@gmail.com` | `Test1234@` | User |
| `budi.santoso@gmail.com` | `Test1234@` | User |

*Note: Semua user account menggunakan password yang sama: `Test1234@`*

## 💻 Local Development

### Prerequisites
- Node.js 18+
- MySQL 8.0+

### Setup Steps
```bash
# 1. Clone repository
git clone
cd sea-catering

# 2. Backend setup
cd backend
npm install
npm run db:setup
npm run dev

# 3. Frontend setup
cd frontend
npm install
npm run dev
```

## 🌐 How to Use

### Public Features
1. **Homepage** - Lihat informasi perusahaan dan fitur
2. **Menu** - Browse meal plans (Diet, Protein, Royal)
3. **Contact** - Info kontak dan form pesan
4. **Login/Register** - Daftar akun baru atau login

### User Features (Login Required)
1. **Subscription** - Pilih meal plan dan buat subscription
2. **Dashboard** - Kelola subscription Anda:
   - Lihat detail subscription
   - Pause/resume subscription
   - Cancel subscription
   - Write review (hanya untuk active subscription)

### Admin Features (admin@seacatering.com)
1. **Admin Dashboard** - Analytics dan management:
   - View subscription metrics
   - Manage meal plans
   - Approve testimonials
   - Track revenue

## 📱 How to Subscribe

1. **Register/Login** di halaman login
2. **Browse Menu** - lihat meal plans available
3. **Go to Subscription** page
4. **Fill form**:
   - Pilih meal plan (Diet/Protein/Royal)
   - Pilih meal types (Breakfast/Lunch/Dinner)
   - Pilih delivery days
   - Isi allergies (optional)
5. **Submit** - subscription akan pending review


## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL, Prisma ORM
- **Auth**: JWT, Bcrypt

## 📂 Project Structure

```
sea-catering/
├── frontend/          # Next.js app
├── backend/           # Express API
└── schema.sql          # Database dump
```

## 🔐 Security

- Password encryption dengan bcrypt
- JWT authentication
- Input validation & sanitization
- XSS & SQL injection protection
- Rate limiting

## 📞 Contact

**Manager**: Brian  
**Phone**: 08123456789  
**Email**: admin@seacatering.com

---

*Healthy Meals, Anytime, Anywhere* 🥗
