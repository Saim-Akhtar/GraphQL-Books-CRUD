const { Types } = require('mongoose')
const Author = require('../db/Models/AuthorModel')
const Book = require('../db/Models/BookModel')

module.exports={
    getAuthorById: async(id)=>{
        console.log("Getting author by Id: ",id)
        try{
            const author = await Author.findById(id)
            if(author){
                return author
            }
            console.log("No author found")
        }
        catch(error){
            console.log("Error found")
            console.log(error.message)
        }
    },
    getAllAuthors: async()=>{
        try{
            const authors = await Author.find()
            if(authors){
                console.log(authors)
                return authors
            }
        }
        catch(error){
            console.log("Error found")
            console.log(error.message)
        }
    },
    getBooksByAuthorId: async(id)=>{
        console.log("Gettings author books")
        try{
            const authorBooks = await Book.find({"authorId": id})
            if(authorBooks){
                console.log(authorBooks)
                return authorBooks
            }
            
        }
        catch(error){
            console.log("Found Error")
            console.log(error.message)
        }
    },
    addAuthor: async(inputData)=>{
        console.log("Adding Author")
        console.log(inputData)
        try{
            const authorId = Types.ObjectId()
            const {name} = inputData
            const author = new Author({
                _id: authorId,
                name: name
            })
            // Saving Author object
            const result = await author.save()
            if(result){
                return {
                    id: result._id,
                    name: result.name
                }
            }
            console.log("Failed to save")
        }
        catch(error){
            console.log("Failed to add Error found")
            console.log(error.message)
        }
    }
}