export const productPath = {
  "/api/products": {
    post: {
      tags: ["Products"],
      summary: "Register Product",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Nome do produto",
                },
                description: {
                  type: "string",
                  example: "Nome do produto",
                },
                categoryId: {
                  type: "string",
                  example: "Nome do produto",
                },
                price: {
                  type: "number",
                },
                image: {
                  type: "number",
                  example: "Preço do produto a ser alterado ",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Created",
        },
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    get: {
      tags: ["Products"],
      summary: "List All Products",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page Number",
          required: true,
          default: 1,
          schema: {
            type: "number",
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Products not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    put: {
      tags: ["Products"],
      summary: "Edit Product",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                id: {
                  type: "number",
                  example: 12345,
                },
                name: {
                  type: "string",
                  example: "Nome do produto",
                },
                description: {
                  type: "string",
                  example: "Descrição do produto",
                },
                category: {
                  type: "string",
                  example: "Categoria do produto",
                },
                price: {
                  type: "number",
                  example: 0.0,
                },
                image: {
                  type: "image",
                  example: "Imagem do produto a ser alterado ",
                },
                active: {
                  type: "boolean",
                  example: "Ativo/inativo.",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Products"],
      summary: "Delete Product",
      parameters: [
        {
          name: "id",
          in: "query",
          description: "Product Code",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Sucesso",
        },
        400: {
          description: "Requisição inválida",
        },
        401: {
          description: "Acesso inválido",
        },
        404: {
          description: "Produto não encontrado",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/api/products/category": {
    get: {
      tags: ["Products"],
      summary: "List Product by Category ",
      parameters: [
        {
          name: "category",
          in: "query",
          description: "Category",
          required: true,
          default: "471fec1d-db1c-406d-87ce-50be1232fba1",
          schema: {
            type: "string",
          },
        },
        {
          name: "page",
          in: "query",
          description: "Page number",
          required: false,
          default: 1,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
