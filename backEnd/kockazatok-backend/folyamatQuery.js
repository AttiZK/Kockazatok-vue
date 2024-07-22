// folyamatQuery.js
var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importDefault(require("./database/db"));

async function getFolyamat(tevid, fcsopid) {
  let query = "SELECT DISTINCT tevid, tev, fcsopid, fcsop, folyid, foly FROM folyamat";
  const conditions = [];
  const params = [];

  if (tevid) {
    conditions.push("tevid = $" + (conditions.length + 1));
    params.push(tevid);
  }

  if (fcsopid) {
    conditions.push("fcsopid = $" + (conditions.length + 1));
    params.push(fcsopid);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  try {
    const result = await db.default.any(query, params);
    return result;
  } catch (error) {
    console.error("Detailed error:", error); 
    throw error;
  }
}

module.exports = { getFolyamat };