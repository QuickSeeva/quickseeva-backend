const { db } = require("../firebase/firebaseAdmin");

const createRide = async (req, res) => {
  try {

    const {
      userId,
      pickup,
      destination,
      ambulanceType
    } = req.body;

    // FIND AVAILABLE DRIVER
    const driverSnapshot = await db
      .collection("drivers")
      .where("isOnline", "==", true)
      .where("isAvailable", "==", true)
      .where("ambulanceType", "==", ambulanceType)
      .limit(1)
      .get();

    // NO DRIVER FOUND
    if (driverSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "No ambulance available"
      });
    }

    // GET DRIVER DATA
    const driverDoc = driverSnapshot.docs[0];

    const driverId = driverDoc.id;

    // CREATE RIDE
    const rideRef = await db.collection("rides").add({
      userId,
      driverId,
      pickup,
      destination,
      ambulanceType,
      status: "REQUEST_SENT",
      createdAt: new Date()
    });

   

    res.json({
      success: true,
      rideId: rideRef.id,
      driverId,
      message: "Ambulance assigned successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};
const respondToRide = async (req, res) => {

  try {

    const { rideId, driverId, action } = req.body;

    // ACCEPT
    if (action === "ACCEPT") {

      await db.collection("rides")
        .doc(rideId)
        .update({
          status: "ACCEPTED",
          driverId
        });

      await db.collection("drivers")
        .doc(driverId)
        .update({
          isAvailable: false
        });

      return res.json({
        success: true,
        message: "Ride accepted"
      });
    }

    // REJECT
    if (action === "REJECT") {

      await db.collection("rides")
        .doc(rideId)
        .update({
          status: "REJECTED"
        });

      return res.json({
        success: true,
        message: "Ride rejected"
      });
    }
    return res.status(400).json({
  success: false,
  message: "Invalid action"
});

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

const completeRide = async (req, res) => {

  try {

    const { rideId, driverId } = req.body;

    // UPDATE RIDE STATUS
    await db.collection("rides")
      .doc(rideId)
      .update({
        status: "COMPLETED"
      });

    // MAKE DRIVER AVAILABLE AGAIN
    await db.collection("drivers")
      .doc(driverId)
      .update({
        isAvailable: true
      });

    res.json({
      success: true,
      message: "Ride completed"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

module.exports = {
  createRide,
  respondToRide,
  completeRide
};