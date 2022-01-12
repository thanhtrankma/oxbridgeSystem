import qs from 'querystringify';

let HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-client-app-version': '1.0.0',
  'x-client-app-code': 'homefood',
  'x-client-locale': 'vi',
};
const parseJsonOrGetText = data => {
  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    result = data;
  }
  return result;
};

const onResponse = async (request, result) => {
  try {
    const body = await result.text();
    const newBody = parseJsonOrGetText(body);
    // Response is json but not a successful response
    if (result.status !== 200) {
      const exception = {
        exception: newBody,
        type: 'object',
      };
      throw exception;
    }

    // SUCCESS: Return valid response
    return newBody;
  } catch (e) {
    if (e?.type === 'object') {
      throw e;
    }
    // console.log(result.status, result._bodyText); // uncomment this line if unexpected error occured
    // SUCCESS: when response is {} and status 200 but parsing JSON failed. Still is success response
    if (result.status === 200) {
      return result;
    }
    // // FAILED: Throw unknown exceptions
    const exception = {
      exception: result,
      type: 'raw',
    };
    throw exception;
  }
};

const config = {
  post: (endpoint, params) => {
    const url = `/api/${endpoint}`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };

    return fetch(url, options).then(result => onResponse(request, result));
  },

  get: (endpoint, params) => {
    const url = `/api/${endpoint}${qs.stringify(params, true)}`;
    const options = {
      method: 'GET',
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },

  put: (endpoint, params) => {
    const url = `/api/${endpoint}`;
    const options = {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(params),
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },

  delete: (endpoint, params) => {
    const url = `/api/${endpoint}${qs.stringify(params, true)}`;
    const options = {
      method: 'DELETE',
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },
};

const setToken = _token => {
  HEADERS = {
    ...HEADERS,
    Authorization: `Bearer ${_token}`,
  };
};

const setClientLocale = (locale = 'vi') => {
  HEADERS = {
    ...HEADERS,
    'x-client-locale': locale,
  };
};

export {config, setToken, setClientLocale};
