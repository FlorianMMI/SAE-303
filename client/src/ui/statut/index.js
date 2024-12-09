const templateFile = await fetch("src/ui/statut/template.html.inc");
const template = await templateFile.text();


let StatutView = {

    
    render: function (data, type) {
        
        console.log(data);
        let template_new = template;
        template_new =  template_new.replace("{{delivered}}", data);
        template_new =  template_new.replace("{{type}}", type);
        return template_new;
    }

}

export { StatutView };