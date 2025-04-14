<template>
  <el-dialog center :title="`${project_form.title}资产`" v-model="dialogVisible" width="50%">
    <main class="dialog-main">
      <div class="dialog_div">
        <span class="inside_span">资产</span>
        <el-input v-model="project_form.row!.asset" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">资产类型</span>
        <el-select v-model="project_form.row!.asset_type" placeholder="Select" style="width: calc(100% - 100px)">
          <el-option v-for="type in type_list" :key="type.type" :label="type.type" :value="type.type" />
        </el-select>
      </div>
      <div class="dialog_div">
        <span class="inside_span">所属项目</span>
        <el-select v-model="project_form.row!.asset_project" placeholder="Select" filterable style="width: calc(100% - 100px)">
          <el-option v-for="asset_project in asset_project_list" :key="asset_project.id" :label="asset_project.name" :value="asset_project.id" />
        </el-select>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </main>
  </el-dialog>
</template>
<script setup lang="ts" name="AssetDialog">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { Asset } from "@/api/interface";
import { getAssetType, getAssetProject } from "@/api/modules/assets";
let type_list: Asset.ResType[] = [];
let asset_project_list: Asset.ResProject[] = [];
const getTypeList = async () => {
  try {
    const { data } = await getAssetType();
    type_list = data;
  } catch (error) {
    console.log(error);
  }
};
const getProjectList = async () => {
  try {
    const { data } = await getAssetProject();
    asset_project_list = data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getTypeList();
  getProjectList();
});
interface project_form {
  title: string;
  row: Partial<Asset.ResassertList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}
const dialogVisible = ref(false);
const project_form = ref<project_form>({
  title: "",
  row: {}
});
// 接收父组件传过来的参数
const acceptParams = (params: project_form) => {
  project_form.value = params;
  dialogVisible.value = true;
};
// 提交数据（新增/编辑）
const handleSubmit = async () => {
  try {
    // 确保api存在
    if (!project_form.value.api) {
      throw new Error("API method is not defined.");
    }
    // 执行API请求
    await project_form.value.api(project_form.value.row);
    ElMessage.success({ message: `${project_form.value.title}资产成功！` });
    // 刷新表格数据
    await project_form.value.getTableList!();
    // 关闭对话框
    dialogVisible.value = false;
  } catch (error) {
    // 处理错误情况，提供用户反馈
    console.error(error);
  }
};
defineExpose({
  acceptParams
});
</script>
<style scoped>
.dialog_div {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}
.inside_span {
  text-align: left;
  width: 100px;
  margin-right: 10px;
}
</style>
