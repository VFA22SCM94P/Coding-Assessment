import axios from 'axios';
import OpenAI from "openai";
//const axios = require('axios'); // legacy way
export const LoginApi = async (params) => {
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/login/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;
    
    
}

export const CreatePost = async (params) => {
  console.log(params);
  var returnData;
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/blogposts/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}

export const DeletePost = async (params) => {
  console.log(params);
  var returnData;
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/blogposts/${params.id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params.data
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}

export const GetPosts = async (params) => {
  var returnData;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/blogposts/',
      headers: { 
        'Content-Type': 'application/json'
      },
      // data : params
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}

export const UpdatePost = async (params) => {
  console.log(params);
  var returnData;
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/blogposts/${params.id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : params.data
    };
    
    await axios.request(config)
    .then((response) => {

      returnData =  {
        statusCode : response.status,
      data : response.data}
        ;
    })
    .catch((error) => {
      returnData =  {
        statusCode : error.response.status,
      data : error.response.data}
        ;
    });
    return returnData;   
}
export const CreateAccountApi = async (params) => {
  var returnData;
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:8000/users/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : params
  };
  
  await axios.request(config)
  .then((response) => {
    returnData =  {
      statusCode : response.status,
    data : response.data}
      ;
  })
  .catch((error) => {
    returnData =  {
      statusCode : error.response.status,
    data : error.response.data}
      ;
  });
  return returnData;
}


