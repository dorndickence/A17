const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();

// Default values for global variables
global.available = process.env.AVAILABLE || true;
global.autoReadAll = process.env.AUTO_READ_ALL || false;
global.antitags = process.env.ANTITAGS || true;

// Auto functioner
global.autoTyping = process.env.AUTO_TYPING || false;
global.autoRecord = process.env.AUTO_RECORD || false;
global.groupevent = process.env.GROUPEVENT || false;
global.statusseen = process.env.STATUSSEEN || true;
global.autoreadgc = process.env.AUTOREADGC || true;


// Auth information
global.pairNumber = "254759245741";                         // Add your paining number with country code example "916297175943"; 
global.port = process.env.PORT || "10000";
global.auth = process.env.AUTH || "Pairing";                // Auth mode OR/Pairing.
global.sessionFile = process.env.SESSION_FILE || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUlwZTFPVmd1cGVpTlBUdi9PQVgzY1dIZ1NiMUFoYnFMVjF3SEJGMjZIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3l3cU9sU2E3M2Ryb2RUbkRBREpPaHZNbUxrTFZXU0NhMHM0NmZTTUFVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRXd3MnFHdko2UmtRdHBCRG1MV0ZLVXlyaDRoSCt0aXlGZkk3eUNETG1VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyQlBrMVRaQXNsZ2s0Skx3Smh5Zjh5MXA3M00yMTZZUWQ5ZytvQklqMXlrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Bdm1rZzM2MjcyOEdubFJGSE1ydXB5bmk4UUszNEE1TTEyM01zdE1aMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktpNnJxdHhxZnNXeEV3L1YyUjJETkg3aklBYzd5aEdSdE1WT3Z6RmZBU289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU1RNWRIWFAxaEx6dGdyUVlINkI2Z05wWGlRYkFYWnlWYk5qbmxldlNraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjNCd2hmMXNIcTJxcFc2OFhjZzVrclMwc3U1RWtiT2xhS0ZlQjlOS3FTMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdodVpRU3VETVZ1Q25oSHI1S3BRNlVxVzlUZFp4d296NTQ0SGtoZGJHZ3Y3aWlmTmVoTm1GZ0ZtUzl4VmN6WnQ1RmxPMnA0WFJEOVUvY3k3UEhlaUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6IkpNUExpZ2hpWWVFNTM2bGVZTTRJR2RUeDl4U051K2luTGFnaFlYRUlKMnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImZwV2Nmbjk4VHp5am8xQm5pNFRGQmciLCJwaG9uZUlkIjoiNGM5ZjY2MDEtMjEzYi00MDE3LThlOTYtNjdlMmM2MjE2NjhjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZUS0Vvai8wV2RmQUoyTXhsdUpoMXJkOXpxMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhdTYzQzRoWmNlNjFTRHl5STN3WmZOOFFNTUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWkxWTVJEV1EiLCJtZSI6eyJpZCI6IjI1NDc1OTI0NTc0MToyN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJXYWxraW5nIENoZW1pY2FsIHZlcnNpb24yIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMS3dtdUFQRVBPQWxiVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJUQkNXemhIV3RRcmVrSGtya2ZGaGN5Rk5oaU5HUUdJOExmdElmdDhlL3pnPSIsImFjY291bnRTaWduYXR1cmUiOiJqMy82Z0h3ZjBDeDkwU0lwZXpyQnFlcytYQTFkOWplLzZWQWl6MDFvaStNKzQyZ0Q3Y1p4dEhNSHo0SnZDMTRaeGMyY1ZUNWtMbmZiWDRjMlVPd3lnQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWUdyaHZudnBCQzhyY01NSExCRHdSRzlCUTI4QytvQnVORWx1cHRxSTVGVTNZWDk5VEYrR1VWTjMxSkJETWEya0VDVXd5SXFObkdiYjF6NmI0cmUwRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTkyNDU3NDE6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXdRbHM0UjFyVUszcEI1SzVIeFlYTWhUWVlqUmtCaVBDMzdTSDdmSHY4NCJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjEwNTk4Nn0=";
global.mongodb = process.env.MONGODB || "mongodb+srv://dornbots:5s3Tcs9RdPqLTmij@dornbot.clhjn5v.mongodb.net/A17donr?retryWrites=true&w=majority";                 // Mongodb url.
global.website = "https://www.exenoz.tech"; 
global.github = "https://github.com/Kai0071";


// Default prefix
global.prefa = process.env.PREFIX ? process.env.PREFIX.split(",") : ["."];


// Owner information
global.Owner = process.env.OWNER ? process.env.OWNER.split(",") : ["2547113907065", ""];
global.OwnerNumber = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.split(",") : ["2547113907065", ""];
global.ownertag = process.env.OWNER_TAG ? process.env.OWNER_TAG.split(",") : ["2547113907065"];
global.OwnerName = process.env.OWNER_NAME || "Dorn Dickence ";
global.BotName = process.env.BOT_NAME || "walking chemical";
global.packname = process.env.PACK_NAME || "dorn Bot";
global.author = "By: Kai";
global.BotSourceCode = "https://github.com/Kai0071/A17";
global.SupportGroupLink = "https://chat.whatsapp.com/GhRGdwfaMVDCoeAdzILfl";


//
global.openAiAPI = process.env.OPENAI_API || "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";
global.location = process.env.LOCATION || "West Bengal, India";
global.reactmoji = process.env.REACT_MOJI || "❤️";
global.themeemoji = process.env.THEME_EMOJI || "💖";
global.vidmenu = { url: process.env.VID_MENU_URL || 'https://media.tenor.com/Jdu0Ov8X2sIAAAAC/A17-Bot.mp4' };


//
global.BotLogo = fs.readFileSync("./Assets/pic1.jpg");
global.Thumb = fs.readFileSync("./Assets/pic9.jpg");
global.Thumb1 = fs.readFileSync("./Assets/pic5.jpg");
global.ErrorPic = fs.readFileSync("./Assets/pic7.jpg");
global.them = "https://r4.wallpaperflare.com/wallpaper/1003/376/845/makoto-shinkai-kimi-no-na-wa-wallpaper-0816ade8b0301c58302c014e48d2441a.jpg";


//
global.ntilinkytvid = []
global.ntilinkytch = []
global.ntilinkig = []
global.ntilinkfb = []
global.ntilinktg = []
global.ntilinktt = []
global.ntilinktwt = []
global.ntilinkall = []
global.nticall = []
global.ntwame = []
global.nttoxic = []
global.ntnsfw = []
global.ntvirtex = []
global.rkyt = []
global.wlcm = []
global.gcrevoke = []
global.autorep = []
global.ntilink = []


// Messages
global.mess = {
  jobdone: 'Here you go...',
  useradmin: 'Sorry, only *Group Admins* can use this command *Baka*!',
  botadmin: 'Sorry, i cant execute this command without being an *Admin* of this group.',
  botowner: 'Only my *Owner* can use this command, Baka!',
  grouponly: 'This command is only made for *Groups*, Baka!',
  privateonly: 'This command is only made for *Private Chat*, Baka!',
  botonly: 'Only the *Bot itself* can use this command!',
  waiting: 'Just Wait...',
  nolink: 'Please provide me *link*, Baka!',
  error: 'An error occurd!',
  banned: 'You are *Banned* fron using commands!',
  bangc: 'This Group is *Banned* from using Commands!',
  nonsfw: 'Dont be a pervert Baka! This is not a NSFW enabled group!'

}