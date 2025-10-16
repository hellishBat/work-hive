// JWT Utility Functions
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!

export const signJwt = (
  payload: Record<string, unknown>,
  expiresIn: string | number = '1h'
) => jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn })

export const signRefreshJwt = (
  payload: Record<string, unknown>,
  expiresIn: string | number = '7d'
) => jwt.sign(payload, JWT_SECRET_REFRESH, { algorithm: 'HS256', expiresIn })

export const verifyJwt = async (token: string) =>
  new Promise<Record<string, unknown>>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err || !decoded) return reject(err || new Error('Invalid token'))
      resolve(decoded as Record<string, unknown>)
    })
  })

export const verifyRefreshJwt = async (token: string) =>
  new Promise<Record<string, unknown>>((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET_REFRESH,
      { algorithms: ['HS256'] },
      (err, decoded) => {
        if (err || !decoded)
          return reject(err || new Error('Invalid refresh token'))
        resolve(decoded as Record<string, unknown>)
      }
    )
  })
