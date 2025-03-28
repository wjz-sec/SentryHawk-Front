<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable ref="proTable" :columns="columns" :request-api="getScanList" :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }">
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDialog('新建')">新建扫描模板</el-button>
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
            批量删除扫描模板
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="startAccount(scope.row)">开始扫描</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <ScanDialog ref="DialogRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { Scan } from "@/api/interface";
// import { ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
// import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
// import UserDrawer from "@/views/components/UserDrawer.vue";
import ScanDialog from "./components/ScanDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getScanList, deleteScan, editScan, addScan, startScan } from "@/api/modules/scan";

// ProTable 实例
const proTable = ref<ProTableInstance>();

const getScanStatus: Scan.ResTag[] = [
  { status: true, msg: "启用" },
  { status: false, msg: "禁用" }
];

// 表格配置项
const columns = reactive<ColumnProps<Scan.ResScanList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "scan_name",
    label: "扫描模板名称",
    width: 282,
    search: { el: "input" }
  },
  { prop: "scan_schedule", label: "扫描进度", width: 170 },
  {
    prop: "asset_scan_if",
    enum: getScanStatus,
    tag: true,
    label: "是否开启资产收集",
    width: 170,
    fieldNames: { label: "msg", value: "status" }
  },
  {
    prop: "info_scan_if",
    enum: getScanStatus,
    tag: true,
    label: "是否开启信息收集",
    width: 170,
    fieldNames: { label: "msg", value: "status" }
  },
  {
    prop: "vuln_scan_if",
    enum: getScanStatus,
    tag: true,
    label: "是否开启漏洞扫描",
    width: 170,
    fieldNames: { label: "msg", value: "status" }
  },
  {
    prop: "project_id",
    label: "所属项目",
    width: 160,
    search: { el: "input" }
  },
  { prop: "scan_start_time", label: "扫描开始时间", width: 170 },
  { prop: "scan_end_time", label: "扫描结束时间", width: 170 },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);

// 删除扫描模板
const deleteAccount = async (params: Scan.ResScanList) => {
  await useHandleData(deleteScan, { id: [params.id] }, `删除【${params.scan_name}】`);
  proTable.value?.getTableList();
};

// 开始扫描
const startAccount = async (params: Scan.ResScanList) => {
  await useHandleData(startScan, { id: params.id }, `使用【${params.scan_name}】开始扫描`);
  proTable.value?.getTableList();
};

// 批量删除资产
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteScan, { id }, "删除所选模板");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 打开 Dialog(新建、编辑)
const DialogRef = ref<InstanceType<typeof ScanDialog> | null>(null);
const openDialog = (title: string, row: Partial<Scan.ResScanList> = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新建" ? addScan : title === "编辑" ? editScan : undefined,
    getTableList: proTable.value?.getTableList
  };
  DialogRef.value?.acceptParams(params);
};
</script>
