import * as am5 from "@amcharts/amcharts5";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";


import {saleDatacountry} from '../../../data/sale.js';





let mapview =  function(div, month) {
    am5.ready(async function() {


      

        let saleData = await saleDatacountry.getSalecountry(month)
        console.log("Ceci sont les SaleDataCountry", saleData)
        
          
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(div);
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create the map chart
        // https://www.amcharts.com/docs/v5/charts/map-chart/
        var chart = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "rotateX",
            panY: "rotateY",
            projection: am5map.geoMercator()
          })
        );
        
        // Create series for background fill
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
        var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
          fill: root.interfaceColors.get("alternativeBackground"),
          fillOpacity: 0,
          strokeOpacity: 0
        });
        // Add background polygo
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
        backgroundSeries.data.push({
          geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });
        
        // Create main polygon series for countries
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        var polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
          })
        );
        
        polygonSeries.mapPolygons.template.setAll({
          fill: root.interfaceColors.get("alternativeBackground"),
          fillOpacity: 0.15,
          strokeWidth: 0.5,
          stroke: root.interfaceColors.get("background")
        });
        
        // Create polygon series for circles
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        var circleTemplate = am5.Template.new({
          tooltipText: "{name}: {value}"
        });
        
        var bubbleSeries = chart.series.push(
          am5map.MapPointSeries.new(root, {
            calculateAggregates: true,
            valueField: "value",
            polygonIdField: "id"
          })
        );


        
        
        bubbleSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              radius: 10,
              templateField: "circleTemplate"
            }, circleTemplate)
          });
        });
        
        bubbleSeries.set("heatRules", [{
          target: circleTemplate,
          min: 3,
          max: 30,
          key: "radius",
          dataField: "value"
        }]);
        
        var colors = am5.ColorSet.new(root, {});
        
        let id_country = {
          France : "FR",
          Germany : "DE",
          Italy : "IT",
          Spain : "ES",
          "United Kingdom" : "GB",
          Sweden : "SE",
          Norway : "NO",
          Denmark : "DK",
          Portugal : "PT",
          Greece : "GR",
          "United States": "US",
          Canada: "CA",
          Mexico: "MX",
          Brazil: "BR",
          Argentina: "AR",
          Chile: "CL",
          Peru: "PE",
          Colombia: "CO",
          Venezuela: "VE",
          Russia: "RU",
          China: "CN",
          India: "IN",
          Japan: "JP",
          "South Korea": "KR",
          Australia: "AU",
          "New Zealand": "NZ",
          "South Africa": "ZA",
          Egypt: "EG",
          Nigeria: "NG",
          Kenya: "KE",
          "Saudi Arabia": "SA",
          Turkey: "TR",
          Iran: "IR",
          Indonesia: "ID",
          Thailand: "TH",
          Malaysia: "MY",
          Singapore: "SG",
          Philippines: "PH",
          Vietnam: "VN",
          Pakistan: "PK",
          Bangladesh: "BD",
          "Sri Lanka": "LK",
          Nepal: "NP",
          Myanmar: "MM",
          Israel: "IL",
          Jordan: "JO",
          Lebanon: "LB",
          Iraq: "IQ",
          Syria: "SY",
          Afghanistan: "AF",
          Uzbekistan: "UZ",
          Kazakhstan: "KZ",
          Ukraine: "UA",
          Poland: "PL",
          Netherlands: "NL",
          Belgium: "BE",
          Switzerland: "CH",
          Austria: "AT",
          Hungary: "HU",
          "Czech Republic": "CZ",
          Slovakia: "SK",
          Romania: "RO",
          Bulgaria: "BG",
          Croatia: "HR",
          Serbia: "RS",
          Slovenia: "SI",
          "Bosnia and Herzegovina": "BA",
          Montenegro: "ME",
          Albania: "AL",
          "North Macedonia": "MK",
          Belarus: "BY",
          Lithuania: "LT",
          Latvia: "LV",
          Estonia: "EE",
          Finland: "FI",
          Iceland: "IS",
          Ireland: "IE",
          Luxembourg: "LU",
          Malta: "MT",
          Cyprus: "CY",
          Armenia: "AM",
          Azerbaijan: "AZ",
          Georgia: "GE",
          Mongolia: "MN",
          Cambodia: "KH",
          Laos: "LA",
          Bhutan: "BT",
          Maldives: "MV",
          Fiji: "FJ",
          "Papua New Guinea": "PG",
          "Solomon Islands": "SB",
          Vanuatu: "VU",
          Samoa: "WS",
          Tonga: "TO",
          Tuvalu: "TV",
          Kiribati: "KI",
          Micronesia: "FM",
          Palau: "PW",
          "Marshall Islands": "MH",
          Nauru: "NR",
          Brunei: "BN",
          "Timor-Leste": "TL",
          Qatar: "QA",
          Bahrain: "BH",
          Kuwait: "KW",
          Oman: "OM",
          Yemen: "YE",
          Jordan: "JO",
          Lebanon: "LB",
          Syria: "SY",
          Israel: "IL",
          Palestine: "PS",
          Cyprus: "CY",
          Armenia: "AM",
          Azerbaijan: "AZ",
          Georgia: "GE",
          Kazakhstan: "KZ",
          Uzbekistan: "UZ",
          Turkmenistan: "TM",
          Kyrgyzstan: "KG",
          Tajikistan: "TJ",
          Mongolia: "MN",
          "North Korea": "KP",
          "South Korea": "KR",
          Taiwan: "TW",
          "Hong Kong": "HK",
          Macau: "MO",
          Bhutan: "BT",
          Nepal: "NP",
          Bangladesh: "BD",
          "Sri Lanka": "LK",
          Maldives: "MV",
          Brunei: "BN",
          "Timor-Leste": "TL",
          "Papua New Guinea": "PG",
          "Solomon Islands": "SB",
          Vanuatu: "VU",
          Fiji: "FJ",
          Tonga: "TO",
          Samoa: "WS",
          Kiribati: "KI",
          Micronesia: "FM",
          Palau: "PW",
          "Marshall Islands": "MH",
          Nauru: "NR",
          Tuvalu: "TV"
        };



        let bubbleData = [];
        for (let country of saleData) {
          
          bubbleData.push({
            id: id_country[country.country],
            name: country.country,
            value: country.total_items_shipped,
            circleTemplate: { fill: colors.next() }
          });
        }

        bubbleSeries.data.setAll(bubbleData);
        
        // Add globe/map switch
        var cont = chart.children.push(am5.Container.new(root, {
          layout: root.horizontalLayout,
          x: 20,
          y: 40
        }));
        
        cont.children.push(am5.Label.new(root, {
          centerY: am5.p50,
          text: "Map"
        }));
        
        var switchButton = cont.children.push(
          am5.Button.new(root, {
            themeTags: ["switch"],
            centerY: am5.p50,
            icon: am5.Circle.new(root, {
              themeTags: ["icon"]
            })
          })
        );
        
        switchButton.on("active", function () {
          if (!switchButton.get("active")) {
            chart.set("projection", am5map.geoMercator());
            backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
          } else {
            chart.set("projection", am5map.geoOrthographic());
            backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
          }
        });
        
        cont.children.push(
          am5.Label.new(root, {
            centerY: am5.p50,
            text: "Globe"
          })
        );
        
        // Make stuff animate on load
        chart.appear(1000, 100);
        
        }); // end am5.ready()
};

console.log(mapview);

export { mapview };