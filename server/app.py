from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    address = db.Column(db.String(255), nullable=True)
    realname = db.Column(db.String(80), nullable=True)

# Thực hiện update cơ sở dữ liệu
with app.app_context():
    db.create_all()

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password=hashed_password,
        age=data.get('age'),
        address=data.get('address'),
        realname=data.get('realname')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data.get('username')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'})

@app.route('/api/update_password', methods=['POST'])
def update_password():
    data = request.get_json()
    username = data.get('username')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    user = get_user_by_username(username)

    if user and bcrypt.check_password_hash(user.password, current_password):
        # Update the password with the new hashed password
        hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_new_password

        db.session.commit()
        return jsonify({'message': 'Password updated successfully'})
    else:
        return jsonify({'message': 'Invalid credentials or user not found'}), 400

@app.route('/api/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    username = data.get('username')

    user = get_user_by_username(username)

    if user:
        user.email = data.get('email')
        user.age = data.get('age')
        user.address = data.get('address')
        user.yourname = data.get('realname')

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'})
    else:
        return jsonify({'message': 'User not found'}), 400


@app.route('/api/get_user_info', methods=['POST'])
def get_user_info():
    data = request.get_json()
    username = data.get('username')

    user = get_user_by_username(username)

    if user:
        user_info = {
            'username': user.username,
            'email': user.email,
            'age': user.age,
            'address': user.address,
            'realname': user.realname
        }
        return jsonify(user_info)
    else:
        return jsonify({'message': 'User not found'}), 400
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
