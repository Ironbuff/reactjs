const {authenticateToken} = require('../controller/userAuth')
const Books = require('../models/book')
const User = require('../models/user')

const addbook = async(req,res)=>{
    
    try{
        
    const {id} = req.headers;
    Adminuser = await User.findById(id)

    if(Adminuser.role!=="admin"){
       return res.status(500).json({message:"user isnt admin and not allowed to edit books"})
    }
    
    const { url,author,title,price,description,language,discount }=req.body;
    const newbook = new Books({
        url:url,
        author:author,
        title:title,
        price:price,
        description:description,
        language:language,
        discount:discount
    })
    await newbook.save()
    res.status(200).json({message:"Book added sucessfully"})
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }
}


//update book
const updatebook = async(req,res) =>{
        try {
            const { bookid } = req.headers;
            const UpdateBook = await Books.findById(bookid);
    
            if (!UpdateBook) {
                return res.status(404).json({ message: "Book not found" });
            }
    
            const { url, author, title, price, description, language,discount } = req.body;
    
            UpdateBook.url = url;
            UpdateBook.author = author;
            UpdateBook.title = title;
            UpdateBook.price = price;
            UpdateBook.description = description;
            UpdateBook.language = language;
            UpdateBook.discount = discount;
    
            await UpdateBook.save();
    
            res.status(200).json({ message: "Book updated successfully" });
    
        } catch (err) {
            console.error(err); // Helpful for debugging
            res.status(500).json({ message: "Server error" });
        }
    };

//delete book 
const deletebook = async(req,res)=>{
   try{ 
    
    const {bookid} = req.headers
    await Books.findByIdAndDelete(bookid);
    res.status(200).json({message:"Book deleted sucessfully"})
}
catch(err){
    console.log(err);
    res.status(500).json({message:"Server Error"})
}
}


// Function to apply discount to a book object
const applyDiscount = (book) => {
    if (book.discount && book.discount > 0) {
      const discountAmount = (book.price * book.discount) / 100;
      return {
        ...book._doc,
        discountedPrice: parseFloat((book.price - discountAmount).toFixed(2)),
      };
    }
    return {
      ...book._doc,
      discountedPrice: book.price,
    };
  };


  //get all books
const getbooks = async(req,res)=>{
    try {
      const books = await Books.find();
      const booksWithDiscount = books.map(applyDiscount);
      res.status(200).json(booksWithDiscount);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//get all new 4 books
const getlatestbooks = async(req,res)=>{
    try{
        const Latest = await Books.find().sort({createdAt:-1}).limit(4)
        res.status(200).json({data:Latest})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
    }
}

//get book by id
const getbookbyid = async(req,res)=>{
    try {
      const book = await Books.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      const bookWithDiscount = applyDiscount(book);
      res.status(200).json(bookWithDiscount);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


exports.addbook =addbook
exports.updatebook = updatebook
exports.deletebook = deletebook
exports.getbooks = getbooks
exports.getlatestbooks = getlatestbooks
exports.getbookbyid = getbookbyid