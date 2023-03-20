## HOANG VAN TIEP 
#### Build Setup
Type `npm start` to install all node_modules

Type `npm start` to use a project

to= `http://localhost:4000/graphql` Go to apollo page

### Features
- Guest users can read all the posts but cannot comment until they log in.
- Authenticated users can create/update/delete their own posts, as well as comment on all other posts using their credentials.
- Everyone can search posts using keywords that match the post title and body.

### Input
```js
input BlogInput {
  title: String!
  content: String
}
input UserInput {
  firstName: String
  lastName: String
  username: String!
  password: String!
}
```
### Query 

```js
  #Blog query
  listBlogs(limit: Int = 10, cursor: ID): [Blog!]# Get all blogs 
  getBlogById(blogId: ID!): Blog #Get id by id blog
  searchBlogs(filters: BlogFilterInput, limit: Int = 10, cursor: ID): [Blog!]#Search blog by keys
```
### Mutation
```js
  #For user Auth
  signUp(userInput: UserInput!): SignUpResponse!
  login(username: String!, password: String!): LoginResponse!
  logout: LogoutResponse!

  #For User BLOG
  createBlogByUser(BlogInput: BlogInput!): CreateBlogResponse!
  deleteBlogByUser(BlogId: ID!): DeleteBlogResponse!
  updateBlogByUser(BlogId: ID!, BlogInput: BlogInput!): UpdateBlogResponse!
  createCommentByUser(blogId: ID!, message: String!): CreateCommentResponse!
  ```
