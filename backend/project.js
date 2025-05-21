const port=5000;
const express=require('express')
const app=express();
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
const multer=require('multer')
const path=require('path')
const cors=require('cors')
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Express app is running")
})
mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));
  
  // Define Schema
  const postSchema = new mongoose.Schema({
    caption: String,
    fileUrl: String,
    isStory: Boolean,
    createdAt: { type: Date, default: Date.now },
  });
  const UserProfile = mongoose.model("userprofile", new mongoose.Schema({
    username: String,
    fullName: String,
    avatar: String,
    bio: String,
    location: String,
    stats: {
      posts: Number,
      followers: Number,
      following: Number,
    },
  }));
  
  const Post = mongoose.model("Post", postSchema);
  
  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  app.use('/images', express.static(path.join(__dirname, 'uploads')));
  
  // API to create a post
  app.post("/posts", upload.single("file"), async (req, res) => {
    try {
      const { caption, isStory } = req.body;
      const fileUrl =`http://localhost:${port}/images/${req.file.filename}`
  
      const newPost = new Post({ caption, fileUrl, isStory });
      await newPost.save();
  
      res.status(201).json({ message: "Post created", post: newPost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // API to fetch all posts
  app.get("/posts", async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/userProfile", async (req, res) => {
    try {
      console.log("hii")
      const profile = await UserProfile.findOne();
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  })
  app.post("/userProfile",async (req, res) => {
    try {
       
    
       
    
        const newPost = new UserProfile(req.body);
        await newPost.save();
    
        res.status(201).json({ message: "Post created", post: newPost });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  })
  app.put("/userProfile", async (req, res) => {
    const updatedProfile = await UserProfile.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedProfile);
  });
  
app.listen(port,()=>{
    console.log("server started and running on port 500...")
})