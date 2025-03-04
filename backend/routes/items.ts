import express from "express";
import items from "../controllers/items";
import { verifyToken } from "../middleware/authVerify";
const router = express.Router();

router.post("/", items.createItem);
router.get('/', items.getAllItems)
router.get('/:id', items.getItemById)
router.patch("/:id", items.updateItem)
router.delete('/:id', items.deleteItem)

export default router;
