const wishlists = require('../Models/wishlistSchema')

exports.addWishlist = async(req,res)=>{
    console.log("Add to wishlist");
    const {id,title,price,image} = req.body
    const userId = req.payload
    // console.log("userId : "+userId);
    try{
        const existingPro = await wishlists.findOne({id,userId})
        if(existingPro){
            res.status(401).json("Already added")
        }
        else{
            const wishlist = new wishlists({id,title,price,image,userId})
            await wishlist.save()
            res.status(200).json("product added successfully")
        }
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}

exports.getWishlist = async(req,res)=>{
    const userId = req.payload
    try{
        const wishlistPro = await wishlists.find({userId})
        res.status(200).json(wishlistPro) 
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}

exports.deleteFromWishlist = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const pro = await wishlists.findOneAndDelete({id,userId})
        if(pro){
            res.status(200).json(pro)
        }
        else{
            res.status(401).json("No such product")
        }
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}