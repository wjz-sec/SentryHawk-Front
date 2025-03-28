<template>
  <div class="card content-box">
    <el-descriptions title="资产详情" extra="" :column="2" :size="size" border style="margin-top: 10px; padding: 0">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">资产</div>
        </template>
        {{ asset_detail.asset }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">所属项目</div>
        </template>
        {{ asset_detail.asset_project }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">资产类型</div>
        </template>
        {{ asset_detail.asset_type }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">资产最新修改时间</div>
        </template>
        {{ asset_detail.asset_editor_time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Ehole指纹</div>
        </template>
        {{ asset_detail.ehole_fingerprints && asset_detail.ehole_fingerprints.join(",") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Tide指纹</div>
        </template>
        {{ asset_detail.tide_fingerprints && asset_detail.tide_fingerprints.join(",") }}
      </el-descriptions-item>
      <!-- <el-descriptions-item v-if="asset_detail.asset_type == 'IP'">
        <template #label>
          <div class="cell-item">端口</div>
        </template>
        <div style="display: flex; align-items: center; width: 50vw">
          <div style="flex: 1; overflow: hidden; text-overflow: ellipsis; display: inline">
            {{ asset_detail.ip_info_list && asset_detail.ip_info_list.join(",") }}
          </div>
          <el-button
            style="margin-left: 10px"
            v-if="asset_detail.ip_info_list && asset_detail.ip_info_list.length > 10"
            type="info"
            text
            @click="dialogVisiblePortMore = true"
          >
            查看更多
          </el-button>
        </div>
      </el-descriptions-item> -->
    </el-descriptions>
    <!-- <el-dialog v-model="dialogVisiblePortMore" title="查看端口" width="500">
      <div>
        {{ asset_detail.ip_info_list && asset_detail.ip_info_list.join(",") }}
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisiblePortMore = false">收起</el-button>
        </div>
      </template>
    </el-dialog> -->

    <el-collapse v-model="activeNames" style="width: 100%" accordion>
      <!-- 端口 -->
      <el-collapse-item title="端口" name="0">
        <template #title>
          <div class="el-descriptions__title">端口</div>
        </template>
        <div>
          <el-table
            v-if="asset_detail.ip_info_list"
            style="width: 100%"
            :data="asset_detail.ip_info_list"
            max-height="300px"
            border
            :header-cell-style="{ 'background-color': '#f5f7fa' }"
          >
            <el-table-column fixed prop="port" label="端口" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="service" label="服务" />
            <el-table-column prop="version" label="版本" />
          </el-table>
        </div>
      </el-collapse-item>

      <!-- 敏感目录 -->
      <el-collapse-item title="敏感目录" name="1">
        <template #title>
          <div class="el-descriptions__title">敏感目录</div>
        </template>
        <div>
          <el-table
            v-if="app_sensitive_dir?.list"
            style="width: 100%"
            :data="app_sensitive_dir.list"
            max-height="300px"
            border
            :header-cell-style="{ 'background-color': '#f5f7fa' }"
          >
            <el-table-column fixed prop="title" label="标题" />
            <el-table-column prop="url" label="URL" />
            <!-- <el-table-column prop="target" label="Taget" width="412" /> -->
            <el-table-column prop="status" label="状态" />
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, sizes"
            :current-page="app_sensitive_dir_params.pageNum"
            :page-size="app_sensitive_dir_params.pageSize"
            :total="app_sensitive_dir?.total"
            @current-change="handleSensitiveDirPageChange"
            @size-change="handleSensitiveDirSizeChange"
            style="margin-top: 10px"
          ></el-pagination>
        </div>
      </el-collapse-item>

      <!-- 敏感信息 -->
      <el-collapse-item title="敏感信息" name="2">
        <template #title>
          <div class="el-descriptions__title">敏感信息</div>
        </template>
        <div>
          <el-table
            v-if="app_sensitive_info?.list"
            style="width: 100%"
            :data="app_sensitive_info.list"
            max-height="300px"
            border
            :header-cell-style="{ 'background-color': '#f5f7fa' }"
          >
            <el-table-column fixed prop="type" label="类型" />
            <el-table-column prop="content" label="内容" />
            <!-- <el-table-column prop="target" label="Taget" width="412" /> -->
            <!-- <el-table-column prop="status" label="状态" width="412" /> -->
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, sizes"
            :current-page="app_sensitive_info_params.pageNum"
            :page-size="app_sensitive_info_params.pageSize"
            :total="app_sensitive_info?.total"
            @current-change="handleSensitiveInfoPageChange"
            @size-change="handleSensitiveInfoSizeChange"
            style="margin-top: 10px"
          ></el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts" name="AssetDetail">
import { onMounted, ref } from "vue";
import type { ComponentSize } from "element-plus";
import { Asset, ResPage, Sensitive_dir, Sensitive_info } from "@/api/interface";
import { getAssetDetail, getSensitiveDir, getSensitiveInfo } from "@/api/modules/assets";
import { useRoute } from "vue-router";
const route = useRoute();

// const dialogVisiblePortMore = ref(false);

const asset_detail = ref<Asset.ResDetail>({
  id: "",
  asset: "",
  asset_type: "",
  asset_project: "",
  asset_editor_time: "",
  asset_note: "",
  ehole_fingerprints: [],
  tide_fingerprints: [],
  ip_info_list: []
});

// 在 getDetail 函数中更新 asset_detail
const getDetail = async () => {
  try {
    const { data } = await getAssetDetail({ id: route.params.id as string });
    data.ip_info_list = data.ip_info_list?.filter(e => e.service != null && e.service != "");
    asset_detail.value = data;
  } catch (error) {
    console.log(error);
  }
};

// 敏感目录
const app_sensitive_dir = ref<ResPage<Sensitive_dir.ResSensitive_dirList[]>>();
const app_sensitive_dir_params = ref({
  projectId: 1,
  pageSize: 10,
  pageNum: 1,
  target_id: route.params.id as string
});
const get_app_sensitive_dir = async () => {
  const { data } = await getSensitiveDir(app_sensitive_dir_params.value);
  app_sensitive_dir.value = data;
};
const handleSensitiveDirPageChange = e => {
  app_sensitive_dir_params.value.pageNum = e;
  get_app_sensitive_dir();
};
const handleSensitiveDirSizeChange = e => {
  app_sensitive_dir_params.value.pageSize = e;
  get_app_sensitive_dir();
};

// 敏感信息
const app_sensitive_info_params = ref({
  projectId: 1,
  pageSize: 10,
  pageNum: 1,
  target_id: route.params.id as string
});
const app_sensitive_info = ref<ResPage<Sensitive_info.ResSensitive_infoList[]>>();
const get_app_sensitive_info = async () => {
  const { data } = await getSensitiveInfo(app_sensitive_info_params.value);
  app_sensitive_info.value = data;
};
const handleSensitiveInfoPageChange = e => {
  app_sensitive_info_params.value.pageNum = e;
  get_app_sensitive_info();
};
const handleSensitiveInfoSizeChange = e => {
  app_sensitive_info_params.value.pageSize = e;
  get_app_sensitive_dir();
};

onMounted(() => {
  getDetail();
  get_app_sensitive_dir();
  get_app_sensitive_info();
});

const size = ref<ComponentSize>("large");
const activeNames = ref(["0"]);
// const handleChange = (val: CollapseModelValue) => {
//   console.log(val);
// };
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
</style>
