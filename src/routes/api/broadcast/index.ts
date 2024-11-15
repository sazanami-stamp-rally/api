import { BroadcastResponse } from "@src/models/broadcastResponse";
import parsePagination from "@src/routes/middlewares/pagination";
import { createBroadcast, getAllBroadcast, getAllBroadcastWithCursorPagination } from "@src/services/broadcast";
import { isCorrectBoothPasscode } from "@src/utils/isCorrectBoothPasscode";
import { Router } from "express";
import { type } from "os";

const router = Router();

router.get('/all', (req, res) => {
  getAllBroadcast().then((broadcasts) => {
    return res.status(200).json({
      broadcasts
    });
  });
});

// TODO: Typeを指定できるようにする
router.get('/', parsePagination, async (req, res) => {
  const pagination = req.pagination;
  if (!pagination) {
    res.status(400).json({
      message: 'Invalid query parameters'
    });
    return
  } else if (pagination.page !== -1) {
    // ページベースのページネーションには未対応
    // TODO: エラーを返す
    return
  }
  getAllBroadcastWithCursorPagination(
    pagination.from ? pagination.from : null,
    pagination.limit)
    .then((broadcasts) => {
      return res.status(200).json({
        broadcasts: broadcasts.map(broadcast => {
          return {
            id: broadcast.id,
            title: broadcast.title,
            body: broadcast.body,
            type: broadcast.type,
            author: broadcast.booth.display_name,
            timestamp: broadcast.created_at
          } as BroadcastResponse
        }),
        cursor: broadcasts.length === 0 ? null : broadcasts[broadcasts.length - 1].id // クライアントに処理させてもいい気はする
      });
    });
});

router.post('/', async (req, res) => {

  const isCorrectCredential = await isCorrectBoothPasscode(req.body.boothId, req.body.passcode);

  if (!isCorrectCredential) {
    res.status(401).json({
      message: 'ブースIDまたはパスコードが正しくありません'
    });
    return;
  }

  let object;

  try {
    object = req.body as CreateBroadcastRequest
  } catch (error) {
    res.status(400).json({
      message: 'Invalid request body'
    });
    return;
  }

  createBroadcast(object.boothId, object.title, object.body, object.type).then(() => {
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
