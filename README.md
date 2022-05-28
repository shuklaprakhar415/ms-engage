# Attendance Portal
This a an attendance tracker system which uses facial recognition technology for the same purpose.

## Tech Stack:
- **Flask-** A python framework for web development.
- **face_recognition** library by Adam Geitgey
- **React-** JavaScript Library for building user interfaces
- **Firebase** For teachers authentication.

## Features:

- ### Teacher
Teacher need to signup/signin to acces these features.

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
1. Open new terminal and go to the **backend** directory by:
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
By default in windows the execution property is set Restricted. This will restrict the activation of virtual environment. To change the execution policy use following commands on  Windows PowerShell as Administrator :
```
Set-ExecutionPolicy Unrestricted -Force
```
4. Now install the packages in requirements.txt file by :
```
pip install requirements.txt
```
It is to be noted that **face_recognition** requires **dlib library** , and dlib requires C program to use.
Thus, install **VS Code community version** and install **Desktop development with C++** to install dlib. Detail of this is given [here](https://medium.com/analytics-vidhya/how-to-install-dlib-library-for-python-in-windows-10-57348ba1117f#:~:text=Now%20we%20can%20install%20dlib,need%20to%20install%20CMake%20library.&text=Then%2C%20you%20can%20install%20dlib%20library%20using%20pip%20install%20.&text=After%20passing%20enter%2C%20you%20laptop,run%20the%20C%2C%20C%2B%2B%20Compiler.).

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
<p float="left">
<img src="https://user-images.githubusercontent.com/78557330/170707726-c2dc9b04-df31-412a-994b-794bd54c8be5.png" width="300">
<img src="https://user-images.githubusercontent.com/78557330/170708517-c76e221b-18bb-4500-a148-3b75f00683a0.png" width="300">
<img src="https://user-images.githubusercontent.com/78557330/170708902-76c9f629-e612-4de1-8981-1c690ecb28b8.png" width="300">
<img src="https://user-images.githubusercontent.com/78557330/170708900-430e4cf8-d47a-4c7b-a827-28a8a8cf506e.png" width="300">
<img src="https://user-images.githubusercontent.com/78557330/170708897-7ffed155-0520-4c45-b58b-d3ea4630ffcc.png" width="300">
<img src="https://user-images.githubusercontent.com/78557330/170708890-83669a07-b0f0-455a-a588-4956f80ea44e.png" width="300">
</p>

