import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';


export function generateAccessToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE || '15m',
  });
}


export function generateRefreshToken(payload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET || env.JWT_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRE || '7d',
  });
}


export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}


export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET || env.JWT_SECRET);
}