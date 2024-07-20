const db = require("../database/db"); // Import pg-promise db instance

// Function for retrieving user details
const fiokom = async (req, res) => {
  try {
    const user = await db.oneOrNone("SELECT email FROM users WHERE id = $1", [req.userId]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

module.exports = {
  fiokom,
};
