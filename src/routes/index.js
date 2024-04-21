const { Router } = require("express");
const db = require("../firebase");

const router = Router();

router.get("/GetProducts", async (req, res) => {
  try {
    const querySnapshot = await db.collection("Productos").get();
    const productos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(productos);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

router.post("/AddProduct", async (req, res) => {
  try {
    if (!req.body) throw "The body request is null.";

    const {
      picture,
      productName,
      productShortDescription,
      LongDescription,
      MediaLink,
      CommentsCount,
      productPlatform,
      softwareProductType,
      productCategory,
      RatingCount,
    } = req.body;

    await db.collection("Productos").add({
      picture,
      productName,
      productShortDescription,
      LongDescription,
      MediaLink,
      CommentsCount,
      productPlatform,
      softwareProductType,
      productCategory,
      RatingCount,
    });

    res.send("Product created succesfully!");
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Error adding data");
  }
});

module.exports = router;
