import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { order6salebycat } from "../../../data/6monthsalebycat.js";

am5.ready(async function() {

  

    let saledata = await order6salebycat.getSale6mbycat();
    console.log(saledata);
    saledata = saledata.map(item => {
        let [year, month] = item.month.split('-');
        return { ...item, year: parseInt(year), month: parseInt(month), total_sales: parseInt(item.total_sales) };
    });
    console.log(saledata);

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("graphdivbycat");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true,
      paddingLeft: 0
    }));
    
    chart.get("colors").set("step", 3);
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.3,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 70
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    series.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3]
    });
    
    
    var series2 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 2",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
      })
    }));
    series2.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3]
    });

    var series3 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 3",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
      })
    }));
    series3.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3]
    });

    var series4 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 4",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
      })
    }));
    series4.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3]
    });

    var series5 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 5",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
      })
    }));

    series5.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3],
      
    })
    
    
    ;

  

    


    
  
    
 
  
    let data = [];
    for (let i = 10; i < saledata.length; i += 5) {
      data.push({
        date: new Date(saledata[i].year, saledata[i].month).getTime(),
        value: saledata[i].total_sales
      });
    }

    let data2 = [];
    for (let i = 11; i < saledata.length; i += 5) {
      data2.push({
        date: new Date(saledata[i].year, saledata[i].month).getTime(),
        value: saledata[i].total_sales
      });
    }
    
    let data3 = [];
    for (let i = 12; i < saledata.length; i += 5) {
      data3.push({
        date: new Date(saledata[i].year, saledata[i].month).getTime(),
        value: saledata[i].total_sales
      });
    }

    let data4 = [];
    for (let i = 13; i < saledata.length; i += 5) {
      data4.push({
        date: new Date(saledata[i].year, saledata[i].month).getTime(),
        value: saledata[i].total_sales
      });
    }

    let data5 = [];
    for (let i = 14; i < saledata.length; i += 5) {
      data5.push({
        date: new Date(saledata[i].year, saledata[i].month).getTime(),
        value: saledata[i].total_sales
      });
    }


    
    series.data.setAll(data);
    series2.data.setAll(data2);
    series3.data.setAll(data3);
    series4.data.setAll(data4);
    series5.data.setAll(data5);
    


    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()



export { am5 as graphbycat}; // export the am5 object as GraphSale 