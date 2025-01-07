import { Router } from "express";
import { handleCreateRoom } from "../controllers/roomController";

const router = Router();

router.post("/", handleCreateRoom);

export default router;
