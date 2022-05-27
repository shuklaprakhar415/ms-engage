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
6. Start development server for react by running following command , this will start your application in http://localhost:3000/ :
```
npm start
```
**Since API is not hosted , we have to serve this as well as locally.**
**Our backend is made on flask ,so ensure that [python](https://www.python.org/downloads/) is installed in your PC**
1. Open new terminal and go to the **backend** directorey by:
```
cd backend
```
2. Create virtual environment by that will create an **env** file , install Virual-Environment if you don't have after this run :
```
virtualenv env
```
3. Now activate the virtual environment by :
```
.\env\Scripts\activate
```
4. Now install the packages in requirements.txt file by :
```
pip install requirements.txt
```
5. Now create a new database file by opening new terminal and running following commands :
```
python
```
```
from app import db
```
```
db.create_all()
```
After doing this you must be seeing a new .db file created in the backend directory.
6. Now open new terminal and confirm if virtual environment is activated or not , then run the development server for our API by :
```
python app.py
```
Now your API will be hosted on http://127.0.0.1:5000 .

**After following all the above instruction you can explore the Attendance Portal application in your local server**
