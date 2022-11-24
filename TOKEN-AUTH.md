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