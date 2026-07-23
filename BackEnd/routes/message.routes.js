import express from 'express';

const router = express.Router();

router.get("/contacts" , protectRoute ,  getAllContacts);
// router.get("/chats", getChatPartners);
router.get("/:id" , getMessagesByUserId);
// router.post("/send/:id", sendMessageById);


router.get('/receive', (req, res) => {
    res.send('Receive message route');
});

export default router;