const { db } = require("../firebase/firebaseAdmin");

const addDriver = async (req, res) => {
  try {
    const driver = await db.collection("drivers").add({
      ...req.body,
      isOnline: true,
      isAvailable: true,
      createdAt: new Date()
    });

    res.json({
      success: true,
      driverId: driver.id
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
const getAvailableDrivers = async (req, res) => {
  try {
    const snapshot = await db
      .collection("drivers")
      .where("isOnline", "==", true)
      .where("isAvailable", "==", true)
      .get();

    let drivers = [];

    snapshot.forEach(doc => {
      drivers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      drivers
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = { addDriver, getAvailableDrivers };