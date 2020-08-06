import { camelize } from '@ember/string';
import omit from 'lodash.omit';
export default function(collection, options) {
  return function(schema, request) {
    let response = schema[collection].all();

    response = filterByQueryParams(request, response);
    response = filterBySlug(request, response, options);
    response = sort(request, response);

    if (request.queryParams.page) {
      return handlePagination.call(this, request, response);
    } else if (request.queryParams.quantity) {
      return handleQuantity(request, response);
    } else {
      return response;
    }
  }
}

function filterByQueryParams(request, response) {
  let filterParams = omit(
    request.queryParams,
    ['slug', 'include', 'page', 'perPage', 'per_page', 'sort', 'quantity']
  );

  if (filterParams) {
    return response.filter((item) => {
      return Object.keys(filterParams)
                   .every((attr) => item[attr] === filterParams[attr]);
    })
  } else {
    return response;
  }
}

function filterBySlug(request, response, options) {
  if(options?.slug && request.queryParams.slug) {
    return response.filter((item) => {
      return item.slug === request.queryParams.slug;
    });
  } else {
    return response;
  }
}

function sort(request, response) {
  if (request.queryParams.sort) {
    let param = camelize(request.queryParams.sort);

    if (request.queryParams.sort.charAt(0) === "-"){
      return response.sort((a,b) => {
        return b[param] - a[param];
      })
    } else {
      return response.sort((a,b) => {
        return a[param] - b[param];
      })
    }
  } else {
    return response;
  }
}

function handlePagination(request, response) {
  let page = request.queryParams.page;
  let perPage = request.queryParams.perPage || request.queryParams.per_page || 10;

  let start = (page - 1) * perPage;
  let end = page * perPage;
  let totalPages = Math.ceil(response.length / perPage);

  let resources = response.slice(start, end);

  let json = this.serialize(resources);
  json.meta = { totalPages };

  return json;
}

function handleQuantity(request, response) {
  return response.slice(0, request.queryParams.quantity);
}
