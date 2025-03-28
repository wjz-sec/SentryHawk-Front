<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-title">数据可视化</div>
      <div class="top-content">
        <el-row :gutter="40">
          <!-- <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">风险总数</span>
              <div class="img-box">
                <img src="./images/vuln.png" alt="" />
              </div>
              <span class="left-number">422</span>
            </div>
          </el-col> -->
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/互联网资产.png" alt="" />
                </div>
                <span class="item-value">{{ assetCounts.total_assets }}</span>
                <span class="traffic-name sle">互联网资产数量</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/url.png" alt="" />
                </div>
                <span class="item-value">{{ assetCounts.url_assets }}</span>
                <span class="traffic-name sle">URL资产数量</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/ip.png" alt="" />
                </div>
                <span class="item-value">{{ assetCounts.ip_assets }}</span>
                <span class="traffic-name sle">IP资产数量</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/domain.png" alt="" />
                </div>
                <span class="item-value">{{ assetCounts.domain_assets }}</span>
                <span class="traffic-name sle">域名资产数量</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <div class="item-right">
              <div class="echarts-title">攻击面风险占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { onMounted, ref } from "vue";
import Pie from "./components/pie.vue";
import { getAssetCount } from "@/api/modules/assets";
import { ElMessage } from "element-plus";
const assetCounts = ref({
  total_assets: 0,
  url_assets: 0,
  ip_assets: 0,
  domain_assets: 0
});
onMounted(() => {
  getAssetsList();
});
const getAssetsList = async () => {
  const res = await getAssetCount();
  if (res.code != "200") {
    return ElMessage.error(res.msg);
  }
  assetCounts.value = res.data;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
