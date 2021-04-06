async function windowActions() {
  const diningRequest = await fetch('/api/dining');
  const hallData = await diningRequest.json();
  const tableBody = document.querySelector('tbody');

  hallData.data.forEach((hall) => {
    const tableLine = document.createElement('tr');
    tableLine.innerHTML = `
    <th>${hall.hall_id}</th>
    <td>${hall.hall_name}</td>
    <td>${hall.hall_address}</td>`;
    tableBody.append(tableLine);
  });

  const macrosRequest = await fetch('api/macros');
  const mealsRequest = await fetch('api/meals');
  const macrosData = await macrosRequest.json();
  const mealsData = await mealsRequest.json();

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Macros for Ten Meals'
    },
    axisX: {
      valueFormatString: 'DDD'
    },
    axisY: {
      prefix: ''
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      // eslint-disable-next-line no-use-before-define
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: 'true',
        xValueFormatString: '',
        yValueFormatString: '$#,##0',
        dataPoints: [
          { x: new Date(2017, 0, 30), y: 56 },
          { x: new Date(2017, 0, 31), y: 45 },
          { x: new Date(2017, 1, 1), y: 71 },
          { x: new Date(2017, 1, 2), y: 41 },
          { x: new Date(2017, 1, 3), y: 60 },
          { x: new Date(2017, 1, 4), y: 75 },
          { x: new Date(2017, 1, 5), y: 98 }
        ]
      },
      {
        type: 'stackedBar',
        name: 'Snacks',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [
          { x: new Date(2017, 0, 30), y: 86 },
          { x: new Date(2017, 0, 31), y: 95 },
          { x: new Date(2017, 1, 1), y: 71 },
          { x: new Date(2017, 1, 2), y: 58 },
          { x: new Date(2017, 1, 3), y: 60 },
          { x: new Date(2017, 1, 4), y: 65 },
          { x: new Date(2017, 1, 5), y: 89 }
        ]
      },
      {
        type: 'stackedBar',
        name: 'Drinks',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [
          { x: new Date(2017, 0, 30), y: 48 },
          { x: new Date(2017, 0, 31), y: 45 },
          { x: new Date(2017, 1, 1), y: 41 },
          { x: new Date(2017, 1, 2), y: 55 },
          { x: new Date(2017, 1, 3), y: 80 },
          { x: new Date(2017, 1, 4), y: 85 },
          { x: new Date(2017, 1, 5), y: 83 }
        ]
      },
      {
        type: 'stackedBar',
        name: 'Dessert',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [
          { x: new Date(2017, 0, 30), y: 61 },
          { x: new Date(2017, 0, 31), y: 55 },
          { x: new Date(2017, 1, 1), y: 61 },
          { x: new Date(2017, 1, 2), y: 75 },
          { x: new Date(2017, 1, 3), y: 80 },
          { x: new Date(2017, 1, 4), y: 85 },
          { x: new Date(2017, 1, 5), y: 105 }
        ]
      },
      {
        type: 'stackedBar',
        name: 'Takeaway',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [
          { x: new Date(2017, 0, 30), y: 52 },
          { x: new Date(2017, 0, 31), y: 55 },
          { x: new Date(2017, 1, 1), y: 20 },
          { x: new Date(2017, 1, 2), y: 35 },
          { x: new Date(2017, 1, 3), y: 30 },
          { x: new Date(2017, 1, 4), y: 45 },
          { x: new Date(2017, 1, 5), y: 25 }
        ]
      }
    ]
  });
  chart.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

window.onload = windowActions();
