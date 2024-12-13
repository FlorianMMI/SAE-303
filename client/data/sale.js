import { getRequest } from '../src/lib/api-request.js';

let saleData = {};

saleData.getSale = async function(){
    let request = `orders?stat=sale`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}

let saleDatacountry = {};

saleDatacountry.getSalecountry = async function(value){
    let request = `products?stat=salesbycountry&month=${value}`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}

saleDatacountry.getSalecountry2 = async function(){
    let  request = `products?stat=salesbycountry`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}

export { saleDatacountry };
export { saleData };