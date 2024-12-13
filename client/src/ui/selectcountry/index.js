import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/selectcountry/templateoption.html");

const template = await templateFile.text();

let countryView = {
    render: function(data) {
        let html = "";
        if (!Array.isArray(data)) {
            data = [data];
        }
        for (let obj of data) {
            html += genericRenderer(template, obj);
        }
        return html;
    },
};

console.log(countryView);

export { countryView };