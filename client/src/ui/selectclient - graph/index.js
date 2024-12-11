import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import { dataclientid } from "../../../data/client";


let graphclient = function(div, id) {
    am5.ready(async function() {

        let clientdata = await dataclientid.getorder(id);
        clientdata.forEach(order => {
            order.total_quantity = parseInt(order.total_quantity);
        });
        console.log("Les commandes du client :",  clientdata);


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(div);
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0
          })
        );
        
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, { 
          minGridDistance: 30, 
          minorGridEnabled:true
        });
        
        xRenderer.labels.template.setAll({ text: "" });
        
        var xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {
              labelText: " "
            })
          })
        );
        
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {})
          })
        );
        
        var yAxis2 = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            syncWithAxis: yAxis,
            renderer: am5xy.AxisRendererY.new(root, { opposite: true })
          })
        );
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis2,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "category",
            tooltip: am5.Tooltip.new(root, {
              labelText: "{provider} {realName}: {valueY}"
            })
          })
        );
        
        series.columns.template.setAll({
          fillOpacity: 0.9,
          strokeOpacity: 0
        });
        series.columns.template.adapters.add("fill", (fill, target) => {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        
        series.columns.template.adapters.add("stroke", (stroke, target) => {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        
        
        
        var chartData = [];
        
        // Set data
        var data = {};
        for (let i = 0; i < clientdata.length; i++) {
            var order = clientdata[i];
            var providerName = order.category;
            var itemName = order.product_name;
            var quantity = order.total_quantity;
        
            if (!data[providerName]) {
              data[providerName] = { quantity: 0 };
            }
        
            if (!data[providerName][itemName]) {
              data[providerName][itemName] = 0;
            }
        
            data[providerName][itemName] += quantity;
            data[providerName].quantity += quantity;  
         }
        
        // process data ant prepare it for the chart
        for (var providerName in data) {
          var providerData = data[providerName];
        
          // add data of one provider to temp array
          var tempArray = [];
          var count = 0;
          // add items
          for (var itemName in providerData) {
            if (itemName != "quantity") {
              count++;
              // we generate unique category for each column (providerName + "_" + itemName) and store realName
              tempArray.push({
                category: providerName + "_" + itemName,
                realName: itemName,
                value: providerData[itemName],
                provider: providerName
              });
            }
          }
          // sort temp array
          tempArray.sort(function (a, b) {
            if (a.value > b.value) {
              return 1;
            } else if (a.value < b.value) {
              return -1;
            } else {
              return 0;
            }
          });
        
          // push to the final data
          am5.array.each(tempArray, function (item) {
            chartData.push(item);
          });
        
          // create range (the additional label at the bottom)
        
          var range = xAxis.makeDataItem({});
          xAxis.createAxisRange(range);
        
          range.set("category", tempArray[0].category);
          range.set("endCategory", tempArray[tempArray.length - 1].category);
        
          var label = range.get("label");
        
          label.setAll({
            text: tempArray[0].provider,
            dy: 30,
            fontWeight: "bold",
            tooltipText: tempArray[0].provider
          });
        
          var tick = range.get("tick");
          tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 0 });
        
          var grid = range.get("grid");
          grid.setAll({ strokeOpacity: 1 });
        }
        
        // add range for the last grid
        var range = xAxis.makeDataItem({});
        xAxis.createAxisRange(range);
        range.set("category", chartData[chartData.length - 1].category);
        var tick = range.get("tick");
        tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });
        
        var grid = range.get("grid");
        grid.setAll({ strokeOpacity: 1, location: 1 });
        
        xAxis.data.setAll(chartData);
        series.data.setAll(chartData);
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
        
        }); // end am5.ready()
}




export { graphclient};