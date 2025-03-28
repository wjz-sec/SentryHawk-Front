<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable ref="proTable" :columns="columns" :request-api="getprojectList" :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }">
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDialog('新建')">新建项目</el-button>
          <el-button type="danger" :icon="Delete" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">批量删除项目</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <OrganizationDialog ref="DialogRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { Project } from "@/api/interface";
// import { ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
// import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
// import UserDrawer from "@/views/components/UserDrawer.vue";
import OrganizationDialog from "./components/OrganizationDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getprojectList, deleteProject, editProject, addProject } from "@/api/modules/project";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 静态数据,如果变化需要同步修改此处
const genderType: Project.ResTag[] = [
  { id: 1, tag: "安服项目" },
  { id: 2, tag: "监测项目" },
  { id: 3, tag: "等保项目" },
  { id: 4, tag: "临时项目" }
];
// 表格配置项
const columns = reactive<ColumnProps<Project.ResProjectList>[]>([
  { type: "selection", width: 50 },
  {
    prop: "project_name",
    label: "项目名称",
    width: 282,
    search: { el: "input" }
  },
  {
    prop: "project_tag",
    label: "项目类型",
    width: 160,
    enum: genderType,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "tag", value: "id" }
  },
  { prop: "url_num", label: "URL资产总数", width: 170 },
  { prop: "domain_num", label: "Domain资产总数", width: 170 },
  { prop: "ip_num", label: "IP资产总数", width: 170 },
  { prop: "operation", label: "操作", width: 210, fixed: "right" }
]);

// 删除项目
const deleteAccount = async (params: Project.ResProjectList) => {
  await useHandleData(deleteProject, { id: [params.id] }, `删除【${params.project_name}】项目`);
  proTable.value?.getTableList();
};

// 批量删除资产
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteProject, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};
// 打开 Dialog(新建、编辑)
const DialogRef = ref<InstanceType<typeof OrganizationDialog> | null>(null);
const openDialog = (title: string, row: Partial<Project.ResProjectList> = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新建" ? addProject : title === "编辑" ? editProject : undefined,
    getTableList: proTable.value?.getTableList
  };
  DialogRef.value?.acceptParams(params);
};
</script>
