/* App.js */
import React, { Component } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
class ColumnChart extends Component {
    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }
    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Performance Metrics",
                fontFamily: "verdana"
            },
            toolTip: {
                shared: true,
                reversed: true
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right",
                reversed: true,
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: this.props.dataSet
        }
        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export { ColumnChart };