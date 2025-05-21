const port=4000;
const express=require('express')
const app=express();
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
const multer=require('multer')
const path=require('path')
const cors=require('cors')
app.use(express.json())
app.use(cors());
mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
    console.log("connected to mongodb")}).catch((error)=>{
        console.log(error)})
app.get("/",(req,res)=>{
    res.send("Express app is running")
})
const storage=multer.diskStorage({
    destination:path.resolve(__dirname,'uploads/images'),
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({
    storage:storage
})
// use upload/images when /images is encountered
// app.use('/images',express.static(__dirname+'uploads/images'))
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
const User=mongoose.model("users",{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }

})
app.post('/signup',async(req,res)=>{
    // console.log("hii")
    // console.log(req.body)
    let check=await User.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart={};
    let products=await Product.find({})
    products.forEach((product) => {
        cart[product.id] = 0;
    });
    // console.log(req.body)
    const user=new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,

        cartData:cart,
    })
    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})
app.post('/login',async(req,res)=>{
    let check=await User.findOne({email:req.body.email});
    console.log(check)
    console.log(req.body)
    if(check){
        const passCompare=req.body.password===check.password;
        if(passCompare){
            // console.log(true)
            const data={
                user:{
                    id:check.id
                }
            }
            const token=jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        
        }
        else{
            res.json({success:false,error:"wrong password"})
        }
    }
    else{
        res.json({
            success:false,error:"wrong mail"
        })
    }
})
const Product=mongoose.model("product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        reqired:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    availabe:{
        type:Boolean,
        default:true,
    },
    
    
})
// adding product
app.post("/addproduct",async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product);
    await product.save();
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name
    })
})
//remove product
 app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name
    })
 })
//all_products
app.get("/getproducts",async(req,res)=>{
   let product=await Product.find({})
//    console.log(product)
   res.send(product)
})
//new collection
app.get("/newcollection",async(req,res)=>{
    let product=await Product.find({})
    let newcollection=product.slice(-8)
    res.send(newcollection)
})
//popular 
app.get("/popularinwomen",async(req,res)=>{
    let products=await Product.find({category:'women'})
    let popular =products.slice(-4)
    res.send(popular)
})
// creating middleware
const fetchUser =async(req,res,next)=>{
    const token=req.header('auth-token')
    console.log(token)
    if(!token){
        res.status(401).send({error:"please authenicate using valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom')
            console.log(data)
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authenticate using valid token"})
        }
    }
}
//addtocart
app.post('/addtocart',fetchUser,async(req,res)=>{
    // console.log(req.body,req.user)
    let UserData=await User.findOne({_id:req.user.id})
    // console.log(UserData.cartData[req.body.itemid])
    UserData.cartData[req.body.itemid]+=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:UserData.cartData})
    res.send({message:"sent"})
    
})
//removefromcart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    // console.log(req.body,req.user)
    let UserData=await User.findOne({_id:req.user.id})
    console.log(UserData)
    console.log(UserData.cartData[req.body.itemid])
     UserData.cartData[req.body.itemid]-=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:UserData.cartData})
    res.send({message:"removed"})

    
   
})
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log(req.user.id)
    let UserData=await User.findOne({_id:req.user.id})
    console.log(UserData)
    // console.log(UserData.cartData)
    res.json(UserData.cartData);

})

app.listen(port,()=>{
    console.log("server started and running on port 400...")
})