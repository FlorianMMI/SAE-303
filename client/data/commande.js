import { getRequest } from '../src/lib/api-request.js';

let orderData = {};

orderData.getStatut = async function(status){
    let request = `orders?countorderstatus=${status}`;
    let data = await getRequest(request);
    return data.count;
}


export { orderData };