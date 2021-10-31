import express from "express"
import uniqid from "uniqid"

import { getMedia, writeMedia } from "../../lib/fs-tools"

mediaRouter = express.Router()

mediaRouter.post("/", async (req, res, next) => {
    try {
        const newMedia = {
            id: uniqid(),
            ...req.body, 
            createdAt: new Date(),
            updatedAt: new Date()
        }

    const media = await getMedia()

    media.push(newMedia)

    await writeMedia(media)

    res.status(201).send({ id: newMedia.id })

    } catch (error) {
        next(error)
    }
})


//GET (list) ( w/ reviews included)
mediaRouter.get("/", async (req, res, next) => {
    try {
        const media = await getMedia()
        console.log(media)
        if (req.query && req.query.title) {
            const filteredMedia = media.filter(m => m.title === req.query.title)
            res.send(filteredMedia)
        } else {
            res.send(media)
        }
    } catch (error) {
        next(error)
    }
})

//GET (single) (w/ reviews)
mediaRouter.get("/:mediaId", async (req, res, next) => {
    try {
        const media = await getMedia()
        const media = media.find(m => m.id === req.params.mediaId)
        if (media) {
            res.send(media)
        } else {
            res
                .status(404)
                .send({ message: `media with ${req.params.id} is not found!`})
        }
    } catch (error) {
        next(error)
    }
})

//UPDATE
mediaRouter.put("/:mediaId", async (req, res, next) => {
    try {
      const media = await getMedia()
  
      const index = media.findIndex(media => b.id === req.params.mediaId)
  
      const mediaToModify = media[index]
      const updatedFields = req.body
  
      const updatedMedia = { ...mediaToModify, ...updatedFields }
  
      media[index] = updatedMedia
  
      await writeBooks(media)
  
      res.send(updatedMedia)
    } catch (error) {
      next(error)
    }
  })

//DELETE

mediaRouter.delete("/:mediaId", async (req, res, next) => {
    try {
        const media = getMedia()
        
        const remainingMedia = media.filter(m => m.id !== req.params.mediaId)

        await writeMedia(remainingMedia)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})