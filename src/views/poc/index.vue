<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable ref="proTable" :columns="columns" :request-api="getPocList" :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }">
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增POC</el-button>
          <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加POC</el-button>
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">批量删除POC</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <PocDialog ref="DialogRef" />
      <ImportFile ref="dialogRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { Poc } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportFile from "@/components/ImportFile/index.vue";
import PocDialog from "./components/PocDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Upload } from "@element-plus/icons-vue";
import { getPocList, deletePoc, editPoc, addPoc, BatchAddPoc } from "@/api/modules/poc";
import { exportAssetDemo } from "@/api/modules/assets";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 静态数据,有需要需要修改
const genderType: Poc.ResType[] = [{ type: "高危" }, { type: "中危" }, { type: "低危" }];
// 表格配置项
const columns = reactive<ColumnProps<Poc.RespocList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "poc_name",
    label: "POC名称",
    width: 350,
    search: { el: "input" }
  },
  {
    prop: "author",
    label: "作者",
    width: 200,
    search: { el: "input" }
  },
  {
    prop: "severity",
    label: "威胁等级",
    width: 100,
    enum: genderType,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "type", value: "type" }
  },
  {
    prop: "cvss_score",
    label: "cvss评分",
    width: 200
  },
  {
    prop: "vendor",
    label: "供应商",
    width: 200,
    search: { el: "input" }
  },
  {
    prop: "product",
    label: "产品",
    width: 200,
    search: { el: "input" }
  },
  {
    prop: "tags",
    label: "标签",
    width: 300,
    search: { el: "input" }
  },
  { prop: "add_time", label: "创建时间", width: 170 },
  { prop: "editor_time", label: "修改时间", width: 170 },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);

// 删除POC
const deleteAccount = async (params: Poc.RespocList) => {
  await useHandleData(deletePoc, { id: [params.id] }, `删除【${params.poc_name}】POC`);
  proTable.value?.getTableList();
};

// 批量删除POC
const batchDelete = async (id: string[]) => {
  await useHandleData(deletePoc, { id }, "删除所选poc");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 批量添加POC
const dialogRef = ref<InstanceType<typeof ImportFile> | null>(null);
const batchAdd = () => {
  if (dialogRef.value) {
    dialogRef.value.acceptParams = {
      title: "POC",
      tempApi: exportAssetDemo,
      importApi: BatchAddPoc,
      getTableList: proTable.value?.getTableList,
      fileTypes: [".yaml", ".zip"],
      tipMessage: "支持上传 YAML 或 ZIP 格式的文件"
    };
    dialogRef.value.open();
  }
};

// 打开 drawer(新增、编辑)
const DialogRef = ref<InstanceType<typeof PocDialog> | null>(null);
const openDialog = (title: string, row: Partial<Poc.RespocList> = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addPoc : title === "编辑" ? editPoc : undefined,
    getTableList: proTable.value?.getTableList
  };
  DialogRef.value?.acceptParams(params);
};
</script>
