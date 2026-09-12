# Sheikh Online Service

Full-stack ISP website built with **Next.js 15**, **MySQL** (via Prisma ORM) and NextAuth.js.

## 🗄️ Database: MySQL

Uses **Prisma ORM** — type-safe, auto-migration, works with any MySQL host.

### Cloud MySQL Options (Free)
| Provider | Free Tier | URL |
|---|---|---|
| **Railway** | $5 credit/month | railway.app |
| **Aiven** | 1 node free | aiven.io |
| **PlanetScale** | (MySQL-compatible) | planetscale.com |
| **Local** | Always free | localhost:3306 |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure database in `.env.local`
```env
# Local MySQL example:
DATABASE_URL="mysql://root:password@localhost:3306/sheikh_online"

# Railway example:
DATABASE_URL="mysql://root:xxxx@containers.railway.app:PORT/railway"
```

### 3. Run database migrations
```bash
npm run db:push
# or for production:
npm run db:migrate
```

### 4. (Optional) View database in browser
```bash
npm run db:studio
# Opens Prisma Studio at http://localhost:5555
```

### 5. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app/
  page.js            ← Homepage (Swiper hero + all sections)
  layout.js          ← Root layout
  globals.css        ← All styles
  about/page.js      ← About page
  pricing/page.js    ← Full pricing grid
  coverage/page.js   ← Coverage area
  pay-bill/page.js   ← bKash/Nagad/Rocket
  offers/page.js     ← Special deals
  contact/page.js    ← Contact form
  dashboard/page.js  ← Customer self-care
  admin/page.js      ← Admin panel
  api/
    contact/route.js       ← POST/GET contacts
    orders/route.js        ← POST/GET/PATCH orders
    auth/[...nextauth]/    ← JWT login

lib/
  db.js              ← Prisma client singleton

prisma/
  schema.prisma      ← MySQL table definitions
```

---

## 🗃️ Database Tables (MySQL)

```sql
contacts  (id, name, phone, email, message, status, createdAt)
orders    (id, plan, speed, price, fullName, phone, address, status, createdAt)
users     (id, name, phone, password, role, plan, planSpeed, planPrice, createdAt)
offers    (id, title, description, discount, validUntil, isActive, createdAt)
```

---

## 🌐 Deploy to Vercel + Railway MySQL

1. Push to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. [railway.app](https://railway.app) → New → MySQL → copy `DATABASE_URL`
4. Add all env vars in Vercel dashboard
5. Deploy!