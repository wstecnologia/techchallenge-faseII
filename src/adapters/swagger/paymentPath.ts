export const paymentPath = {
  "/api/payment": {
    post: {
      tags: ["Payment"],
      summary: "Register Payment",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "string",
                },
                amount: {
                  type: "number",
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
  },

  "/api/payment-status": {
    put: {
      tags: ["Payment"],
      summary: "Edit status payment",
      parameters: [
        {
          name: "paymentId",
          in: "query",
          description: "Payment Id",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "status",
          in: "query",
          description: "Status Payment",
          required: true,
          schema: {
            type: "string",
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
          description: "Category not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
