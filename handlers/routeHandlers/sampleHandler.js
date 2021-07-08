/*
 * Title: Routes
 * Description: Application Routes
 * Author: Mahfuz Islam
 * Date: 05/07/2021
 *
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
