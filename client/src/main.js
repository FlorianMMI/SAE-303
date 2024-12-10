import { HeaderView } from "./ui/header/index.js";
import { StatutView } from "./ui/statut/index.js";
import { am5 } from "./ui/TopSale - Graph/index.js";
import { graph } from "./ui/Sale6m - graph/index.js";


import { orderData } from "../data/commande.js";
import { saleData } from "../data/sale.js";




import './index.css';

let C = {};

C.init = async function(){
    C.loadStatut();
    C.loadSale();
    V.init();
}

C.loadStatut = async function(){
    
    let data = await orderData.getStatut("delivered");
    let data2 = await orderData.getStatut("pending");
    let data3 = await orderData.getStatut("shipped");
    console.log(data);
    V.renderStatut(data, data2, data3);

}

C.loadSale = async function(){
    let Saledata = await saleData.getSale();
    console.log(Saledata);
    return Saledata;
}



let V = {
    header: document.querySelector("#header"),
    statut: document.querySelector("#statut"),

};




V.init = async function(){
    V.renderHeader();
}

V.renderHeader = function(){
    V.header.innerHTML = HeaderView.render();
}

V.renderStatut = function(orderData, orderData2, orderData3){
    V.statut.innerHTML = StatutView.render(orderData, "Delivered");
    V.statut.innerHTML += StatutView.render(orderData2, "Pending");
    V.statut.innerHTML += StatutView.render(orderData3, "Shipped");
    
}

V.renderGraph = function(){
    
}


C.init();

