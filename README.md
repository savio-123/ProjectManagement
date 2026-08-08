Project Management System

A simple Project Management System built using **Django REST Framework** and **React**.

Features

 Admin

* Login
* Add, edit and delete employees
* Create, edit and delete projects
* Create and manage modules
* Create and manage topics
* Assign topics to employees
* View dashboard and graphs

 Employee

* Login using JWT
* View assigned projects
* View assigned modules
* View assigned topics
* Update topic status
* Add remarks to topics
* View personal dashboard and graphs

Technologies Used

 Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* SQLite

 Frontend

* React
* Vite
* Bootstrap
* Axios
* Recharts

Setup Instructions

 Backend

Open a terminal in the project folder:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required packages:

```bash
pip install django djangorestframework djangorestframework-simplejwt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

 Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

Test Credentials

 Admin

```text
Username: admin
Password: admin123
```

 Employee 1

```text
Username: employee1
Password: empl1@123
```

 Employee 2

```text
Username: employee2
Password: empl2@123
```
**Author**

Savio
