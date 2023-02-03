const router = require("express").Router();
const Cart = require("../models/Cart.js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../routes/verifyToken.js")


router.post("/",verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await new Cart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
});


router.put("/:id", verifyTokenAndAuthorization , async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.send(200).json("Cart has beeen deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get("/", verifyTokenAndAdmin , async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
          res.status(500).json("Error not authenticated ")
    }
})


module.exports = router