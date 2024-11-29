# 📝 ToDo App with Supabase Authentication

A feature-rich ToDo application integrated with Supabase for user authentication and task management.

---

## 🚀 Features

- **Authentication**:
  - Sign Up, Login, Logout, Password Reset functionalities using Supabase.
- **Task Management**:
  - Add new tasks with a name, content, and due date.
  - Mark tasks as completed.
  - Edit existing tasks.
  - Delete tasks no longer needed.
- **Data Persistence**:
  - All tasks are securely stored in a Supabase database, tied to the logged-in user's account.
- **Responsive Design**:
  - Fully responsive and optimized for mobile and desktop devices.

---

## 🌍 Live Demo

This project is live and hosted on **Vercel**.  
You can check out the deployed version here: [Live Demo](https://react-todo-e80mfzg31-arata-tanakas-projects.vercel.app/login)

---

## 📸 Screenshots

### Main View (Logged-In User)
<img src="https://github.com/user-attachments/assets/0adb7eeb-4511-45f6-976a-450244261686" width=500px>

### Add Task
<img src="https://github.com/user-attachments/assets/103814d7-c0b0-454b-97fc-71315ef88c2f" width=500px>

### Login Page
<img src="https://github.com/user-attachments/assets/a60452db-31a3-407d-a6db-b11c323fab8a" width=500px>

---

## 🛠️ Installation & Setup

Follow these steps to run the app locally:

### Prerequisites

- Node.js (version 16 or above)
- npm or yarn installed
- Supabase account and project

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/arata-7/React-todo-app.git
   cd todo-app

   ```

2. **Set up Supabase**:

- Create a Supabase project.
- Add a `todos` table with the following columns:

  | Column Name | Type    | Description                    |
  | ----------- | ------- | ------------------------------ |
  | `id`        | integer | Primary key                    |
  | `name`      | text    | Task name                      |
  | `content`   | text    | Task details                   |
  | `date`      | date    | Due date for the task          |
  | `completed` | boolean | Completion status (true/false) |
  | `user_id`   | text    | Foreign key to `auth.users.id` |

---

3 **Set up environment variables**:

- Create a `.env` file in the root of your project and add the following:

  ```env
  REACT_APP_SUPABASE_URL=<Your Supabase URL>
  REACT_APP_SUPABASE_ANON_KEY=<Your Supabase Public Anon Key>
  ```

4. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

5. **Start the development server**:

   ```bash
   npm start
   # or
   yarn start
   ```

6. **Open your browser and navigate to**:

   ```arduino
   http: //localhost:3000
   ```

---

## ⚙️ Technology Stack

- **Frontend**: React, React Router, React Icons
- **Authentication & Backend**: Supabase
- **State Management**: React's `useState` and `useEffect`
- **Styling**: Custom CSS

---

## 📂 Folder Structure

```plaintext
src/
├── components/    # Reusable UI components
├── view/          # Auth-related pages (Login, Signup, Reset Password)
├── App.js         # Main App component
├── supabaseClient.js  # Supabase client configuration
├── index.js       # Entry point
├── App.css        # Styles
└── ...
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with your enhancements.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 👨‍💻 Author

**Your Name**

- **GitHub**: [arata-7](https://github.com/arata-7)
- **LinkedIn**: [Arata Tanaka](https://www.linkedin.com/in/arata-tanaka-9aa2a021b/)
