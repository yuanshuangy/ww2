<template>
  <div class="weather-overview">
    <div class="page-header">
      <h2>邢台天气概览</h2>
    </div>
    <div class="data-cards">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>实时温度</span>
              </div>
            </template>
            <div class="temperature-chart" ref="tempChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>空气湿度</span>
              </div>
            </template>
            <div class="humidity-chart" ref="humidityChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>天气状况</span>
              </div>
            </template>
            <div class="weather-status">
              <div class="weather-icon">
                <i :class="weatherIcon"></i>
              </div>
              <div class="weather-desc">{{ weatherDescription }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'WeatherOverview',
  data() {
    return {
      tempChart: null,
      humidityChart: null,
      weatherIcon: 'el-icon-sunny',
      weatherDescription: '晴朗'
    }
  },
  mounted() {
    this.initCharts()
    this.fetchWeatherData()
  },
  methods: {
    initCharts() {
      this.tempChart = echarts.init(this.$refs.tempChart)
      this.humidityChart = echarts.init(this.$refs.humidityChart)
      
      // 温度仪表盘配置
      this.tempChart.setOption({
        series: [{
          type: 'gauge',
          min: -20,
          max: 40,
          detail: {
            formatter: '{value}°C'
          },
          data: [{
            value: 26,
            name: '温度'
          }]
        }]
      })

      // 湿度仪表盘配置
      this.humidityChart.setOption({
        series: [{
          type: 'gauge',
          min: 0,
          max: 100,
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 45,
            name: '湿度'
          }]
        }]
      })
    },
    fetchWeatherData() {
      // 这里添加获取实际天气数据的逻辑
      // 模拟数据
      const mockData = {
        temperature: 26,
        humidity: 45,
        weather: '晴朗'
      }
      this.updateCharts(mockData)
    },
    updateCharts(data) {
      this.tempChart.setOption({
        series: [{
          data: [{
            value: data.temperature
          }]
        }]
      })
      this.humidityChart.setOption({
        series: [{
          data: [{
            value: data.humidity
          }]
        }]
      })
    }
  }
}
</script>

<style scoped>
.weather-overview {
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

.temperature-chart,
.humidity-chart {
  height: 300px;
}

.weather-status {
  text-align: center;
  padding: 20px;
}

.weather-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.weather-desc {
  font-size: 18px;
  color: #606266;
}
</style> 