<template>
  <div class="main-box">
    <TreeFilter label="name" title="单位列表" :request-api="getAssetOrganization" :default-value="initParam.projectId" @change="changeTreeFilter" />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getVulnlist"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <!-- <el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增漏洞</el-button> -->
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">批量删除漏洞产</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <!-- <el-button type="primary" link :icon="View" @click="toDetail(scope.row!.id)">查看</el-button> -->
          <!-- <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button> -->
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
import { Vuln } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
// import UserDrawer from "@/views/components/UserDrawer.vue";
// import AssetDialog from "./components/AssetDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Delete } from "@element-plus/icons-vue";
import { getVulnlist, deleteVuln } from "@/api/modules/vuln";
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
const genderType: Vuln.ResType[] = [{ type: "高危" }, { type: "中危" }, { type: "低危" }];
// 表格配置项
const columns = reactive<ColumnProps<Vuln.ResVulnList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "vuln_name",
    label: "漏洞名称",
    width: 220,
    search: { el: "input" }
  },
  {
    prop: "target",
    label: "漏洞目标",
    width: 200,
    search: { el: "input" }
  },
  {
    prop: "vuln_level",
    label: "漏洞危害级别",
    width: 130,
    enum: genderType,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "type", value: "type" }
  },
  { prop: "vuln_from", label: "漏洞来源", width: 170 },
  { prop: "editor_time", label: "创建时间", width: 170 },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);

// 删除漏洞
const deleteAccount = async (params: Vuln.ResVulnList) => {
  await useHandleData(deleteVuln, { id: [params.id] }, `删除【${params.vuln_name}】漏洞`);
  proTable.value?.getTableList();
};

// 批量删除漏洞
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteVuln, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};
</script>
