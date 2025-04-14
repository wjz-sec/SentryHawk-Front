<template>
  <div class="main-box">
    <TreeFilter label="name" title="单位列表" :request-api="getAssetOrganization" :default-value="initParam.projectId" @change="changeTreeFilter" />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getSensitive_infoList"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">批量删除</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
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
import { Sensitive_info } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
// import UserDrawer from "@/views/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Delete } from "@element-plus/icons-vue";
import { getSensitive_infoList, deleteSensitive_info } from "@/api/modules/sensitive_info";
import { getAssetOrganization } from "@/api/modules/assets";
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
// 表格配置项
const columns = reactive<ColumnProps<Sensitive_info.ResSensitive_infoList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "type",
    label: "类型",
    // width: 380,
    search: { el: "input" }
  },
  { prop: "content", label: "内容" },
  {
    prop: "target",
    label: "所属资产",
    // width: 380,
    search: { el: "input" }
  },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);
// 删除资产
const deleteAccount = async (params: Sensitive_info.ResSensitive_infoList) => {
  await useHandleData(deleteSensitive_info, { id: [params.id] }, `删除【${params.info}】资产`);
  proTable.value?.getTableList();
};
// 批量删除资产
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteSensitive_info, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};
</script>
