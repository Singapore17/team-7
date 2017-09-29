var monthly = true;
function changeChart(){
  if (monthly) {
    monthly = false;
    $('#toggleChart').text('View Monthly');
    $('#chart').attr('src','./img/closedChartDaily.jpg');
  } else {
      monthly = true;
      $('#toggleChart').text('View Daily');
      $('#chart').attr('src','./img/closedCaseMonthly.jpg');
  }
}
