const request= require("supertest")
const User=require('../../api/models/userModel')
const app=require('../../app')
const setupTestDB=require('../utils/setupTestDb')
const {admin,userOne,insertUsers}=require('../utils/user.util')

const {userAccessToken,adminAccessToken}=require('../utils/tokenUtil')


setupTestDB()

test("GET /users", async () => {
   
    await insertUsers([admin]);  
   const response= await request(app).get("/users")
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send()
      .expect(200)

      expect(Array.isArray(response.body)).toBeTruthy();
   
  });