const caloriesData = [];
const servingData = [];
const cholData = [];
const sodiumData = [];
const carbsData = [];
const proteinData = [];
const fatData = [];

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

  const macrosRequest = await fetch('api/mealmacros');
  const macrosData = await macrosRequest.json();

  macrosData.forEach((meal) => {
    caloriesData.push({y: meal.calories, label: meal.meal_name});
    servingData.push({y: meal.serving_size, label: meal.meal_name});
    cholData.push({y: meal.cholesterol, label: meal.meal_name });
    sodiumData.push({y: meal.sodium, label: meal.meal_name });
    carbsData.push({y: meal.carbs, label: meal.meal_name});
    proteinData.push({y: meal.protein, label: meal.meal_name});
    fatData.push({y: meal.fat, label: meal.meal_name});
  });

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Macros for Ten Meals'
    },
    axisY: {
      interval: 10
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
        dataPoints: [caloriesData]
      },
      {
        type: 'stackedBar',
        name: 'Snacks',
        showInLegend: 'true',
        dataPoints: [servingData]
      },
      {
        type: 'stackedBar',
        name: 'Drinks',
        showInLegend: 'true',
        dataPoints: [cholData]
      },
      {
        type: 'stackedBar',
        name: 'Dessert',
        showInLegend: 'true',
        dataPoints: [sodiumData]
      },
      {
        type: 'stackedBar',
        name: 'Takeaway',
        showInLegend: 'true',
        dataPoints: [carbsData]
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
