<template>
  <div>
    <div class="card mb10">
      <h4 class="title">简介</h4>
      <span class="text">
        <el-link type="primary" href="https://github.com/wjz-sec/Sentry-Hawk" target="_blank" style="vertical-align: top">寻迹</el-link>
        本平台的核心思路是从攻击者视角出发，对企业的网络资产进行全面、深入的审视与管理。通过自动化手段，实现对网络空间的快速测绘，精准识别资产，将资产、漏洞、任务等进行统一管理，以便企业安全团队能够清晰、直观地了解网络安全状态，并迅速做出响应。旨在改变传统安全防护的被动局面，主动出击，提前发现并解决可能被攻击者利用的安全问题，最大程度降低企业网络安全风险。
      </span>
    </div>
    <div class="card mb10">
      <h4 class="title">项目信息</h4>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本号" label-align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布时间" label-align="left">
          <el-tag>2025-03-31</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="left">
          <el-link type="primary" href="https://github.com/wjz-sec/Sentry-Hawk" target="_blank"> Github </el-link>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card mb10">
      <h4 class="title">生产环境依赖</h4>
      <el-descriptions :column="3" border>
        <el-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card">
      <h4 class="title">开发环境依赖</h4>
      <el-descriptions :column="3" border>
        <el-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="key">
          <el-tag type="info">
            {{ value }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts" name="about">
const { pkg } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>

<style lang="scss" scoped>
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);
    .el-link {
      font-size: 15px;
    }
  }
}
</style>
