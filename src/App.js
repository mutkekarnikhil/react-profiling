import React, { useState } from 'react';
import './App.css';
import mapLogo from './map.jpg';
import CardContainer from './CardContainer'
import { ColumnChart } from './BarChart'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      numberOfCards: 5,
      dataSet: [],
      memoPhase: 'mount',
      nonMemoPhase: 'mount'
    }
  }

  metricChangeCallback = (updatedMemoData, updatedNonMemoData) => {
    const dataSet = [{
      type: "stackedColumn",
      name: "Actual Duration",
      showInLegend: true,
      yValueFormatString: "#.###ms",
      dataPoints: [
        { label: "Memoized", y: updatedMemoData.actualDuration },
        { label: "Non-Memoized", y: updatedNonMemoData.actualDuration },
      ]
    }, {
      type: "stackedColumn",
      name: "Base Duration",
      showInLegend: true,
      yValueFormatString: "#.###ms",
      dataPoints: [
        { label: "Memoized", y: updatedMemoData.baseDuration },
        { label: "Non-Memoized", y: updatedNonMemoData.baseDuration },
      ]
    }]
    this.setState({
      dataSet: JSON.parse(JSON.stringify(dataSet)),
      memoPhase: updatedMemoData.phase,
      nonMemoPhase: updatedNonMemoData.phase
    })
  }
  changeDisplayCardCount = (e) => {
    this.setState({ numberOfCards: e.target.value })
  }
  getCardData = (numberOfCards) => {
    const returnArray = []
    for (let i = 0; i < numberOfCards; i++) {
      returnArray.push({
        img: mapLogo,
        title: `Card Title`,
        description: `some description`
      })
    }
    return returnArray
  }

  render() {
    let cardData = this.getCardData(this.state.numberOfCards);
    return (
      <div className="App">
        <header className="App-header">
          React Profiler Demo
      </header>
        <label>Number of Cards to display:</label><input type="number" min="0" max="100" onChange={this.changeDisplayCardCount} value={this.state.numberOfCards} />
        <CardContainer cardData={cardData} callback={this.metricChangeCallback} />
        {!!this.state.dataSet.length && (
          <div className="chart-container">
            <span>Memo Phase: {this.state.memoPhase}</span>
            <span>Non Memo Phase: {this.state.nonMemoPhase}</span>
            <ColumnChart dataSet={this.state.dataSet} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
