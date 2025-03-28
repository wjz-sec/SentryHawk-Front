<template>
  <el-dialog center :title="`${project_form.title}单位`" v-model="dialogVisible" width="50%">
    <main class="dialog-main">
      <div class="dialog_div">
        <span class="inside_span">单位名称</span>
        <el-input v-model="project_form.row!.project_name" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">项目类型</span>
        <el-select v-model="project_form.row!.project_tag" placeholder="Select" style="width: calc(100% - 100px)">
          <el-option v-for="tag in tag_list" :key="tag.id" :label="tag.tag" :value="tag.id" />
        </el-select>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </main>
  </el-dialog>
</template>

<script setup lang="ts" name="OrganizationDialog">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Project } from "@/api/interface";

let tag_list: Project.ResTag[] = [
  { id: 1, tag: "安服项目" },
  { id: 2, tag: "监测项目" },
  { id: 3, tag: "等保项目" },
  { id: 4, tag: "临时项目" }
];

interface project_form {
  title: string;
  row: Partial<Project.ResProjectList>;
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
    ElMessage.success({ message: `${project_form.value.title}单位成功！` });

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
