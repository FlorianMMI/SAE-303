import { getRequest } from '../src/lib/api-request.js';

let order6sale = {};

order6sale.getSale6m = async function(status){
    let request = `orders?stat=sale6month`;
    let data = await getRequest(request);
    return data;
}


export { order6sale };