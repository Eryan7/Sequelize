async function createTable() {
  const request = await fetch('/api/dining');
  const hallData = await request.json();
  const tableBody = document.querySelector('tbody');

  hallData.data.forEach((hall) => {
    const tableLine = document.createElement('tr');
    tableLine.innerHTML = `
    <th>${hall.hall_id}</th>
    <td>${hall.hall_name}</td>
    <td>${hall.hall_address}</td>`;
    tableBody.append(tableLine);
  });
}

window.onload = createTable();