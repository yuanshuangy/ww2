<template>
  <div class="weather-analysis">
    <div class="page-header">
      <h2>邢台天气分析</h2>
    </div>
    <div class="analysis-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>气温分布</span>
              </div>
            </template>
            <div class="temp-distribution-chart" ref="tempDistChart"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>空气质量指数</span>
              </div>
            </template>
            <div class="aqi-chart" ref="aqiChart"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>气象要素相关性分析</span>
              </div>
            </template>
            <div class="correlation-chart" ref="correlationChart"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>天气预警统计</span>
              </div>
            </template>
            <div class="alert-stats">
              <el-table :data="alertStats" style="width: 100%">
                <el-table-column prop="type" label="预警类型"></el-table-column>
                <el-table-column prop="count" label="发生次数"></el-table-column>
                <el-table-column prop="lastTime" label="最近发生时间"></el-table-column>
                <el-table-column prop="level" label="预警等级">
                  <template #default="scope">
                    <el-tag :type="getAlertLevelType(scope.row.level)">
                      {{ scope.row.level }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
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
  name: 'WeatherAnalysis',
  data() {
    return {
      tempDistChart: null,
      aqiChart: null,
      correlationChart: null,
      alertStats: [
        {
          type: '暴雨',
          count: 3,
          lastTime: '2024-01-15',
          level: '黄色'
        },
        {
          type: '大风',
          count: 5,
          lastTime: '2024-01-20',
          level: '蓝色'
        },
        {
          type: '高温',
          count: 2,
          lastTime: '2023-12-28',
          level: '橙色'
        }
      ]
    }
  },
  mounted() {
    this.initCharts()
    this.fetchAnalysisData()
  },
  methods: {
    initCharts() {
      this.tempDistChart = echarts.init(this.$refs.tempDistChart)
      this.aqiChart = echarts.init(this.$refs.aqiChart)
      this.correlationChart = echarts.init(this.$refs.correlationChart)
      
      // 气温分布图（箱线图）
      this.tempDistChart.setOption({
        title: {
          text: '月度气温分布'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: 'value',
          name: '温度(°C)'
        },
        series: [{
          name: '气温分布',
          type: 'boxplot',
          data: [
            [1, 6, 9, 16, 20],
            [0, 4, 7, 14, 18],
            [5, 10, 15, 20, 25],
            [10, 15, 20, 25, 30],
            [15, 20, 25, 30, 35],
            [20, 25, 30, 35, 40]
          ]
        }]
      })

      // AQI指数图
      this.aqiChart.setOption({
        series: [{
          type: 'gauge',
          detail: {
            formatter: '{value}'
          },
          data: [{
            value: 75,
            name: 'AQI'
          }],
          axisLabel: {
            formatter: function(value) {
              if (value <= 50) return '优'
              if (value <= 100) return '良'
              if (value <= 150) return '轻度污染'
              if (value <= 200) return '中度污染'
              return '重度污染'
            }
          },
          axisLine: {
            lineStyle: {
              color: [
                [0.2, '#91c7ae'],
                [0.4, '#63869e'],
                [0.6, '#c23531'],
                [0.8, '#d48265'],
                [1, '#8b0000']
              ]
            }
          }
        }]
      })

      // 相关性分析图（热力图）
      this.correlationChart.setOption({
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['温度', '湿度', '风速', '气压', 'AQI'],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['温度', '湿度', '风速', '气压', 'AQI'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: -1,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: '相关性系数',
          type: 'heatmap',
          data: [
            [0, 0, 1], [0, 1, -0.5], [0, 2, 0.3], [0, 3, -0.2], [0, 4, 0.4],
            [1, 0, -0.5], [1, 1, 1], [1, 2, -0.3], [1, 3, 0.5], [1, 4, -0.2],
            [2, 0, 0.3], [2, 1, -0.3], [2, 2, 1], [2, 3, -0.4], [2, 4, 0.1],
            [3, 0, -0.2], [3, 1, 0.5], [3, 2, -0.4], [3, 3, 1], [3, 4, -0.3],
            [4, 0, 0.4], [4, 1, -0.2], [4, 2, 0.1], [4, 3, -0.3], [4, 4, 1]
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    fetchAnalysisData() {
      // 这里添加获取实际分析数据的逻辑
    },
    getAlertLevelType(level) {
      const levelMap = {
        '红色': 'danger',
        '橙色': 'warning',
        '黄色': '',
        '蓝色': 'info'
      }
      return levelMap[level] || 'info'
    }
  }
}
</script>

<style scoped>
.weather-analysis {
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

.temp-distribution-chart,
.aqi-chart {
  height: 400px;
}

.correlation-chart {
  height: 500px;
}

.alert-stats {
  margin-top: 20px;
}
</style> 