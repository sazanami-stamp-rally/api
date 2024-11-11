import { createBroadcast, getAllBroadcast } from "@src/services/broadcast";
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  getAllBroadcast().then((broadcasts) => {
    return res.status(200).json({
      broadcasts
    });
  });
});

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
