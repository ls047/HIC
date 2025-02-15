import type { ApiSection } from '../types/api'

// Add page metadata at the top of the file
export const pageMetadata = {
  title: "Crack Detection API",
  subtitle: "Comprehensive API documentation and testing interface"
}

const apiData = {
  "controllers": {
    "Crack Controller": [
      {
        "name": "all-sites",
        "endpoint": "all-sites/{keyword}",
        "method": "GET",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "keyword",
            "in": "InUrl",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      },
      
      {
        "name": "Home-sites",
        "endpoint": "Home-sites",
        "method": "PATCH",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "req",
            "in": "FromBody",
            "required": true,
            "type": "crack.oldgap.com.Controllers.CrackController.BodyFrom",
            "bodyParameters": [
              {
                "name": "test",
                "required": true,
                "type": "String"
              },
              {
                "name": "grade",
                "required": true,
                "type": "Int32"
              }
            ]
          }
        ]
      },
      {
        "name": "fuck-sites",
        "endpoint": "fuck-sites",
        "method": "DELETE",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "size",
            "in": "FromRoute",
            "required": true,
            "type": "String",
            "bodyParameters": null
          },
          {
            "name": "cheap",
            "in": "FromRoute",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      },
      {
        "name": "Query-sites",
        "endpoint": "Query-sites",
        "method": "DELETE",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "size",
            "in": "FromQuery",
            "required": true,
            "type": "String",
            "bodyParameters": null
          },
          {
            "name": "cheap",
            "in": "FromQuery",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      },
      {
        "name": "all-sites",
        "endpoint": "all-sites",
        "method": "DELETE",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "req",
            "in": "FromBody",
            "required": true,
            "type": "crack.oldgap.com.Controllers.CrackController.BodyFrom",
            "bodyParameters": [
              {
                "name": "test",
                "required": true,
                "type": "String"
              },
              {
                "name": "grade",
                "required": true,
                "type": "Int32"
              }
            ]
          }
        ]
      },
      {
        "name": "steamrip-dot-com",
        "endpoint": "steamrip-dot-com/{keyword}",
        "method": "GET",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [
          {
            "name": "keyword",
            "in": "InUrl",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      },
      {
        "name": "crack-games-dot-org",
        "endpoint": "crack-games-dot-org/{keyword}",
        "method": "GET",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [

          {
            "name": "keyword",
            "in": "InUrl",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      },
      {
        "name": "fitgirl-repack-dot-site",
        "endpoint": "fitgirl-repack-dot-site/{keyword}",
        "method": "GET",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": [

          {
            "name": "keyword",
            "in": "InUrl",
            "required": true,
            "type": "String",
            "bodyParameters": null
          }
        ]
      }
    ],
    "Values Controller": [
      {
        "name": "nonoe",
        "endpoint": "nonoe",
        "method": "GET",
        "summary": "TODO: maybe I will add this feature.",
        "parameters": []
      }
    ]

  },
  "commonResponses": {
    "200": "Ok",
    "201": "Created",
    "202": "Accepted",
    "204": "No Content",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "408": "Request Timeout",
    "413": "Payload Too Large",
    "414": "URI Too Long",
    "423": "Locked",
    "429": "Too Many Requests",
    "431": "Request Header Fields Too Large",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway"
  }
}

// Transform the API documentation into our format
export const apiSections: ApiSection[] = Object.entries(apiData.controllers).map(([name, endpoints]) => ({
  name,
  endpoints: endpoints.map(endpoint => ({
    ...endpoint,
    apis: [`/${endpoint.endpoint}`],
    description: endpoint.summary,
    defaultResponses: {
      '200': 'Ok',
      '400': 'Bad Request',
      '404': 'Not Found',
      '500': 'Internal Server Error'
    },
    exampleResponse: {
      "status": "success",
      "data": {
        "message": "Example response for " + endpoint.endpoint
      }
    }
  }))
}))

export const commonResponses = apiData.commonResponses 