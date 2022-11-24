Client-Side Auth

Auth:
- Authentication: The user's identity
- Authorization: What resources a user has access to

sessionStorage -> store JWT on the client-side
jwt: JSON Web Token
- helps with authorization

Where does a JWT come for?
- Server will generate the JWT!
- Server will respond to client request for a JWT with the generated JWT

What does the client do with the JWT?
- Store in sessionStorage / localStorage / cookies
- For all future API requests to our server... send the JWT in the header, so that server knows who is asking for the information 



3 parts JWT:
- Header
- Payload
- Signature 
    -> hash of the header + payload + secret key 
    -> if payload is modified, the signature will change


Server-Side Auth


POST /api/users/register
- Save profile information to database
    - Responds with new user (201 Created)

POST /api/users/login
- Validate user credentials
    - If valid: Generate the JWT, Respond with JWT (200)
    - If invalid: Respond with Invalid Credentials (401)



GET /api/users/profile
- GOAL: See the specific user information of the user that is logged in
- Include JWT in Authorization header!
- Verify the JWT
    - if not valid -> send an error response back (401)

- if valid JWT
    - in JWT payload -> grab the user id
    - using that user id -> get profile information for that user! (200)


Generating a random secret key in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"