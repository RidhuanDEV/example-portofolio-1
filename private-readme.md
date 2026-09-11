# Admin CMS Login Information

This private document outlines the administrator login details for the Portfolio CMS.

## 🔐 Credentials Configuration

Your CMS credentials are managed securely via environment variables in your local `.env` file.

- **Admin Login Email**: Defined by the `ADMIN_EMAIL` variable inside your `.env` file.
  - *Default from template:* `admin@example.com`
- **Admin Password**: Configured as a hashed value under the `ADMIN_PASSWORD_HASH` variable in `.env`.

---

## 🛠️ How to Retrieve or Set Your Credentials

### 1. View Current Email
Open your `.env` or `.env.local` file in the root of the project and look for:
```env
ADMIN_EMAIL=your-email@example.com
```
Use that email address to log in.

### 2. Reset / Set Your Password
Since the password is saved as a secure bcrypt hash (`ADMIN_PASSWORD_HASH`), you cannot view the plain-text password directly. If you forgot or want to configure your password:
1. Run the password hashing utility script in your terminal:
   ```bash
   npm run hash-pass -- your_new_password
   ```
2. Copy the generated hash line:
   ```text
   ADMIN_PASSWORD_HASH=$2b$12$EXAMPLE_HASH_OUTPUT...
   ```
3. Open your `.env` (or `.env.local`) file and update the `ADMIN_PASSWORD_HASH` line with the copied hash value.
4. You can then log in using `your_new_password` as the password.

---

## 🚀 How to Sign In
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) in a native browser tab (avoid using IDE inner preview panels due to NextAuth iframe limitations).
3. The system will redirect you to the login screen:
   - **Email:** The email configured in `ADMIN_EMAIL` (e.g., `admin@example.com`).
   - **Password:** The plain-text password you hashed (e.g., `your_new_password`).
4. Click **Sign in with Admin credentials**.
