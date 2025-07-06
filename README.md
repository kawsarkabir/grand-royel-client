## React Base JavaScript Boilerplate 🚀

A modern **React v19 + React Router v7 + JavaScript** boilerplate featuring **Firebase Auth (Email & Social login)**, **Tailwind CSS v4**, **ESLint**, **Prettier**, **Husky**, and more for a professional and scalable development workflow.

---

#### ⚡ Features

- ✅ **React v19**
- ✅ **React Router v7**
- ✅ **Tailwind CSS v4**
- ✅ **Firebase Authentication**
  - Email/password sign up + verification
  - Google and GitHub login support
- ✅ **Shadcn UI ready** (Radix UI, Lucide React icons, CVA)
- ✅ **Vite v6** – blazing-fast dev/build
- ✅ **ESLint v9** with Tailwind & React rules
- ✅ **Prettier** – code formatting
- ✅ **Husky & lint-staged** – pre-commit hooks
- ✅ **Commitlint** – conventional commits enforced
- ✅ **TypeScript Support (optional)**
- ✅ **Path Aliases (@/**)
- ✅ **Hot Module Replacement (HMR)**
- ✅ **Production Optimized**

---

#### 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/kawsarkabir/react-base-javascript-boilerplate.git
cd react-base-javascript-boilerplate
npm install
```

---

#### 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable **Email/Password**, **Google**, and **GitHub** in **Authentication > Sign-in method**
3. Add a web app to your project and copy the Firebase config

Create a `.env` file in the project root with the following keys:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here

```

> ⚠️ For **GitHub login**, make sure you configure the **OAuth redirect URI** in Firebase and GitHub Developer Console:
>
> - Firebase will ask for: \`https://your-domain.firebaseapp.com/__/auth/handler\`
> - GitHub OAuth app will need \`Client ID\` and \`Client Secret\`

---

#### 🚀 Usage

| Command              | Description                  |
| -------------------- | ---------------------------- |
| \`npm run dev\`      | Start the development server |
| \`npm run build\`    | Build for production         |
| \`npm run lint\`     | Lint code with ESLint        |
| \`npm run format\`   | Format code with Prettier    |
| \`npm run lint:fix\` | Auto-fix lint errors         |

---

#### 📂 Folder Structure

```
react-base-javascript-boilerplate/
│── src/
│ ├── assets/ # Static assets
│ ├── components/ # Reusable components
│ ├── context/ # Auth context (Firebase)
│ ├── config/ # Firebase config file
│ ├── hooks/ # Custom Hooks if need
│ ├── utils/ # Utility functions
│ ├── routes/ # All Routing Setup
│ ├── main.jsx # Entry point
│ └── index.css # Global Tailwind styles
│── .env # Firebase API keys (NOT COMMITTED)
│── .husky/ # Git hooks (pre-commit)
│── .commitlintrc.json # Commit message rules
│── .prettierrc.json # Prettier config
│── .prettierignore # Ignore formatting on files
│── .gitignore # Files ignored by git
│── eslint.config.js # ESLint config
│── jsconfig.json # JavaScript project paths
│── package.json # Scripts & dependencies
│── vite.config.js # Vite config (aliases, env, etc.)
│── index.html # App HTML shell
│── README.md # You're reading it
```

---

#### 🔐 Firebase Auth Features

- 🔒 **Email/Password login**
- ✉️ **Email verification before login**
- 🌐 **Social Login** – Google and GitHub
- 🔁 **Reset password**
- ⚠️ **Blocked login for unverified emails**
- 🔥 Auth state synced with context API

---

#### 🔗 Get In Touch

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white&height=20)](mailto:devkawsarkabir@gmail.com)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white&height=20)](https://facebook.com/devkawsarkabir)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white&height=20)](https://youtube.com/@kawsarkabir)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&height=20)](https://linkedin.com/in/kawsarkabir)
[![Medium](https://img.shields.io/badge/Medium-000000?style=for-the-badge&logo=medium&logoColor=white&height=20)](https://medium.com/@kawsarkabir)
