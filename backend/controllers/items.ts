import { Request, Response } from "express";
import Item from "../models/itemSchema";
import { idSchemaValidation, itemSchemaValidation, updateItemSchemaValidation } from "../validations/item";

const ItemController = {
    createItem: async (req: Request, res: Response): Promise<any> => {
        try {
            const { error, value } = itemSchemaValidation.validate(req.body, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.details.map((err) => err.message),
                });
            }

            const { user_id, title, description } = value;

            const newItem = await Item.create({ user_id, title, description });

            res.status(201).json({
                success: true,
                message: "Item created successfully",
                data: newItem,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    },
    getAllItems: async (_req: Request, res: Response): Promise<void> => {
        try {
            const items = await Item.findAll({});
            console.log('items', items)

            res.status(200).json({
                success: true,
                message: "All items retrieved",
                data: items,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    },
    getItemById: async (req: Request, res: Response): Promise<any> => {
        try {
            const { error } = idSchemaValidation.validate(req.params);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.details.map(err => err.message),
                });
            }

            const { id } = req.params;
            const item = await Item.findByPk(id);

            if (item) {
                res.status(200).json({ success: true, message: "Item details", data: item });
            } else {
                res.status(404).json({ success: false, message: "Item not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    },
    updateItem: async (req: Request, res: Response): Promise<any> => {
        try {
            const { error: idError } = idSchemaValidation.validate(req.params);
            if (idError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: idError.details.map(err => err.message),
                });
            }

            const { error: bodyError } = updateItemSchemaValidation.validate(req.body, { abortEarly: false });
            if (bodyError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: bodyError.details.map(err => err.message),
                });
            }

            const { id } = req.params;
            const { title, description } = req.body;

            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ success: false, message: "Item not found" });
            }

            await item.update({ title, description });

            res.status(200).json({ success: true, message: "Item updated successfully", data: item });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    },
    deleteItem: async (req: Request, res: Response): Promise<any> => {
        try {
            const { error } = idSchemaValidation.validate(req.params);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.details.map(err => err.message),
                });
            }

            const { id } = req.params;
            const deletedItem = await Item.destroy({ where: { id } });

            if (deletedItem) {
                res.status(200).json({ success: true, message: "Item deleted successfully" });
            } else {
                res.status(404).json({ success: false, message: "Item not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    },
};

export default ItemController;
