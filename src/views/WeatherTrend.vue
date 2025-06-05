<template>
  <div class="weather-trend">
    <div class="page-header">
      <h2>邢台天气趋势</h2>
    </div>
    <div class="trend-charts">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>温度变化趋势</span>
                <el-radio-group v-model="tempTimeRange" size="small">
                  <el-radio-button label="day">24小时</el-radio-button>
                  <el-radio-button label="week">7天</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div class="temp-trend-chart" ref="tempTrendChart"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>降水量统计</span>
              </div>
            </template>
            <div class="rainfall-chart" ref="rainfallChart"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>湿度变化</span>
              </div>
            </template>
            <div class="humidity-trend-chart" ref="humidityTrendChart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'WeatherTrend',
  data() {
    return {
      tempTimeRange: 'day',
      tempTrendChart: null,
      rainfallChart: null,
      humidityTrendChart: null
    }
  },
  mounted() {
    this.initCharts()
    this.fetchTrendData()
  },
  methods: {
    initCharts() {
      this.tempTrendChart = echarts.init(this.$refs.tempTrendChart)
      this.rainfallChart = echarts.init(this.$refs.rainfallChart)
      this.humidityTrendChart = echarts.init(this.$refs.humidityTrendChart)
      
      // 温度趋势图配置
      this.tempTrendChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        yAxis: {
          type: 'value',
          name: '温度(°C)'
        },
        series: [{
          name: '温度',
          type: 'line',
          smooth: true,
          data: [15, 13, 12, 18, 25, 28, 26, 22]
        }]
      })

      // 降水量柱状图配置
      this.rainfallChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          name: '降水量(mm)'
        },
        series: [{
          name: '降水量',
          type: 'bar',
          data: [0, 5, 15, 3, 0, 0, 2]
        }]
      })

      // 湿度趋势图配置
      this.humidityTrendChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        },
        yAxis: {
          type: 'value',
          name: '湿度(%)'
        },
        series: [{
          name: '湿度',
          type: 'line',
          smooth: true,
          data: [65, 70, 75, 60, 45, 40, 50, 55]
        }]
      })
    },
    fetchTrendData() {
      // 这里添加获取实际趋势数据的逻辑
    }
  },
  watch: {
    tempTimeRange(newValue) {
      // 根据选择的时间范围更新图表数据
      this.fetchTrendData()
    }
  }
}
</script>

<style scoped>
.weather-trend {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  color: #303133;
  margin: 0;
  padding: 10px 0;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temp-trend-chart {
  height: 400px;
}

.rainfall-chart,
.humidity-trend-chart {
  height: 300px;
}
</style> 