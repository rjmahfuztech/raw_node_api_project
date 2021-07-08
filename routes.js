/*
 * Title: Routes
 * Description: Application Routes
 * Author: Mahfuz Islam
 * Date: 05/07/2021
 *
 */
// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;
