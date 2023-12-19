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
    watchlist = db.relationship('Watchlist', backref='user', uselist=False)

class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)  # Assuming movie_id is an integer

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
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/update_password', methods=['POST'])
def update_password():
    data = request.get_json()
    username = data.get('username')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    user = get_user_by_username(username)

    if user and bcrypt.check_password_hash(user.password, current_password):
        hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_new_password

        db.session.commit()
        return jsonify({'message': 'Password updated successfully'})
    else:
        return jsonify({'message': 'Invalid credentials or user not found'}), 400

@app.route('/api/add_remove_watchlater', methods=['POST'])
def add_remove_watchlater():
    data = request.get_json()
    username = data.get('username')
    # movie_id = data.get('movie_id')
    user = get_user_by_username(username)

    if user:
        movie_id = data.get('movie_id')

        # Kiểm tra xem movie_id đã có trong watchlist chưa
        watchlist_entry = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()

        if watchlist_entry:
            # Nếu đã tồn tại, xóa khỏi watchlist
            db.session.delete(watchlist_entry)
            message = 'Removed from watchlist'
            result = False
        else:
            # Nếu chưa tồn tại, thêm vào watchlist
            new_watchlist_entry = Watchlist(user_id=user.id, movie_id=movie_id)
            db.session.add(new_watchlist_entry)
            message = 'Added to watchlist'
            result = True

        db.session.commit()
        response_data = {'message': message, 'result': result}
        print("Response data:", response_data)  # Add this line for debugging
        return jsonify(response_data)
    else:
        return jsonify({'message': 'User not found'}), 400

    
@app.route('/api/check_movie_in_watchlist', methods=['POST'])
def check_movie_in_watchlist():
    data = request.get_json()
    username = data.get('username')
    movie_id = data.get('movie_id')

    user = get_user_by_username(username)

    if user:
        # Kiểm tra xem có entry nào trong bảng UserWatchlist với user_id và movie_id này chưa
        watch_entry = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()

        if watch_entry:
            return jsonify({'result': True})  # Movie exists in Watchlist
        else:
            return jsonify({'result': False})  # Movie does not exist in Watchlist
    else:
        return jsonify({'message': 'User not found'}), 400

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

@app.route('/api/get_watchlist', methods=['POST'])
def get_watchlist():
    data = request.get_json()
    username = data.get('username')

    if username:
        # Lấy danh sách movie_id từ watchlist của user
        user = get_user_by_username(username)
        if user:
            watchlist_entries = Watchlist.query.filter_by(user_id=user.id).all()
            watchlist = [entry.movie_id for entry in watchlist_entries]

            return jsonify({'watchlist': watchlist})
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Username not provided'}), 400
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
