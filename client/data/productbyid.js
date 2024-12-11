import { getRequest } from '../src/lib/api-request.js';

let dataproduct = {};

dataproduct.getproductbyid = async function(status){
    let request = `products?stat=salesbyproduct&id=1`;
    let data = await getRequest(request);
    return data;
}
dataproduct.getproductname = async function(){
    let request = `products?stat=productbyname`;
    let data = await getRequest(request);
    return data;
}


export { dataproduct };