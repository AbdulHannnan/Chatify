import express from 'express';

const router = express.Router();

router.get("/contacts" , protectRoute ,  getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id" ,protectRoute ,  getMessagesByUserId);
router.post("/send/:id", protectRoute,  sendMessage);


router.get('/receive', (req, res) => {
    res.send('Receive message route');
});

export default router;