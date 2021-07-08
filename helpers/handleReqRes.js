/*
 * Title: handle request response
 * Description: handle request and response
 * Author: Mahfuz Islam
 * Date: 05/07/2021
 *
 */
// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { routes } = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
// const {} = require('../handlers/routeHandlers/')

// app object - module scaffolding
const handler = {};

// handle req and res
handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    console.log('route', routes.sample);
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
    });

    // console.log(headersObject);

    // response handle
    res.end('Hello Programmers! How are you?');
};

module.exports = handler;
