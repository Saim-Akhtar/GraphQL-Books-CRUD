const graphql=require('graphql')
const resolvers=require('../Resolver/resolvers')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const BookType=new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type: new GraphQLNonNull(GraphQLID)},
        name:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        author:{type: new GraphQLNonNull(GraphQLString)}
    })
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:()=>({
        book:{
            type:BookType,
            args:{ id: { type:GraphQLID} },
            resolve:(parent,args)=>resolvers.getById(args.id)
        },
        books:{
            type: new GraphQLList(BookType),
            resolve:(parent,args)=>resolvers.getAllBooks()
        }
    })
})

const inputBookType=new GraphQLInputObjectType({
    name:"BookInput",
    fields:()=>({
        id:{type: new GraphQLNonNull(GraphQLID)},
        name:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        author:{type: new GraphQLNonNull(GraphQLString)}
    })
})

const Mutation=new GraphQLObjectType({
    name:"Mutuation",
    fields:()=>({
        addBook:{
            type:BookType,
            args:{
                input:{type: new GraphQLNonNull(inputBookType)}
            },
            resolve:(parent,args)=>resolvers.addBook(args.input)
        },
        deleteBook:{
            type:new GraphQLList(BookType),
            args:{
                id:{type: GraphQLID}
            },
            resolve:(parent,args)=>resolvers.deleteBook(args.id)
        }
    })
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});