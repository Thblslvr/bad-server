import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import BadRequestError from '../errors/bad-request-error'
import fs from 'fs'
import sharp from 'sharp'
import path from 'path'

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    // Минимальный размер 2 КБ (2048 байт)
    if (req.file.size < 2048) {
        fs.unlink(req.file.path, () => {})
        return next(new BadRequestError('Размер файла должен быть больше 2 КБ'))
    }
    try {
        // Очистка метаданных через sharp
        const outputPath = req.file.path + '.clean'
        await sharp(req.file.path)
            .rotate()
            .toFile(outputPath)
        fs.unlinkSync(req.file.path)
        fs.renameSync(outputPath, req.file.path)

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}