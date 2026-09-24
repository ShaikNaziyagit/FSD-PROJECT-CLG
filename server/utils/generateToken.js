import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'campusos_super_secret_jwt_key_2026_dev_env', {
    expiresIn: '30d',
  });
};

export default generateToken;
