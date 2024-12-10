import { getRequest } from '../src/lib/api-request.js';

let order6salebycat = {};

order6salebycat.getSale6mbycat = async function(status){
    let request = `orders?stat=sale6monthbycat`;
    let data = await getRequest(request);
    return data;
}


export { order6salebycat };