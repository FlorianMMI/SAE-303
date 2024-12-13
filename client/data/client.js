import { getRequest } from '../src/lib/api-request.js';

let dataclient = {};

dataclient.getclient = async function(){
    let request = `client`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}


let dataclientid = {};

dataclientid.getorder = async function(id){
    let request = `client?stat=findorder&id=${id}`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}


let dataclientcountry = {};

dataclientcountry.getclientcountry = async function(){
    let request = `products?stat=country`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}


let datamonth = {};

datamonth.getmonth = async function(){
    let request = `orders?stat=month`;
    
    let data = await getRequest(request);
    console.log(data);
    return data;
}

export { datamonth };
export { dataclientcountry };
export { dataclientid };
export { dataclient  };

