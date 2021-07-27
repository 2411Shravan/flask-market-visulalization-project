from flask import Flask
from flask import Blueprint
from flask import render_template
from flask import request
from .models import User
from flask import flash
from werkzeug.security import generate_password_hash
from . import db
from flask import redirect
from werkzeug.security import check_password_hash
from flask_login import login_user
from flask_login import logout_user
from flask_login import current_user
from flask_login import login_required


auth=Blueprint('auth',__name__)
arr_data=[]

@auth.route('/signup',methods=['GET','POST'])
def signup():
    print(len(arr_data))
    print(arr_data)
    if request.method == 'POST':
        email=request.form['email']
        full_name=request.form['name']
        user_name=request.form['username']
        password=request.form['password']
        confirmPassword=request.form['confirmPassword']

        user=User.query.filter_by(email=email).first()
        username=User.query.filter_by(username=user_name).first()
        if user:
            flash('A user with this e-mail already exists. Please cross-verify', category='warning')

        elif username:
            flash('This username is taken please find another username.', category='warning')

        elif len(email)<5:
            flash('Enter a valid email address', category='warning')
        
        elif len(password)<7:
            flash('Please make your password stronger', category='danger')

        elif (password != confirmPassword):
            flash('Please make sure that password and confirm password are same', category='warning')

        else:
            new_user = User(email=email,password=generate_password_hash(password, method='sha256'),name=full_name,username=user_name)
            db.session.add(new_user)
            db.session.commit()
            flash('Successfully created new user', category='success')
            return redirect('/login')


    return render_template('signup.html',user=current_user)




@auth.route('/login',methods=['GET','POST'])
def login():

    if request.method == 'POST':
        email=request.form['email']
        password=request.form['password']
        user=User.query.filter_by(email=email).first()

        if user:
            if check_password_hash(user.password,password):
                flash('Successfully Logged-In',category='success')
                login_user(user,remember=True)
                return redirect('/')

            else:
                flash('Incorrect Password',category='danger')

        else:
            flash('There is no account with this e-mail address',category='danger')

    return render_template('login.html',user=current_user)



@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')