import { HeaderView } from "./ui/header/index.js";
import { StatutView } from "./ui/statut/index.js";
import { am5 } from "./ui/TopSale - Graph/index.js";
import { graph } from "./ui/Sale6m - graph/index.js";
import { graphbycat } from "./ui/Sale6mbycat - graph/index.js";
import { graphten } from "./ui/tenproduct - graph/index.js";
import { productView } from "./ui/selectproduct/index.js";
import { graphproduct } from "./ui/selectproduct - Gra/index.js";


import { orderData } from "../data/commande.js";
import { saleData } from "../data/sale.js";




import './index.css';
import { dataproduct } from "../data/productbyid.js";

let C = {};

C.init = async function(){
    C.loadStatut();
    C.loadSale();
    C.loadProduct();
    V.init();
    
}

C.loadStatut = async function(){
    
    let data = await orderData.getStatut("delivered");
    let data2 = await orderData.getStatut("pending");
    let data3 = await orderData.getStatut("shipped");
    console.log(data);
    V.renderStatut(data, data2, data3);

}



C.loadProduct = async function(){
    let productData = await dataproduct.getproductname();
    console.log(productData);
    V.renderProduct(productData);
}

C.loadSale = async function(){
    let Saledata = await saleData.getSale();
    console.log(Saledata);
    return Saledata;
}



let V = {
    header: document.querySelector("#header"),
    statut: document.querySelector("#statut"),
    product: document.querySelector("#productselect"),

};




V.init = async function(){
    V.renderHeader();
    V.renderGraph();
}

V.renderHeader = function(){
    V.header.innerHTML = HeaderView.render();
}

V.renderStatut = function(orderData, orderData2, orderData3){
    V.statut.innerHTML = StatutView.render(orderData, "Delivered");
    V.statut.innerHTML += StatutView.render(orderData2, "Pending");
    V.statut.innerHTML += StatutView.render(orderData3, "Shipped");
    
}

V.renderProduct = function(productData){
    V.product.innerHTML = productView.render(productData);
}



V.product.addEventListener('change', async function(event) {
    let selectedProductName = event.target.value;
    console.log(selectedProductName);
    let selectedProductId = event.target.options[event.target.selectedIndex].dataset.id;
    console.log(selectedProductId);
    document.querySelector("#productdivcontainer").innerHTML = "";
    let tmp = document.createElement("div");
    tmp.id = "productdiv";
    document.querySelector("#productdivcontainer").innerHTML = tmp.outerHTML;
    console.log(selectedProductId);
    
    graphproduct("productdiv", selectedProductId);
    

});

V.renderGraph = function(){
    graphbycat("graphdivbycat");

}

C.init();

