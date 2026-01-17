# TaskFlow 📝
**TaskFlow** is a comprehensive full-stack task management platform that empowers users to efficiently organize and track their to-dos. With its intuitive interface and robust features, TaskFlow simplifies task management, allowing users to focus on what matters most.


## Features ✨
**🔑 Authentication & Authorization:**
- Users must sign up or log in to create, read, edit, or delete tasks.
- *JSON Web Tokens (JWT)* handles authentication.
- Users must be logged in to access and manage their tasks.

**📝 Task Management (CRUD Operations):**
- Users can seamlessly create, read, update, and delete tasks.
- Edit tasks with ease and revert changes if needed.
- Secure User Access: Only the owner of a task can edit or delete it.

**🖥️ User Interface:**
- Responsive design for optimal viewing on any device.
- Intuitive and easy to navigate, even for those new to task management platforms.

**🍪 Persistent Sessions:**
- Employs cookies and sessions to persist user logins, enhancing user experience.


## Tech Stack 🛠️
### Frontend:
- **React:** For a dynamic and responsive UI.
- **Redux:** For state management.
- **React Router:** For navigation.
- **Axios:** For API calls.
- **Tailwind CSS:** For styling.
- **Font Awesome:** For icons.

### Backend:
- **Node.js & Express.js:** Core backend framework for handling requests.
- **MongoDB & Mongoose:** NoSQL database for storing users and tasks.
- **JSON Web Tokens (JWT):** For authentication.
- **bcrypt:** For password hashing.
- **cors:** For handling cross-origin requests.

### Authentication & Validation:
- **JWT:** User authentication.
- **bcrypt:** Password hashing.

### Error Handling:
- **Toastify:** For displaying success and error notifications on the frontend.
- **Backend API Responses:** Detailed error messages provided in API responses for debugging and user feedback.

### Session Management & Security:
* Secure sessions & cookies managed via JWT.
* Data validation is implemented in both frontend and backend.


## How to Run Locally 🖥️
### Prerequisites
* Node.js installed on your system
* A code editor like VS Code
* Git (Optional, but recommended for version control)
* MongoDB (Local or Atlas)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vaishaligupta90/TaskFlow.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd TaskFlow
    ```

3.  **Install dependencies for both frontend and backend:**
    ```bash
    cd frontend
    npm install
    cd ..
    cd backend
    npm install
    ```

4.  **Set up environment variables:**
    * Create a `.env` file in the `backend` directory and add the following:
    ```bash
    ACCESS_TOKEN_SECRET=your_jwt_secret_key
    PORT=8080 (or your preferred port)
    MONGODB_URL=your_mongodb_connection_string
    ```

5.  **Run the app:**
    * For development:
    ```bash
    # In one terminal window (Backend):
    npm run dev
    
    # In another terminal window (Frontend):
    npm start
    ```

6.  **Open your browser and navigate to:**
    * Development: `http://localhost:3000`
    * Production: Hosted URL (if deployed)


## Contributing 🤝
*Contributions* are welcome! If you'd like to contribute, please fork the repository and submit a pull request.


## Contact 📞
For questions or feedback, feel free to reach out to me at vaishaliagrahari137@gmail.com .
