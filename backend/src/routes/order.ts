import { Router } from 'express'
import {
    createOrder,
    deleteOrder,
    getOrderByNumber,
    getOrderCurrentUserByNumber,
    getOrders,
    getOrdersCurrentUser,
    updateOrder,
} from '../controllers/order'
import auth from '../middlewares/auth'
import { validateOrderBody } from '../middlewares/validations'

const orderRouter = Router()

orderRouter.post('/', auth, validateOrderBody, createOrder)
orderRouter.get('/all', auth, getOrders)                     // ← убрали roleGuard
orderRouter.get('/all/me', auth, getOrdersCurrentUser)
orderRouter.get('/:orderNumber', auth, getOrderByNumber)     // ← убрали roleGuard
orderRouter.get('/me/:orderNumber', auth, getOrderCurrentUserByNumber)
orderRouter.patch('/:orderNumber', auth, updateOrder)        // ← убрали roleGuard
orderRouter.delete('/:id', auth, deleteOrder)                // ← убрали roleGuard

export default orderRouter