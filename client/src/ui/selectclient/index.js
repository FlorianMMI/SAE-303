import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/selectclient/templateoption.html");

const template = await templateFile.text();

let clientView = {
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

console.log(clientView);

export { clientView };