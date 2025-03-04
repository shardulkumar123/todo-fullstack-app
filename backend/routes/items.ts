import express from "express";
import items from "../controllers/items";
import { verifyToken } from "../middleware/authVerify";
const router = express.Router();

router.post("/", verifyToken, items.createItem);
router.get('/', verifyToken, items.getAllItems)
router.get('/:id', verifyToken, items.getItemById)
router.patch("/:id", verifyToken, items.updateItem)
router.delete('/:id', verifyToken, items.deleteItem)

export default router;
