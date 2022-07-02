const express = require("express");
const router = express.Router();
const User = require('../models/User');
// require the Brick model here
const Brick = require("../models/BrickCategory");

router.get("/list", async(req, res, next) => {

    try {
        const user = await User.find({});
        const brick = await Brick.find({});
        res.render("bricks/list" , { brick , user})
    } catch (err) {
        next(err);
    }
});

router.get("/create", (req, res, next) => {
    res.render("bricks/create-form");
});

router.post("/create", async(req, res, next) => {
    const { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status } = req.body;
    const intBrickCategoryLegoId = parseInt(brickCategoryLegoId);
    const intQuantity = parseInt(quantity);
    let pictureTreated;
    if (picture !== "") {
        pictureTreated = picture;
    }

    try {
        await Brick.create({
            brickCategoryName,
            brickCategoryLegoId: intBrickCategoryLegoId,
            quantity: intQuantity,
            picture: pictureTreated,
            color: "red",
            status,
            //storageid i setid
        });
        res.redirect(`/brick/list`);
    } catch (error) {
        console.error("ERROR!!!", error);
        res.render("bricks/create-form");
    }
});

router.get("/:id/edit", async(req, res, next) => {
    const { id } = req.params;
    try {
        const brick = await Brick.findById(id);
        res.render("bricks/update-form", brick);
    } catch (error) {
        next(error);
    }
});

router.post("/:id/edit", async(req, res, next) => {
    
    const { id } = req.params;
    const { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status } = req.body;
    const intBrickCategoryLegoId = parseInt(brickCategoryLegoId);
    const intQuantity = parseInt(quantity);
    try {
        const updatedBrick = await Brick.findByIdAndUpdate(
            id, { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status }, { new: true }
        );
        console.log("Just updated:", updatedBrick);
        res.redirect('/brick/list');
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/brick/${id}/edit`);
    }
});

router.post("/:id/delete", async(req, res, next) => {
   
    const { id } = req.params;
    try {
        await Brick.findByIdAndDelete(id);
        res.redirect(`/brick/list`);
    } catch (error) {
        next(error);
    }
});


module.exports = router;