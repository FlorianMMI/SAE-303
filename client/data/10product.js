import { getRequest } from '../src/lib/api-request.js';

let tenproduct = {};

tenproduct.gettenproduct = async function(status){
    let request = `products?stat=stock`;
    let data = await getRequest(request);
    return data;
}


export { tenproduct };