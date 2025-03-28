<template>
  <div class="echarts">
    <ECharts v-if="pieData.length > 0" :option="chartOption" />
  </div>
</template>

<script setup lang="ts" name="pie">
import { Asset } from "@/api/interface";
import { getSensitiveInfoCount } from "@/api/modules/assets";
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import { onMounted, ref, watch } from "vue";

const chartOption = ref<ECOption>({});
const pieData = ref<Asset.ResSensitiveCount[]>([]);

watch(
  () => pieData.value,
  () => {
    chartOption.value = getOption();
  }
);

// let pieData = [
//   { value: 500, name: "敏感路径泄露量" },
//   { value: 200, name: "配置文件泄露量" },
//   { value: 300, name: "api未授权访问漏洞量" },
//   { value: 600, name: "其余漏洞数量" }
// ];

const getOption = () => {
  const option: ECOption = {
    title: {
      text: "攻击面",
      subtext: "风险占比",
      left: "56%",
      top: "45%",
      textAlign: "center",
      textStyle: {
        fontSize: 18,
        color: "#767676"
      },
      subtextStyle: {
        fontSize: 15,
        color: "#a1a1a1"
      }
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: "4%",
      left: "2%",
      orient: "vertical",
      icon: "circle", //图例形状
      align: "left",
      itemGap: 20,
      textStyle: {
        fontSize: 13,
        color: "#a1a1a1",
        fontWeight: 500
      },
      formatter: function (name: string) {
        let dataCopy = "";
        const pie = pieData.value;
        for (let i = 0; i < pie.length; i++) {
          if (pie[i].name == name && pie[i].value >= 10000) {
            dataCopy = (pie[i].value / 10000).toFixed(2);
            return name + "      " + dataCopy + "w";
          } else if (pie[i].name == name) {
            dataCopy = pie[i].value + "";
            return name + "      " + dataCopy;
          }
        }
        return "";
      }
    },
    series: [
      {
        type: "pie",
        radius: ["70%", "40%"],
        center: ["57%", "52%"],
        silent: true,
        clockwise: true,
        startAngle: 150,
        data: pieData.value as any,
        labelLine: {
          length: 80,
          length2: 30,
          lineStyle: {
            width: 1
          }
        },
        label: {
          position: "outside",
          show: true,
          formatter: "{d}%",
          fontWeight: 400,
          fontSize: 19,
          color: "#a1a1a1"
        },
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0.5,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#feb791" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fe8b4c" // 100% 处的颜色
              }
            ]
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0.5,
            colorStops: [
              {
                offset: 0,
                color: "#b898fd" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#8347fd" // 100% 处的颜色
              }
            ]
          }
        ]
      }
    ]
  };
  return option;
};

onMounted(() => {
  GetSensitiveInfoCount();
});

const GetSensitiveInfoCount = async () => {
  const res = await getSensitiveInfoCount();
  if (res.code == "200") {
    pieData.value = res.data;
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
