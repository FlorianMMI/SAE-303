import { HeaderView } from "./ui/header/index.js";
import { StatutView } from "./ui/statut/index.js";
import { am5 } from "./ui/TopSale - Graph/index.js";
import { graph } from "./ui/Sale6m - graph/index.js";
import { graphbycat } from "./ui/Sale6mbycat - graph/index.js";
import { graphten } from "./ui/tenproduct - graph/index.js";
import { productView } from "./ui/selectproduct/index.js";
import { clientView } from "./ui/selectclient/index.js";
import { countryView } from "./ui/selectcountry/index.js";
import { graphproduct } from "./ui/selectproduct - Gra/index.js";
import { graphclient } from "./ui/selectclient - graph/index.js";



import { orderData } from "../data/commande.js";
import { saleData } from "../data/sale.js";




import './index.css';
import { dataproduct } from "../data/productbyid.js";
import { dataclient } from "../data/client.js";
import { dataclientcountry } from "../data/client.js";
import { datamonth } from "../data/client.js";
import { mapview } from "./ui/graphmap/index.js";
import { heatview } from "./ui/heatmap/index.js";

let C = {};

C.init = async function(){
    C.loadStatut();
    C.loadSale();
    C.loadProduct();
    C.loadClient();
    C.loadSaleCountry();
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

C.loadClient = async function(){
    let clientData = await dataclient.getclient();
    console.log(clientData);
    V.renderClient(clientData);
}

C.loadSaleCountry = async function(){
    let Datacountry = await datamonth.getmonth();
    console.log("Les data du country sont ", Datacountry);
    V.renderCountry(Datacountry);
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
    client: document.querySelector("#clientselect"),
    country : document.querySelector("#countryselect"),
    heat: document.querySelector("#heatdiv")
    

};




V.init = async function(){
    V.renderHeader();
    V.renderGraph();
    // graphclient("clientdiv", 1)
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

V.renderClient = function(clientData){
    V.client.innerHTML = clientView.render(clientData);
}

V.renderCountry = function(countryData){
    V.country.innerHTML = countryView.render(countryData);
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
    graphproduct("productdiv", selectedProductId);
    

});

V.client.addEventListener('change', async function(event) {

    let selectedClientName = event.target.value;
    console.log(selectedClientName);
    let selectedClientId = event.target.options[event.target.selectedIndex].dataset.id;
    console.log(selectedClientId);
    document.querySelector("#clientdivcontainer").innerHTML = "";
    let tmp = document.createElement("div");
    tmp.id = "clientdiv";
    document.querySelector("#clientdivcontainer").innerHTML = tmp.outerHTML;
    graphclient("clientdiv", selectedClientId);
    

});
V.country.addEventListener('change', async function(event) {
    let selectedCountryName = event.target.value;
    console.log(selectedCountryName);
    let selectedCountryId = event.target.options[event.target.selectedIndex].dataset.id;
    console.log(selectedCountryId);
    document.querySelector("#mapdivcontainer").innerHTML = "";
    let tmp = document.createElement("div");
    tmp.id = "mapdiv";
    document.querySelector("#mapdivcontainer").innerHTML = tmp.outerHTML;
    mapview("mapdiv", selectedCountryName);
});

V.renderGraph = function(){
    graphbycat("graphdivbycat");
    graphproduct("productdiv", 16);
    graphclient("clientdiv", 20);
    mapview("mapdiv", "2024-06");
    heatview("heatdiv");
}

C.init();

