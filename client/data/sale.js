import { getRequest } from '../src/lib/api-request.js';

let saleData = {};

saleData.getSale = async function(){
    let request = `orders?stat=sale`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}


export { saleData };