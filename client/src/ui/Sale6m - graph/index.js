import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { order6sale } from "../../../data/6monthsale.js";

am5.ready(async function() {

    let saledata = await order6sale.getSale6m();
    console.log(saledata);
    saledata = saledata.map(item => {
        let [year, month] = item.month.split('-');
        return { ...item, year: parseInt(year), month: parseInt(month), total_sales: parseInt(item.total_sales) };
    });
    console.log(saledata);

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("graphdiv");
    
    
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
    
    // Create animating bullet by adding two circles in a bullet container and
    // animating radius and opacity of one of them.
    series.bullets.push(function(root, series, dataItem) {  
      if (dataItem.dataContext.bullet) {    
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000)
        }));
        var circle1 = container.children.push(am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000)
        }));
    
        circle1.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });
        circle1.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });
    
        return am5.Bullet.new(root, {
          sprite: container
        })
      }
    })
    
    // Set data
    var data = [{
      date: new Date(saledata[2].year, saledata[2].month).getTime(),
      value: saledata[2].total_sales
    },
    {
      date: new Date(saledata[3].year, saledata[3].month).getTime(),
      value: saledata[3].total_sales
    },
    {
      date: new Date(saledata[4].year, saledata[4].month).getTime(),
      value: saledata[4].total_sales
    },
    {
      date: new Date(saledata[4].year, saledata[4].month).getTime(),
      value: saledata[4].total_sales
    },
    {
      date: new Date(saledata[5].year, saledata[5].month).getTime(),
      value: saledata[5].total_sales
    },
    {
      date: new Date(saledata[6].year, saledata[6].month).getTime(),
      value: saledata[6].total_sales
    },
    {
      date: new Date(saledata[7].year, saledata[7].month).getTime(),
      value: saledata[7].total_sales,
      bullet: true
    }]
    
    series.data.setAll(data);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()



export { am5 as graph}; // export the am5 object as GraphSale 