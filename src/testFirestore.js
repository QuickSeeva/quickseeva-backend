const { db } = require("./firebase/firebaseAdmin");

async function test() {
  await db.collection("test").add({
    message: "Firestore is working",
    time: new Date(),
  });

  console.log("Data added!");
}

test();