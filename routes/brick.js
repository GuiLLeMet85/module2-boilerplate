const express = require("express");
const router = express.Router();
// require the Brick model here
const Brick = require("../models/BrickCategory");

router.get("/list", async(req, res, next) => {

    try {
        const brick = await Brick.find({});
        res.render("bricks/list", { brick })
    } catch (err) {
        next(err);
    }
});


router.get("/create", (req, res, next) => {
    res.render("bricks/create-form");
});

router.post("/bricks/create", async(req, res, next) => {
    const { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status, } = req.body;
    const intBrickCategoryLegoId = parseInt(brickCategoryLegoId);
    const intQuantity = parseInt(quantity);

    try {
        await Brick.create({
            CategoryName,
            brickCategoryName: intBrickCategoryLegoId,
            quantity: intQuantity,
            picture,
            color,
            status
        });
        res.redirect("/list");
    } catch (error) {
        console.error("ERROR!!!", error);
        res.render("bricks/create-form");
    }
});



/*




router.get("/bricks/:id/edit", async(req, res, next) => {
    // Iteration #4: Update the Brick
    const { id } = req.params;
    try {
        const Brick = await Brick.findById(id);
        res.render("bricks/update-form", Brick);
    } catch (error) {
        next(error);
    }
});

router.post("/bricks/:id/edit", async(req, res, next) => {
    // Iteration #4: Update the Brick
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;
    const intPropellers = parseInt(propellers);
    const intMaxSpeed = parseInt(maxSpeed);

    try {
        const updatedBrick = await Brick.findByIdAndUpdate(
            id, { name, propellers: intPropellers, maxSpeed: intMaxSpeed }, { new: true }
        );
        console.log("Just updated:", updatedBrick);
        res.redirect(`/bricks`);
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/bricks/${id}/edit`);
    }
});

router.post("/bricks/:id/delete", async(req, res, next) => {
    // Iteration #5: Delete the Brick
    const { id } = req.params;
    try {
        await Brick.findByIdAndDelete(id);
        res.redirect(`/bricks`);
    } catch (error) {
        next(error);
    }
});

*/
module.exports = router;