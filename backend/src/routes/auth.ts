import { Router } from 'express'
import crypto from 'crypto'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'

const authRouter = Router()

authRouter.get('/csrf-token', (req, res) => {
    const token = crypto.randomBytes(32).toString('hex')
    res.cookie('_csrf', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    })
    res.json({ csrfToken: token })
})

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', login)
authRouter.get('/token', refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', register)

export default authRouter