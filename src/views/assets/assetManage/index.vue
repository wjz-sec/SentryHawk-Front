<template>
  <div class="main-box">
    <TreeFilter label="name" title="单位列表" :request-api="getAssetOrganization" :default-value="initParam.projectId" @change="changeTreeFilter" />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getAssetsList"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增资产</el-button>
          <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加资产</el-button>
          <el-button type="primary" :icon="Download" plain @click="downloadFile">导出资产</el-button>
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">批量删除资产</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="toDetail(scope.row!.id)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <AssetDialog ref="DialogRef" />
      <ImportExcel ref="dialogRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { Asset } from "@/api/interface";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
// import UserDrawer from "@/views/components/UserDrawer.vue";
import AssetDialog from "./components/AssetDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import { getAssetsList, deleteAsset, BatchAddAsset, editAsset, addAsset, downloadAssetInfo, exportAssetDemo } from "@/api/modules/assets";
import { getAssetOrganization } from "@/api/modules/assets";

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/assets/assetManage/detail/${id}`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ projectId: "" });

// 树形筛选切换
const changeTreeFilter = (val: string) => {
  // ElMessage.success("请注意查看请求参数变化 🤔");
  proTable.value!.pageable.pageNum = 1;
  initParam.projectId = val;
};

// 静态数据,有需要需要修改
const genderType: Asset.ResType[] = [{ type: "URL" }, { type: "Domain" }, { type: "IP" }];
// 表格配置项
const columns = reactive<ColumnProps<Asset.ResassertList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "asset",
    label: "资产",
    minWidth: 451,
    search: { el: "input" }
  },
  {
    prop: "asset_type",
    label: "资产类别",
    width: 100,
    enum: genderType,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "type", value: "type" }
  },
  { prop: "asset_editor_time", label: "创建时间", width: 170 },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);

// 删除资产
const deleteAccount = async (params: Asset.ResassertList) => {
  await useHandleData(deleteAsset, { id: [params.id] }, `删除【${params.asset}】资产`);
  proTable.value?.getTableList();
};

// 批量删除资产
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteAsset, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出资产数据?", "温馨提示", { type: "warning" }).then(() => {
    const exportParams = {
      ...proTable.value?.searchParam, // 展开 searchParam 的所有属性
      projectId: initParam.projectId // 添加 projectId 参数
    };
    // 调用 useDownload 方法，并传递构造的参数
    useDownload(downloadAssetInfo, "单位资产列表", exportParams);
  });
};

// 批量添加资产
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
  const params = {
    title: "资产",
    tempApi: exportAssetDemo,
    importApi: BatchAddAsset,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

// 打开 drawer(新增、编辑)
const DialogRef = ref<InstanceType<typeof AssetDialog> | null>(null);
const openDialog = (title: string, row: Partial<Asset.ResassertList> = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addAsset : title === "编辑" ? editAsset : undefined,
    getTableList: proTable.value?.getTableList
  };
  DialogRef.value?.acceptParams(params);
};
</script>
