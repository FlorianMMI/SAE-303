import * as am5 from "@amcharts/amcharts5";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";


import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";


import {saleDatacountry} from '../../../data/sale.js';





let heatview =  function(div) {
  am5.ready(async function() {

    let saleData = await saleDatacountry.getSalecountry2()
    console.log ("Ceci sont les SaleDataCountry2", saleData)
    // max = 0;
    // saleData.forEach(item => {
    //   if (item.total_items_shipped > max) {
    //     max = item.total_items_shipped;
    //   }
    // });
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
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0,
      layout: root.verticalLayout
    }));
    
    
    // Create axes and their renderers
    var yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true
    });
    
    yRenderer.grid.template.set("visible", false);
    
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      renderer: yRenderer,
      categoryField: "weekday"
    }));
    
    var xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      opposite:true,
      minorGridEnabled: true
    });
    
    xRenderer.grid.template.set("visible", false);
    
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      renderer: xRenderer,
      categoryField: "hour"
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      calculateAggregates: true,
      stroke: am5.color(0xffffff),
      clustered: false,
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: "hour",
      categoryYField: "weekday",
      valueField: "value"
    }));
    
    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      width: am5.percent(100),
      height: am5.percent(100)
    });
    
    series.columns.template.events.on("pointerover", function(event) {
      var di = event.target.dataItem;
      if (di) {
        heatLegend.showValue(di.get("value", 0));
      }
    });
    
    series.events.on("datavalidated", function() {
      heatLegend.set("startValue", series.getPrivate("valueHigh"));
      heatLegend.set("endValue", series.getPrivate("valueLow"));
    });
    
    
    // Set up heat rules
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set("heatRules", [{
      target: series.columns.template,
      min: am5.color(0xfffb77),
      max: am5.color(0xfe131a),
      dataField: "value",
      key: "fill"
    }]);
    
    
    // Add heat legend
    // https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
    var heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
      orientation: "horizontal",
      endColor: am5.color(0xfffb77),
      startColor: am5.color(0xfe131a)
    }));
    
    
    // Set data
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
    var data = saleData.map(item => ({
      hour: item.month,
      weekday: item.country,
      value: parseInt(item.total_items_shipped)
    }));
    
    series.data.setAll(data);
    
    // Auto-populate X and Y axis category data
    var weekdays = [];
    var hours = [];
    am5.array.each(data, function(row) {
      if (weekdays.indexOf(row.weekday) == -1) {
        weekdays.push(row.weekday);
      }
      if (hours.indexOf(row.hour) == -1) {
        hours.push(row.hour);
      }
    });
    
    
    yAxis.data.setAll(weekdays.map(function(item) {
      return { weekday: item }
    }));
    
    
    xAxis.data.setAll(hours.map(function(item) {
      return { hour: item }
    }));
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    chart.appear(1000, 100);
    
    }); // end am5.ready()
};



export { heatview };