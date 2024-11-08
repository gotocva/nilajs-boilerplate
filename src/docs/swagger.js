import { AdminLoginApi, AdminLoginSchema } from "./api/admin-login"

/**
 * 
 */
export const docs = {
    "swagger": "2.0",
    "info": {
        "version": "3.0.0",
        "title": "Nilajs API documentation ",
        "description": "Nilajs API Documentation using swagger"
    },
    "servers": [
        {
          "url": "http://localhost:3000"
        }
    ],
    "paths" : {
        "/v1/admin/login": AdminLoginApi
    },
    "definitions" : {
        "AdminLoginSchema": AdminLoginSchema
    }
}

console.log(docs);
