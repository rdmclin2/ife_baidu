/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
   var charWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
   var appendString = "";
   var size = Object.keys(chartData).length;
   var spanWidth = Math.floor(charWrap.offsetWidth / size);
   for (var key in chartData) {
      var rgb = "rgb("+Math.floor(Math.random()*256) +"," 
                      +Math.floor(Math.random()*256) +"," 
                      +Math.floor(Math.random()*256) +")";
      appendString += "<div style='width:"+spanWidth+"px;height:"+chartData[key]+"px;background-color:"+rgb+";margin-top:"+(500-chartData[key])+"px;' title='"+key+" "+chartData[key]+"'></div>";
   }
   charWrap.innerHTML = appendString;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
  var value = e.target.value;
  if(value === pageState.nowGraTime){
    return ;
  }else{
    pageState.nowGraTime = value;
  }

  // 设置对应数据
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  var value = e.target.value;
  if(value === pageState.nowSelectCity){
    return ;
  }else{
    pageState.nowSelectCity = value;
  }
  // 设置对应数据
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputs = document.getElementById("form-gra-time").getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var appendString = "";
  for(var prop in aqiSourceData){
    appendString += "<option>" + prop +"</option>";
  }
  citySelect.innerHTML = appendString;
  pageState.nowSelectCity = citySelect.value;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
   var cityData = aqiSourceData[pageState.nowSelectCity];
   var nowGraTime = pageState.nowGraTime;
   console.log(JSON.stringify(cityData));
   chartData = {};

   switch(nowGraTime){
    case "day":
      chartData = cityData;
      break;
    case "week":
      var sum = 0;
      var cnt = 0;
      for (var day in cityData){
          cnt++;
          sum += cityData[day];
          if(cnt %7 == 0){
              chartData["第"+(cnt/7)+"周"]=Math.floor(sum/ 7);
              sum = 0;
          }
      }
      if(cnt % 7 !==0){
        chartData["第"+(cnt/7+1)+"周"]=Math.floor(sum/ (cnt%7));
      }
      break;
    case "month":
        var sum = 0;
        var cnt = 0;
        for (var day in cityData){
            var month = day.split("-")[1];
            chartData["2016-"+month]= chartData["2016-"+month]||0 + cityData[day];
        }
        break;
   }
   renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}


window.onload = init;
