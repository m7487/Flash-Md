const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0U0QllwNGdtY1E3T3JKMTFxN3R5M1BpNnh3QmtCQnpGUFExMkNMSUNGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1RTS3d5WFl2c2tOdDFSUHRkcHg2c3lwOVJTZDhjWlplbFVJQ0hrc3hXYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTHc1bGo4TnFvMW5MeE1DM3VVNnNTcHVLWXlYS2xOeHdHVjExeHlpWTNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiTm9JUFAwZWJJVEJqWnJROWZ6UVlPNTI3UzVOT2JxQ3FZNWViM2lCR1YwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9PcWI4MndsRXBPQWRIYW03a2tGZWo4SE8ydTQ4RFBiNDErWnNZN1k1Vkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRjT3lGV3NqR2VkdFBKYkJFU2kxWTF2cmtha3FmMXd6dlBBK2o2dlh0M1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU8rYlp1YnRKa3pOa1p0QVVLS0gwbXI1RE1WU0tFcFdFTS8rVTRIcHEwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0REaFplamNobGpsREVydURIV2laeUVsNlZ1ZDVHaU1HS0VLZkN3YjEwRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InA1bklTYkNXdDJUTFl5U25WSE5SV0NZejF5a0N5MDg3ZFZQZE1XejZwSllhQ00zbFRyRUhJTXFmWStnaVBCVUxUdkttYjZGZEphRXlGdEdGckZ1VWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQzLCJhZHZTZWNyZXRLZXkiOiJEaGpBVUhKUEtDMzEwcWsraWhDVUVQVVVFZnFPckRLcVBnSi9Eb2dVNjhrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwNDU4NDU3MjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMUVGNzBGNTI1MUJDNkVCNDdDNUM1RENBN0M2Mjg1NkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMDU2ODI1N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiampOdUNBa1hSd3Fua0YxRnRoR2lBUSIsInBob25lSWQiOiI1ZmY2NDFjMi1mMDA3LTQxM2QtYjQ5Ny1hMDEzZDc3NmRhZmQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDdKdDEyenEzYkR5UVZnNTFqem9aT3VuWWZnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IisxYTAzQUE5R0RzWThDcXFvbDVHemNicFZVZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDNkg5WUNINSIsIm1lIjp7ImlkIjoiMjM0NzA0NTg0NTcyNjo2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsOXzZzDl+KCpsWC4oK1yYbigrLJhMmONDU2w5fNnMOXIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKRG9ua29Rc0pPM3RBWVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPaVFWbzB0YTdBamJLQjlBcm02VzlSbFNtbGtoU1o3SU9kSWxNVktGeGpJPSIsImFjY291bnRTaWduYXR1cmUiOiJFb1JhY3ZjR2lJdUwvZkcxb0I2MDAwVGZpMXhSV0REanI4aC9Od25mNi9wRVA3eEZwTk5sMGNKNnAvd3krM0tDRmFyQUM5UUk4bU8ySmlaVGF0SXJEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVGhQNi9LSVFJdnRzdHdveVFOTXIxdVZRcmNQMjkyZHhCZXZNdEtoQUg3RVBYYk5McU8vSmVRTjhBVkVIS3MwcTRhUzhmS0l6TzMwKzZaWGd6cVI5anc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQ1ODQ1NzI2OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVG9rRmFOTFd1d0kyeWdmUUs1dWx2VVpVcHBaSVVtZXlEblNKVEZTaGNZeSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDU2ODI1MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKem0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Wₐᵣₐᵢ ₒ𝚗ᵢ",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2347045845726", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
