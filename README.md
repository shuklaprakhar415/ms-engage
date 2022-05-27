# Attendance Portal
This a an attendance tracker system which uses facial recognition technology for the same purpose.

## Tech Stack:
- **flask-** A python framework 
- **face_recognition** library by Adam Geitgey
- **react-** JavaScript Library for building user interfaces

## Features:

- ### Teacher
    - Can add new student using student name and admission no.
    - Can add test image (without it student will not be able to mark attendance)
    - Remove student from list.
    - Check the present/absent status of student and also date and time.
- ### Student
    - Can mark attendance by capturing his image from webcam and filling admission no. in form.
    - Along with all this, required response will be give if the face is **not detected** , **not matched** , or **already have been marked attended.**
## Local Setup
1. Clone the github repository.
```
https://github.com/shuklaprakhar415/ms-engage.git 
```
2. Open the folder in Visual Studio Code.

3. There are two folders named as **frontend** and **backend**.
- Go to the frontend directory :
```
cd frontend
```
4. Ensure that you have [Node.js](https://nodejs.org/en/) installed.
5. Install required dependencies by :
```
npm install
```
