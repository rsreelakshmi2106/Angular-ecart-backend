const cart = require('../Models/cartSchema');
const { all } = require('../Routes/router');

exports.addToCart = async(req,res)=>{
    console.log("Inside add to cart");
    const {id,title,price,image,quantity}=req.body
    const userId = req.payload
    // const grandtotal = 100
    try{
        const existingPro = await cart.findOne({id,userId})
        if(existingPro){
            existingPro.quantity+=1
            existingPro.grandtotal = existingPro.quantity*existingPro.price
            await existingPro.save()
            res.status(200).json("Product successfully updated")
        }
        else{
            const addPro = new cart({id,title,price,image,quantity,userId})
            addPro.grandtotal = addPro.quantity*addPro.price
            await addPro.save()
            res.status(200).json("Added to cart")
        }
    }
    catch(err){
        res.status(404).json("Add to cart failed : "+err)
    }
}


exports.viewCart = async(req,res)=>{
    const userId = req.payload
    try{
        const allCart = await cart.find({userId})
        res.status(200).json(allCart)
    }
    catch(err){
        res.status(404).json("Add to cart failed : "+err)
    }
} 

exports.deleteFromCart = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const pro = await cart.findOneAndDelete({id,userId})
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


//increment quantity
exports.incrementCart = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const incrPro = await cart.findOne({id,userId})
        if(incrPro){
            incrPro.quantity+=1
            incrPro.grandtotal = incrPro.quantity*incrPro.price
            await incrPro.save()
            res.status(200).json(incrPro)
        }
        else{
            res.status(401).json("No such product in cart")
        }
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}


//decrement quantity
exports.decrementCart = async(req,res)=>{
    const {id}= req.params
    const userId = req.payload
    try{
        const decrPro = await cart.findOne({id,userId})
        if(decrPro){
            decrPro.quantity-=1
            if(decrPro.quantity==0){
                const delPro = await cart.deleteOne({id,userId})
                // await decrPro.save()
                if(delPro){
                    const allPro = await cart.find({userId})
                    res.status(200).json(allPro)
                }
            }
            else{
                decrPro.grandtotal = decrPro.quantity*decrPro.price
                await decrPro.save()
                res.status(200).json(decrPro)
            }
        }
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}