const products = require('../Models/productSchema')


//get all products

exports.getAllProducts = async(req,res)=>{
    console.log("Inside get all products");
    try{
        const allPros = await products.find()
        // console.log(allPros);
        res.status(200).json(allPros)
    }
    catch(err){
        res.status(404).json("Getting failed : "+err)
    }
}

exports.getAProduct = async(req,res)=>{
    console.log("Inside get a product");
    const {pid} = req.params
    console.log(pid);
    try{
        const apro = await products.find({id:pid})
        if(apro){
            res.status(200).json(apro)
        }
        else{
            res.status(401).json("Product Not available")
        }
    }
    catch(err){
        res.status(404).json("Getting failed : "+err)
    }
}