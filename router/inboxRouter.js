// external import
const express = require("express");
// internal import
const {
  getInbox,
  addConversation,
  searchUser,
  getMessages,
  sendMessage,
  deleteConversation,
  searchConversation,
} = require("../controller/inboxController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const { checkLogin } = require("../middleware/common/checkLogin");
const attachmentUpload = require("../middleware/inbox/attachmentUpload");

// router
const router = express.Router();
// inbox page
router.get("/", decorateHtmlResponse("inbox"), checkLogin, getInbox);
// search user for conversion
router.post("/search", checkLogin, searchUser);
// add Conversation
router.post("/conversation", checkLogin, addConversation);
// search user for conversion
router.post("/conversationSearch", checkLogin, searchConversation);
// delete conversation
router.delete("/conversation/:id", checkLogin, deleteConversation);
// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);
// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);
// export part
module.exports = router;
