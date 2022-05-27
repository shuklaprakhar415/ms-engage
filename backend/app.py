from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
import base64
import os
from pathlib import Path
import cv2
import numpy as np
import face_recognition
from imageio import imread
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "prakharshukla"
UPLOAD_FOLDER = 'backend\static\ImgUploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///attendanceflask.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


db = SQLAlchemy(app)
ma = Marshmallow(app)

# Defining Database Model 
class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admission_No = db.Column(db.String(10))
    student_name = db.Column(db.String(50))
    uploaded_image_extension = db.Column(db.String(10) , default="")
    image_uploaded = db.Column(db.Boolean, default=False)
    present_status = db.Column(db.Boolean, default=False)
    date = db.Column(db.String(20), default="00:00")
    
    def __init__(self, admission_No, student_name):
        self.admission_No = admission_No
        self.student_name = student_name


class StudentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'admission_No', 'student_name', 'uploaded_image_extension',
                  'image_uploaded', 'present_status', 'date')


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)


# ---Getting Student list Route---
@app.route('/get', methods=['GET'])
def get_student_list():
    all_students = Students.query.all()
    results = students_schema.dump(all_students)
    return jsonify(results)

# ---Adding Student Name and Admission No list Route---
@app.route('/add_student', methods=['POST'])
def add_student():
    admission_No = request.json['admission_No']
    student_name = request.json['student_name']
    student = Students.query.filter_by(admission_No=admission_No).first()
    # If admission no already exists in database
    if student != None:
        res = jsonify({'message' : 'Admission no. already exists.' , 'added':'0'})
        return res
    students = Students(admission_No, student_name)
    db.session.add(students)
    db.session.commit()
    res = jsonify({'message' : 'Student Added Successfully' , 'added':'1'})
    return res


# ---Deleting Student Route---
@app.route('/delete_student/<admission_No>/', methods=['DELETE'])
def delete_student(admission_No):
    student = Students.query.filter_by(admission_No=admission_No).first()
    # Deleting the same from static/ImgUploads folder
    filename = f'backend\static\ImgUploads\{admission_No}{student.uploaded_image_extension}'
    if os.path.exists(filename):
        os.remove(filename)
    db.session.delete(student)
    db.session.commit()
    res = jsonify({'message': 'Deleted Successfully' , 'isSuccess' : 'yes'})
    return res


# ---Adding Student Image Route---
@app.route('/add_student/image_upload/<admission_No>/', methods=['POST'])
def add_student_image(admission_No):
    student = Students.query.filter_by(admission_No=admission_No).first()
    if 'file' not in request.files:
        res = jsonify({'message': 'No file part in the request'})
        res.status_code = 400
        return res
    file = request.files['file']
    if file.filename == '':
        res = jsonify({'message': 'No file part in the request'})
        res.status_code = 400
        return res
    if file and allowed_file(file.filename):
        filename = file.filename
        file_extension = os.path.splitext(filename)[1]
        filename = f'{admission_No}{file_extension}'
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        student.image_uploaded = True
        student.uploaded_image_extension = file_extension
        db.session.commit()
        res = jsonify({'message': 'File successfully uploaded'})
        res.status_code = 200
        return res
    else:
        res = jsonify({'message': 'Allowed file types are png, jpg, jpeg'})
        res.status_code = 400
        return res


# ---Marking Attendance Route---
# ---Corner Cases Handeling---
@app.route('/mark_attendance/<admission_No>/', methods=['POST'])
def mark_attendance(admission_No):
    student = Students.query.filter_by(admission_No=admission_No).first()
    if student == None:
        res = jsonify({'message' : 'Admission no. not found.' , 'matched' : '0'})
        return res
    if student.present_status:
        res = jsonify({'message' : 'This Admission no. has already been marked present' , 'matched' : '1'})
        return res
    base64_string = request.json['base64_string']
    def data_uri_to_cv2_img(uri):
        encoded_data = uri.split(',')[1]
        nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img

    img =data_uri_to_cv2_img(base64_string)
    img_test = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    img_encoding_test = face_recognition.face_encodings(img_test)
    if(student.image_uploaded == False):
        res = jsonify({'message' : 'Image not uploaded by teacher.' , 'matched' : '0'})
        return res
    if len(img_encoding_test) == 0 :
        res = jsonify({'message' : 'Face not detected , try again.' , 'matched' : '0'})
        return res
    path = 'backend\static\ImgUploads'
    myList = os.listdir(path)
    for cl in myList:
        img_found = cv2.imread(f'{path}/{cl}')
        img_real = cv2.cvtColor(img_found, cv2.COLOR_RGB2BGR)
        img_encoding_real = face_recognition.face_encodings(img_real)[0]
        result = face_recognition.compare_faces([img_encoding_real],img_encoding_test[0])
        name = os.path.splitext(cl)[0]
        if name == admission_No  :
            if result[0] :
                student.present_status = True
                now = datetime.now()
                dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
                student.date = dt_string
                db.session.commit()
                message = f'Attendance for {student.student_name} is marked successfully'
                res = jsonify({'message': message , 'matched' : '1'})
                return res
            else :
                res = jsonify({'message': 'Face not matched' , 'matched' : '0'})
                return res
        
    res = jsonify({'message' : 'error occured' , 'matched' : '0'})
    return res


if __name__ == "__main__":
    app.run(debug=True)
