import { createBroadcast } from "@src/services/broadcast";
import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
  let object;

  try {
    object = req.body as CreateBroadcastRequest
  } catch (error) {
    res.status(400).json({
      message: 'Invalid request body'
    });
    return;
  }

  createBroadcast(object.boothId, object.title, object.body).then(() => {
    res.status(200).json({
      message: 'Broadcast created'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Internal server error'
    });
    console.error(error.message);
  });
})

export default router;
