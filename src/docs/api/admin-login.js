
export const AdminLoginApi = {
    "post": {
        "tags": ["Admin"],
        "summary": "admin login api",
        "parameters": [
            {
                "in": "body",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "email": {
                            "type": "string",
                            "description": "The username of the admin",
                            "example": "admin"
                        },
                        "password": {
                            "type": "string",
                            "description": "The password of the admin",
                            "example": "adminpassword"
                        }
                        },
                        "required": ["email", "password"]
                    }
                    }
                    }
                },
            }
        ],
        
        "consumes": ["application/json"],
        "produces": ["application/json"],
        "responses": {
            "200": {
                "description": "Admin logged in successfully",
                "schema": {
                    "$ref": "#/definitions/AdminLoginSchema"
                }
            },
            "400": {
                "description": "Invalid request "
            }
        }
    }
}

export const AdminLoginSchema = {
    "type": "object",
    "properties": {
        "status": {
            "type": "boolean"
        },
        "data": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "_id": {
                    "type": "string"
                }
            }
        }
    }   
}