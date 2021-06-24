from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy import Boolean, Column, Float, String, Integer,DateTime
from sqlalchemy.sql.expression import and_, delete, insert, true
from sqlalchemy import or_
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from itsdangerous import URLSafeTimedSerializer
from fastapi import (
    FastAPI, 
    BackgroundTasks, 
    UploadFile, File, 
    Form, 
    Query,
    Body,
    Depends,
    HTTPException
)
from fastapi.responses import HTMLResponse
from starlette.responses import JSONResponse
from starlette.requests import Request
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from pydantic import EmailStr, BaseModel
from typing import List
from fastapi_mail.email_utils import DefaultChecker
from passlib.context import CryptContext

app = FastAPI()

# SqlAlchemy Setup
SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://root@localhost:3306/test'
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

SECRET_KEY = 'my_precious'
SECURITY_PASSWORD_SALT = 'my_precious_two'

origins = [

    "https://admission-portal-msit-bhanu.herokuapp.com/"

]



app.add_middleware(

    CORSMiddleware,

    allow_origins=['*'],

    allow_credentials=True,

    allow_methods=['*'],

    allow_headers=['*'],

)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ********************************Register*****************************************************

# A SQLAlchemny ORM Place
class DBStudent(Base):
    __tablename__ = 'ma_users'

    username = Column(String(100))
    email = Column(String(100), primary_key=True)
    password = Column(String(128))
    salt = Column(String(128))
    usertype = Column(String(20))
    status = Column(String(128))
    board_name = Column(String(10))
    board_number = Column(String(50))
    btech = Column(String(50))
    phone_no = Column(String(20))
    photo_status = Column(String(10))
    profileupdate = Column(String(10))
    educationdetails_status = Column(String(10))
    created = Column(DateTime(timezone=True), server_default=func.now())
    email_status = Column(String(10))
    


# ********************************Login & Walkin*****************************************************

class Profile(Base):
    __tablename__ = 'ma_user_profile'

    email=Column(String(100), primary_key=True)
    full_name=Column(String(100))
    gender=Column(String(100))
    date_of_birth=Column(String(100))
    nationality=Column(String(100))
    address_line1=Column(String(1000))
    address_line2=Column(String(100))
    place_town=Column(String(100))
    city=Column(String(100))
    pincode=Column(String(100))
    mobile_no=Column(String(100))
    landline_no=Column(String(100))
    parent_name=Column(String(100))
    parent_relation=Column(String(100))
    image_url=Column(String(100))
    # passed_out=Column(String(80))
    # branch=Column(String(100))
class Walkin(Base):
    __tablename__ = 'walkinapplications'
    # id = Column(Integer,nullable=False,primary_key=True,unique=True,autoincrement=True)
    email=Column(String(100)) 
    walkinAppNo=Column(String(100),primary_key=True,unique=True)
    testCenter=Column(Integer)
    slotdate=Column(String(100))
    slotNo=Column(Integer)
    verbalMarks=Column(Integer)
    quantMarks=Column(Integer)
    reasoningMarks=Column(Integer)
    total=Column(Integer)
    testTaken=Column(String(100))
    paymentType=Column(String(100))
    paymentStatus=Column(String(100))
class gat_application_details(Base):
    __tablename__ = 'gat_application_details'
    email=Column(String(50),primary_key=True) 
    applicationno=Column(String(20))
    testcenter=Column(String(5))
    examtype=Column(String(5))
    grescore=Column(Integer)
    greanalytical=Column(Float)
    paymentType=Column(String(100))
    paymentStatus=Column(String(10))
    created = Column(DateTime(timezone=True), server_default=func.now())
    
class slotavailability(Base):
    __tablename__ = 'slotavailability'
    id = Column(Integer, primary_key=True,autoincrement=True)
    hyd_1 = Column(Integer)
    hyd_2 = Column(Integer)
    hyd_3 = Column(Integer)
    kakinada_1 = Column(Integer)
    kakinada_2 = Column(Integer)
    kakinada_3 = Column(Integer)
    jntuh_1 = Column(Integer)
    jntuh_2 = Column(Integer)
    jntuh_3 = Column(Integer)
    slotdate = Column(String(30))


Base.metadata.create_all(bind=engine)


# A Pydantic Place
class UserDetails(BaseModel):
    username:str
    email:str
    password:str
    phone_no:str
    
    class Config:
        orm_mode = True

class EmailSchema(BaseModel):
    email: List[EmailStr]



# ********************************Login & Walkin*****************************************************


class User(BaseModel):
    username:str
    email:str
    password:str
    salt:Optional[str]=None
    usertype:Optional[str]=None
    status:Optional[str]=None
    board_name:Optional[str]=None
    board_number:Optional[str]=None
    btech:Optional[str]=None
    phone_no:Optional[str]=None
    photo_status:Optional[str]=None
    profileupdate:Optional[str]=None
    educationdetails_status:Optional[str]=None
    created:Optional[datetime]=None
    email_status:Optional[str]=None
    class Config:
        orm_mode = True
class Viewprofile(BaseModel):
    email:str
    full_name:str
    gender:str
    date_of_birth:str
    nationality:str
    address_line1:str
    address_line2:str
    place_town:str
    city:str
    pincode:str
    mobile_no:str
    landline_no:str
    parent_name:str
    parent_relation:str
    image_url:Optional[str]=None
    # passed_out:str
    # branch:str
    class Config:
        orm_mode = True

class View(BaseModel):
    email:str
    full_name:str
    gender:str
    date_of_birth:str
    nationality:str
    address_line1:str
    parent_name:str
    parent_relation:str
    city:str
    pincode:str
    image_url:Optional[str]=None
    # passed_out:str
    # branch:str
    class Config:
        orm_mode = True

class Walkindetails(BaseModel):
    # id:Optional[int] = None

    email:str 
    walkinAppNo:str
    testCenter:int
    slotdate:str
    slotNo:int
    verbalMarks:int
    quantMarks:int
    reasoningMarks:int
    total:int
    testTaken:str
    paymentType:str
    paymentStatus:str
    class Config:
        orm_mode = True

class Img(BaseModel):
    image_url:str
    class Config:
        orm_mode = True
class gatDetails(BaseModel):
    email:str
    applicationno:str
    testcenter:str
    examtype:str
    grescore:Optional[int] = None
    greanalytical:Optional[float] = None
    paymentType:Optional[str]=None
    paymentStatus:Optional[str]=None
    
    class Config:
        orm_mode = True


class ForgotPassword(BaseModel):
    email:str
    salt:str
    password:str

    class Config:
        orm_mode = True


class AvailableSlots(BaseModel):
    hyd_1: int
    hyd_2: int
    hyd_3: int
    kakinada_1: int
    kakinada_2: int
    kakinada_3: int
    jntuh_1: int
    jntuh_2: int
    jntuh_3: int
    slotdate: str

    class Config:
        orm_mode = True


class ChosenSlot(BaseModel):
    slotdate: str
    slottime: str
    slotWalkinAppNo: str
    slotTestcenter: str

class SlotEmail(BaseModel):
    slotdate: str
    slottime: str
    slotWalkinAppNo: str
    slotTestcenter: str
    email: List[EmailStr]


class Sample(BaseModel):
    email:str
    password:str
class Sample4(BaseModel):
    email:str
    walkinAppNo:str
    testCenter:int
    slotdate:str
    slotNo:int
    verbalMarks:int
    quantMarks:int
    reasoningMarks:int
    total:int
    testTaken:str
    paymentType:str
    paymentStatus:str
class Sample3(BaseModel):
    email:str
class Sample2(BaseModel):
    email:str
    full_name:str
    gender:str
    date_of_birth:str
    nationality:str
    address_line1:str
    mobile_no:str
    parent_name:str
    parent_relation:str
    city:str
    pincode:str
    image_url:Optional[str]=None
    # passed_out:str
    # branch:str
class Sample5(BaseModel):
    email:str
    image_url:str




# ********************************Email Config*****************************************************



conf = ConnectionConfig(
    MAIL_USERNAME = "stonedrant247@gmail.com",
    MAIL_PASSWORD = "highoncoke247",
    MAIL_FROM = "stonedrant247@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="MSIT",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ********************************Methods*****************************************************

def create_viewprofile2(stu:Sample2, db:Session):   
    db_user = db.query(Profile).filter(Profile.email == stu.email ) .first() 
    if db_user is None:
        db_stu=Profile(**stu.dict())
        db.add(db_stu)
        db.commit()
        db.refresh(db_stu)
    else:
        for var, value in vars(stu).items():
            setattr(db_user, var, value) if value else None
        db.commit()

def stu_details(stu:Sample3,db: Session):
    return db.query(Profile).filter(Profile.email == stu.email ) .all()
    
def create_walkindetails(walk:Sample4,db:Session):
    db_stu=Walkin(**walk.dict())
    db.add(db_stu)
    db.commit()
    db.refresh(db_stu)

def walkin_details(stu:Sample3, db:Session):
    return db.query(Walkin).filter(Walkin.email == stu.email ) .all()

def get_studetails(stu:Sample,db: Session):
    db_user1 = db.query(DBStudent).filter(DBStudent.email == stu.email ) .first()
    print(stu.password)
    print(DBStudent.password)
    if db_user1 is None:
        return None
    elif db_user1.status!="active":
        return "activeno"
    # elif db_user1.password!=stu.password:
    elif not verify_password(stu.password, db_user1.password):
        return False
    
    else:

        db_user2 = db.query(Profile).filter(Profile.email == stu.email ) .first()
        if db_user2 is None:
            return True
        else:
            return "advtrue"


def update_img(im:Sample5,db: Session):
    db_user2 = db.query(Profile).filter(Profile.email == im.email ) .first()
    for var, value in vars(im).items():
            setattr(db_user2, var, value) if value else None
    db.commit()


# ********************************Register*****************************************************

# Methods
def get_userdetails(db: Session):
    return db.query(DBStudent).all()

def get_studentbyemail(db: Session, emailid: str):
    return db.query(DBStudent).filter(DBStudent.email == emailid).one_or_none()

def create_userdetails(db: Session, user: UserDetails):
    db_user = DBStudent(**user.dict())
    token = generate_confirmation_token(db_user.email)  
    password = get_password_hash(db_user.password)
    salt = get_password_hash(SECURITY_PASSWORD_SALT)
    db_user.password = password
    db_user.salt = salt
    db_user.usertype = "student"
    db_user.status = token
    db_user.board_name = "NA"
    db_user.board_number = "-"
    db_user.btech = "-"
    db_user.photo_status = "no"
    db_user.profileupdate = "no"
    db_user.educationdetails_status = "no"
    db_user.email_status = "no"
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    return serializer.dumps(email, salt=SECURITY_PASSWORD_SALT)


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    try:
        email = serializer.loads(
            token,
            salt=SECURITY_PASSWORD_SALT,
            max_age=expiration
        )
    except:
        # return False
        raise Exception
    return email





def create_gat_details(db: Session,stu:Sample3):
    # return db.query(gat_application_details).all()
    return db.query(gat_application_details).filter(gat_application_details.email == stu.email ) .all()

def create_gat_application(db: Session, stu: gatDetails):
    db_stu = gat_application_details(**stu.dict())
    db.add(db_stu)
    db.commit()
    db.refresh(db_stu)

    return db_stu

def gat_veiwe(db: Session):
    return db.query(gat_application_details).all()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_available_slots(db: Session):
    return db.query(slotavailability).filter(or_(slotavailability.hyd_1<25, slotavailability.hyd_2<25,
    slotavailability.hyd_3<25, slotavailability.kakinada_1<25, slotavailability.kakinada_2<25,
    slotavailability.jntuh_1<25, slotavailability.jntuh_2<25)).all()


# Routes for interacting with the API
@app.post('/Register')
async def create_student_view(user: UserDetails, db: Session = Depends(get_db)):
    db_user = create_userdetails(db, user)
    if db_user is None:
        return {'message':'error'}
    return {'message':'success'}


@app.get('/confirm/{token}', response_class=HTMLResponse)
def confirm_email(token: str, db: Session = Depends(get_db)):
    try:
        email = confirm_token(token)
    except:
        # return {'message' : 'The confirmation link is invalid or has expired.'}
        return """
                <html>
                    <head>
                        <title>Confirmation</title>
                        <style>
                            body {background-color: powderblue;}
                            .messagebox {
                                width: 35%;
                                padding: 5%;
                                border: 5px solid gray;
                                margin: 0;
                                background-color: white;
                                margin-left: 27%;
                                margin-top:15%;
                                color: blue;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                    <div class='messagebox'>
                        <h1>The confirmation link is invalid or has expired. Please Contact Us.</h1>
                    </div>
                    </body>
                </html>
                """
    user = db.query(DBStudent).filter(DBStudent.email==email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Item not found")
    if user.status=='active':
        # return {'message' : 'Account already confirmed. Please login.'}
        return """
                <html>
                    <head>
                        <title>Confirmation</title>
                        <style>
                            body {background-color: powderblue;}
                            .messagebox {
                                width: 35%;
                                padding: 5%;
                                border: 5px solid gray;
                                margin: 0;
                                background-color: white;
                                margin-left: 27%;
                                margin-top:15%;
                                color: blue;
                                text-align: center;
                            }
                            .link {
                                text-align: center;
                                margin-top: 2%;
                                padding: 5px 5px 5px 5px;
                                display:inline-block;
                                border-radius:2em;
                                box-sizing: border-box;
                                text-decoration:none;
                                font-family:'Roboto',sans-serif;
                                font-weight:300;
                                font-size: 1.2vw;
                                color:#FFFFFF;
                                background: linear-gradient(to right, #cc3314 0%, #ff4520 100%);
                                text-align:center;
                                transition: all 0.2s;
                            }

                            .link:hover{
                            background: linear-gradient(to right, #941900 0%, #ff2a00 100%);
                            cursor:pointer;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='messagebox'>
                            <h1>Account already confirmed. Please login.</h1>
                            <a class='link'  align="center" href='http://localhost:3000/Login'>Login</a>
                        </div>
                    </body>
                </html>
                """
    else:
        user.status = 'active'
        db.add(user)
        db.commit()
        # return {'message' : 'You have confirmed your account. Thanks!'}
        return """
                <html>
                    <head>
                        <title>Confirmation</title>
                        <style>
                            body {background-color: powderblue;}
                            .messagebox {
                                width: 35%;
                                padding: 5%;
                                border: 5px solid gray;
                                margin: 0;
                                background-color: white;
                                margin-left: 27%;
                                margin-top:15%;
                                color: blue;
                                text-align: center;
                            }
                            .link {
                                text-align: center;
                                margin-top: 2%;
                                padding: 5px 5px 5px 5px;
                                display:inline-block;
                                border-radius:2em;
                                box-sizing: border-box;
                                text-decoration:none;
                                font-family:'Roboto',sans-serif;
                                font-weight:300;
                                font-size: 1.2vw;
                                color:#FFFFFF;
                                background: linear-gradient(to right, #cc3314 0%, #ff4520 100%);
                                text-align:center;
                                transition: all 0.2s;
                            }

                            .link:hover{
                            background: linear-gradient(to right, #941900 0%, #ff2a00 100%);
                            cursor:pointer;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='messagebox'>
                            <h1>You have confirmed your account. Thanks!</h1>
                            <a class='link'  align="center" href='http://localhost:3000/Login'>Login</a>
                        </div>
                    </body>
                </html>
                """
        
@app.get('/email/{emailid}')
async def check_email(emailid: str, db: Session = Depends(get_db)):
    user = db.query(DBStudent).filter(DBStudent.email==emailid).one_or_none()
    if user is None:
        return {'message' : 'valid'}
    else:
        return {'message' : 'invalid'}


@app.post('/email')
async def send_email(
    email: EmailSchema,db: Session = Depends(get_db)
    ):
    
    emailid = email.dict().get("email")

    user = get_studentbyemail(db,emailid)

    if user is None:
        return {'message' : 'error'}
        # raise HTTPException(status_code=404, detail="Item not found")

    token = user.status

    html = """
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        @media only screen and (max-width: 600px) {
            table[class="table-row"] {
                float: none !important;
                width: 98% !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            table[class="table-row-fixed"] {
                float: none !important;
                width: 98% !important;
            }
            table[class="table-col"], table[class="table-col-border"] {
                float: none !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                table-layout: fixed;
            }
            td[class="table-col-td"] {
                width: 100% !important;
            }
            table[class="table-col-border"] + table[class="table-col-border"] {
                padding-top: 12px;
                margin-top: 12px;
                border-top: 1px solid #E8E8E8;
            }
            table[class="table-col"] + table[class="table-col"] {
                margin-top: 15px;
            }
            td[class="table-row-td"] {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            table[class="navbar-row"] , td[class="navbar-row-td"] {
                width: 100% !important;
            }
            img {
                max-width: 100% !important;
                display: inline !important;
            }
            img[class="pull-right"] {
                float: right;
                margin-left: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            img[class="pull-left"] {
                float: left;
                margin-right: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            table[class="table-space"], table[class="header-row"] {
                float: none !important;
                width: 98% !important;
            }
            td[class="header-row-td"] {
                width: 100% !important;
            }
        }
        @media only screen and (max-width: 480px) {
            table[class="table-row"] {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }
        @media only screen and (max-width: 320px) {
            table[class="table-row"] {
                padding-left: 12px !important;
                padding-right: 12px !important;
            }
        }
        @media only screen and (max-width: 458px) {
            td[class="table-td-wrap"] {
                width: 100% !important;
            }
        }
    </style>
    </head>
    <body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9" leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
    <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
    <tr><td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;">
    <table><tr><td class="table-td-wrap" align="center" width="458"><table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">Thank you for signing up!</td></tr></tbody></table>
        <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;">
        <b style="color: #777777;">We are excited to have you join us in MSIT</b>
        <br>
        Please activate your account to continue
        </div>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
        
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp;<table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>
    <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;">
        <a href='  http://127.0.0.1:8000/confirm/"""+token+""" '  style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #6fb3e0; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #6fb3e0;">
        &nbsp; Activate &nbsp;</a>
        </div>
        <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>

    <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left">
    <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top">
        <p style="color: #428bca; text-decoration: none; background-color: transparent;">MSIT Admissions &copy; 2021</p>
        </td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
    <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table></td></tr></table>
    </td></tr>
    </table>
    </body>
    </html>
        """
    

    message = MessageSchema(
        subject="Activation",
        recipients=emailid,  # List of recipients, as many as you can pass 
        body=html,
        subtype="html"
        )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}

@app.post('/forgotpassword')
async def forgot_password_mail(
    email: EmailSchema,db: Session = Depends(get_db)
    ):
    
    emailid = email.dict().get("email")

    user = get_studentbyemail(db,emailid)

    if user is None:
        return {'message' : 'error'}
        # raise HTTPException(status_code=404, detail="Item not found")

    key = user.salt

    html = """
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        @media only screen and (max-width: 600px) {
            table[class="table-row"] {
                float: none !important;
                width: 98% !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            table[class="table-row-fixed"] {
                float: none !important;
                width: 98% !important;
            }
            table[class="table-col"], table[class="table-col-border"] {
                float: none !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                table-layout: fixed;
            }
            td[class="table-col-td"] {
                width: 100% !important;
            }
            table[class="table-col-border"] + table[class="table-col-border"] {
                padding-top: 12px;
                margin-top: 12px;
                border-top: 1px solid #E8E8E8;
            }
            table[class="table-col"] + table[class="table-col"] {
                margin-top: 15px;
            }
            td[class="table-row-td"] {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            table[class="navbar-row"] , td[class="navbar-row-td"] {
                width: 100% !important;
            }
            img {
                max-width: 100% !important;
                display: inline !important;
            }
            img[class="pull-right"] {
                float: right;
                margin-left: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            img[class="pull-left"] {
                float: left;
                margin-right: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            table[class="table-space"], table[class="header-row"] {
                float: none !important;
                width: 98% !important;
            }
            td[class="header-row-td"] {
                width: 100% !important;
            }
        }
        @media only screen and (max-width: 480px) {
            table[class="table-row"] {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }
        @media only screen and (max-width: 320px) {
            table[class="table-row"] {
                padding-left: 12px !important;
                padding-right: 12px !important;
            }
        }
        @media only screen and (max-width: 458px) {
            td[class="table-td-wrap"] {
                width: 100% !important;
            }
        }
    </style>
    </head>
    <body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9" leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
    <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
    <tr><td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;">
    <table><tr><td class="table-td-wrap" align="center" width="458"><table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">Forgot Password?</td></tr></tbody></table>
        <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;">
        <b style="color: #777777;">You have been given a key in this mail</b>
        <br>
        Use this key to change your password:
        </div>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
        
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp;<table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>
    <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;">
        <p  style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #6fb3e0; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #6fb3e0;">
        """ + key +"""</p>
        </div>
        <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>

    <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left">
    <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top">
        <p style="color: #428bca; text-decoration: none; background-color: transparent;">MSIT Admissions &copy; 2021</p>
        </td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
    <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table></td></tr></table>
    </td></tr>
    </table>
    </body>
    </html>
        """
    

    message = MessageSchema(
        subject="Forgot Password?",
        recipients=emailid,  # List of recipients, as many as you can pass 
        body=html,
        subtype="html"
        )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}


@app.post('/ChangePassword')
async def send_email(
    stu: ForgotPassword,db: Session = Depends(get_db)
    ):
    
    emailid = stu.dict().get("email")
    key = stu.dict().get("salt")
    givenpassword = stu.dict().get("password")

    user = get_studentbyemail(db,emailid)

    if user is None:
        return {'message' : 'error'}
    
    if user.salt != key:
        return {'message' : 'keynomatch'}
    else:
        user.password = get_password_hash(givenpassword)
        db.add(user)
        db.commit()
        return {'message' : 'passwordChanged'}

@app.get("/slotavailability/",response_model=List[AvailableSlots])
def get_slots(db: Session = Depends(get_db)):
    return get_available_slots(db)


@app.post("/updatewalkinslot/")
async def update_walkin_slot(slot:ChosenSlot,db: Session = Depends(get_db)):
    user = db.query(Walkin).filter(Walkin.walkinAppNo==slot.slotWalkinAppNo).one_or_none()
    if(user is None):
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        if(slot.slottime=='10:00 AM'):
            user.slotNo = 1
            user.slotdate = slot.slotdate
            db.add(user)
            db.commit()
            return {'message' : 'walkin slots updated'}
        if(slot.slottime=='12:00 PM'):
            user.slotNo = 2
            user.slotdate = slot.slotdate
            db.add(user)
            db.commit()
            return {'message' : 'walkin slots updated'}   



@app.post('/sendslotemail')
async def slotbooking_mail(
    slot: SlotEmail,db: Session = Depends(get_db)
    ):
    
    emailid = slot.dict().get("email")

    user = db.query(Walkin).filter(Walkin.walkinAppNo==slot.slotWalkinAppNo).one_or_none()

    if user is None:
        return {'message' : 'error'}
        # raise HTTPException(status_code=404, detail="Item not found")

    AppNo = slot.slotWalkinAppNo
    slotDate = slot.slotdate
    slotTime = slot.slottime

    html = """
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        @media only screen and (max-width: 600px) {
            table[class="table-row"] {
                float: none !important;
                width: 98% !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            table[class="table-row-fixed"] {
                float: none !important;
                width: 98% !important;
            }
            table[class="table-col"], table[class="table-col-border"] {
                float: none !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                table-layout: fixed;
            }
            td[class="table-col-td"] {
                width: 100% !important;
            }
            table[class="table-col-border"] + table[class="table-col-border"] {
                padding-top: 12px;
                margin-top: 12px;
                border-top: 1px solid #E8E8E8;
            }
            table[class="table-col"] + table[class="table-col"] {
                margin-top: 15px;
            }
            td[class="table-row-td"] {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            table[class="navbar-row"] , td[class="navbar-row-td"] {
                width: 100% !important;
            }
            img {
                max-width: 100% !important;
                display: inline !important;
            }
            img[class="pull-right"] {
                float: right;
                margin-left: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            img[class="pull-left"] {
                float: left;
                margin-right: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }
            table[class="table-space"], table[class="header-row"] {
                float: none !important;
                width: 98% !important;
            }
            td[class="header-row-td"] {
                width: 100% !important;
            }
        }
        @media only screen and (max-width: 480px) {
            table[class="table-row"] {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }
        @media only screen and (max-width: 320px) {
            table[class="table-row"] {
                padding-left: 12px !important;
                padding-right: 12px !important;
            }
        }
        @media only screen and (max-width: 458px) {
            td[class="table-td-wrap"] {
                width: 100% !important;
            }
        }
    </style>
    </head>
    <body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9" leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
    <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
    <tr><td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;">
    <table><tr><td class="table-td-wrap" align="center" width="458"><table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">MSIT Exam Slot</td></tr></tbody></table>
        <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;">
        <b style="color: #777777;">You have chosen your slot for your walkin exam</b>
        <br>
        Your slot details are as follows:
        </div>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
        
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp;<table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>
    <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left">
    <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left">
        <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;">
        <p  style="color: #ffffff; text-decoration: none; margin: 0px; text-align: center; vertical-align: baseline; border: 4px solid #6fb3e0; padding: 4px 9px; font-size: 15px; line-height: 21px; background-color: #6fb3e0;">
        Application Number: """ + AppNo +""" <br>
        Slot Date: """ + slotDate +"""<br>
        Slot Time: """ + slotTime +"""</p>
        </div>
        <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>

    <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>

    <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left">
    <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"><tbody><tr><td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top">
        <p style="color: #428bca; text-decoration: none; background-color: transparent;">MSIT Admissions &copy; 2021</p>
        </td></tr></tbody></table>
    </td></tr></tbody></table>
    </td></tr></tbody></table>
    <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td></tr></tbody></table>
    <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td></tr></tbody></table></td></tr></table>
    </td></tr>
    </table>
    </body>
    </html>
        """
    

    message = MessageSchema(
        subject="Slot Booking Details",
        recipients=emailid,  # List of recipients, as many as you can pass 
        body=html,
        subtype="html"
        )

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}


# **********************************Slot Booking*******************************************

@app.post("/updateslotavailability/")
async def update_availableslots(slot:ChosenSlot,db: Session = Depends(get_db)):
    user = db.query(slotavailability).filter(slotavailability.slotdate==slot.slotdate).first()
    if(user is None):
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        if(slot.slotTestcenter=='Eduquity Career Technologies'):
            if(slot.slottime=='10:00 AM'):
                count = user.hyd_1
                user.hyd_1 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'hyderabad slots updated'}
            if(slot.slottime=='12:00 PM'):
                count = user.hyd_2
                user.hyd_2 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'hyderabad slots updated'}
        if(slot.slotTestcenter=='University College of Engineering'):
            if(slot.slottime=='10:00 AM'):
                count = user.kakinada_1
                user.kakinada_1 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'kakinada slots updated'}
            if(slot.slottime=='12:00 PM'):
                count = user.kakinada_2
                user.kakinada_2 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'kakinada slots updated'}    
        if(slot.slotTestcenter=='JNTUH'):
            if(slot.slottime=='10:00 AM'):
                count = user.jntuh_1
                user.jntuh_1 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'kakinada slots updated'}
            if(slot.slottime=='12:00 PM'):
                count = user.jntuh_2
                user.jntuh_2 = count + 1
                db.add(user)
                db.commit()
                return {'message' : 'kakinada slots updated'}




# ********************************Login & walkin*****************************************************


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    file_location = f"C:/fastapiexample/myfirstreactapp/src/uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return file

@app.post('/image/')
async def image_update(im:Sample5,db: Session = Depends(get_db)):
    update_img(im,db)

@app.post('/walkinapplications/')
def storedetails(walk:Sample4,db:Session=Depends(get_db)):
    create_walkindetails(walk,db)
    return true  

@app.post("/walkindetails/",response_model=List[Walkindetails])
def get_walkin(stu:Sample3,db: Session = Depends(get_db)):
    return walkin_details(stu,db)

@app.post("/get_img/",response_model=Img)
def get_walkin(stu:Sample3,db: Session = Depends(get_db)):
    db_user2 = db.query(Profile).filter(Profile.email == stu.email ) .first()
    return db_user2

    

@app.post('/ma_users_view/',response_model=List[View])
def get_details(stu:Sample3,db: Session = Depends(get_db)):
    return stu_details(stu,db)

@app.post('/ma_users/')
def get_student_view(stu:Sample,db: Session = Depends(get_db)):
    print("hi")
    db_stu=get_studetails(stu,db)
    return db_stu

@app.post('/ma_user_profile/')
def get_studetails1(stu:Sample2, db:Session=Depends(get_db)):
    create_viewprofile2(stu,db)
    return true


@app.post('/gatapplication', response_model=gatDetails)
def create_student_view(stu: gatDetails, db: Session = Depends(get_db)):
    db_place = create_gat_application(db, stu)
    return db_place

@app.get('/gatapplication/', response_model=List[gatDetails])
def get_student_view(db: Session = Depends(get_db)):
    return gat_veiwe(db)


@app.post('/gatdetails', response_model=List[gatDetails])
def create_student_view(stu: Sample3, db: Session = Depends(get_db)):
    db_place = create_gat_details(db, stu)
    return db_place

@app.get('/getgatdetails', response_model=List[gatDetails])
def create_student_view(stu: Sample3, db: Session = Depends(get_db)):
    db_place = create_gat_details(db, stu)
    return db_place