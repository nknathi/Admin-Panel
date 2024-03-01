import create from 'react';
// provider is used to connect to a JSON Server backend.
import jsonServerProvider from "ra-data-json-server";
// provides tools for building admin interfaces.
import { DataProvider, fetchUtils } from "react-admin";
// used to serialize query parameters into a URL-friendly string.
import { stringify } from "querystring";

// constant stores the base URL of the API endpoint
const apiUrl = 'https://my.api.com/';
// constant is assigned the value fetchUtils.fetchJson
const httpClient = fetchUtils.fetchJson;

// an object that defines methods for interacting with the API.
export const dataProvider: DataProvider = {
  // method is used for fetching a list of resources (e.g., a list of items). It takes two parameters:
  // resource (the type of resource to fetch) and 
  // params (an object containing various options like pagination, sorting, and filtering).
  getList: (resource, params) => {
  // extracts pagination and sorting parameters from params  
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;

  // a query object containing the sorting, pagination, and filter information.
  const query = {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([(page -1) * perPage, page * perPage - 1]),
    filter: JSON.stringify(params.filter),
  };
  // constructs the URL by appending the apiUrl and the serialized query object.
  const url = `${apiUrl}/${resource}?${stringify(query)}`;
  // makes an HTTP request using the httpClient to the constructed URL and processes the response.
  // It returns an object with data (the fetched data) and total (the total number of items,
  // likely for pagination purposes).
  return httpClient(url).then(({ headers, json }) => ({
    data: json,
    total: parseInt((headers.get('content-range')?.toString() || "0").split('/').pop() || "0", 10)
  }));
},

// method is used to fetch a single resource item by its ID. 
// It takes resource and params as parameters.
getOne: (resource, params) => 
  // It makes an HTTP request to this URL using the httpClient and returns an object with the fetched data.
  httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    data: json,
  })),

// used to retrieve multiple records of a resource.
// It takes two parameters: resource (the name of the resource, e.g., "users") and
// params (an object containing various parameters for the request).
getMany: (resource, params) => {
  // constructs a query object with a filter parameter that specifies the IDs of the records to retrieve
  const query = {
    filter: JSON.stringify({ id: params.ids }),
  };
  // constructs a URL using the apiUrl and the query object.
  const url = `${apiUrl}/${resource}?${stringify(query)}`;
  // sends an HTTP GET request to the constructed URL using the httpClient function
  // processes the response, parsing it as JSON, and returns an object with a data property containing the retrieved data.
  return httpClient(url).then(({ json }) => ({ data: json }));
},
 
// used when retrieving records that have a reference to another record.
// It is often used in the context of related data
// takes two parameters: resource and params.
getManyReference: ( resource, params) => {
  // extracts pagination and sorting information from params
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;
  // constructs a query object with parameters for sorting, pagination, and filtering based on the target resource ID.
  const query = {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([(page -1) * perPage, page * perPage - 1]),
    filter: JSON.stringify({
      ...params.filter,
      [params.target]: params.id, 
    }),
  };
  // constructs a URL using the apiUrl and the query object
  const url = `${apiUrl}/${resource}?${stringify(query)}`;

  // sends an HTTP GET request to the constructed URL using the httpClient function
  return httpClient(url).then(({headers, json }) => ({
    // processes the response, parsing it as JSON, and
    // extracts the total number of records from the content-range header,
    // returning an object with both data and total properties.
    data: json,
    total: parseInt((headers.get('content-range') || "0").split('/').pop() || "0", 10),
  }));
}, 

// function is used to update a single resource item on the server
update: (resource, params) =>
// sends a PUT request to ${apiUrl}/${resource}/${params.id} with the updated data in the request body
  httpClient(`${apiUrl}/${resource}/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(params.data),
  }).then(({ json }) => ({ data: json})), // returns a promise that resolves to an object containing the updated data.

// function is used to update multiple resource items on the server  
updateMany: (resource, params) => {
  // constructs a query to filter the items to be updated based on their IDs and
  const query = {
    filter: JSON.stringify({ id: params.ids}),
  };
  // sends a PUT request to ${apiUrl}/${resource} with the filtered IDs and the updated data in the request body
  return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    method: 'PUT',
    body: JSON.stringify(params.data),
  }).then(({ json }) => ({ data: json})); // returns a promise that resolves to an object containing the updated data.
},  

// function is used to create a new resource item on the server
// takes two arguments, resource and params
// params contains the data needed for creating the resource
create: (resource, params) =>
  // Promise wrapping an asynchronous operation that will send a POST request to a specific URL.
  new Promise((resolve, reject) => {
    // HTTP POST request uses a variable called apiUrl (which is expected to contain the base URL for your API) and appends the resource to it to form the complete URL
    httpClient(`${apiUrl}/${resource}`, {
      // sends a POST request to this URL with the data from params being sent in the request body
      method: 'POST',
      body: JSON.stringify(params.data),
      // a .then callback function.
      // This function expects a response object and extracts the json property from it.
      // This json property likely contains the response data from the server.
    }).then(({ json }) => ({
      // allback function returns an object.
      // It constructs a new object with a data property.
      // Inside the data property, it includes an id property with the value extracted from json.id, 
      // and it spreads the contents of params.data into this object.
      // This effectively combines the newly created resource's ID with the original data used for creation
      data: { id: json.id, ...params.data },
  }))
}),

// function is used to delete a single resource item on the server  
delete: (resource, params) =>
// sends a DELETE request to ${apiUrl}/${resource}/${params.id}
httpClient(`${apiUrl}/${resource}/${params.id}`, {
    method: 'DELETE',
}).then(({ json }) => ({ data: json })), // returns a promise that resolves to an object indicating the success of the delete operation.
    
// function is used to delete multiple resource items on the server
deleteMany: (resource, params) => {
  // constructs a query to filter the items to be deleted based on their IDs and
  const query = {
    filter: JSON.stringify({ id: params.ids}),
  };
  // sends a DELETE request to ${apiUrl}/${resource} with the filtered IDs
  return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    method: 'DELETE',
  }).then(({ json }) => ({ data: json })); // returns a promise that resolves to an object indicating the success of the delete operation.
}
};

// dataProviderX constant  configured to use the jsonServerProvider, 
export const dataProviderX = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);
