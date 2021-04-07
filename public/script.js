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

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Macros for Ten Meals'
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
        dataPoints: caloriesData
      },
      {
        type: 'stackedBar',
        name: 'Serving Size',
        showInLegend: 'true',
        dataPoints: servingData
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        dataPoints: cholData
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        dataPoints: sodiumData
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: 'true',
        dataPoints: carbsData
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: 'true',
        dataPoints: proteinData
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: 'true',
        dataPoints: fatData
      }
    ]
  });
  macrosData.forEach((meal) => {
    caloriesData.push({label: meal.meal_name, y: meal.calories});
    servingData.push({label: meal.meal_name, y: meal.serving_size});
    cholData.push({label: meal.meal_name, y: meal.cholesterol});
    sodiumData.push({label: meal.meal_name, y: meal.sodium});
    carbsData.push({label: meal.meal_name, y: meal.carbs});
    proteinData.push({label: meal.meal_name, y: meal.protein});
    fatData.push({label: meal.meal_name, y: meal.fat});
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
