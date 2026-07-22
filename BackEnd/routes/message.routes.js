import express from 'express';

const router = express.Router();

router.get("/contacts" , getAllContacts);
router.get("/chats", getAllChats);
router.get("/:id" , getChatById);
router.post("/send/:id", sendMessageById);


router.get('/receive', (req, res) => {
    res.send('Receive message route');
});

export default router;