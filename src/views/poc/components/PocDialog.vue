<template>
  <el-dialog center :title="`${project_form.title}资产`" v-model="dialogVisible" width="70%">
    <main class="dialog-main">
      <div class="dialog_div">
        <span class="inside_span">POC名称</span>
        <el-input v-model="project_form.row!.poc_name" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">作者</span>
        <el-input v-model="project_form.row!.author" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">CVSS评分</span>
        <el-input v-model="project_form.row!.cvss_score" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">威胁等级</span>
        <el-select v-model="project_form.row!.severity" placeholder="Select" style="width: calc(100% - 100px)">
          <el-option v-for="type in type_list" :key="type.type" :label="type.type" :value="type.type" />
        </el-select>
      </div>
      <div class="dialog_div">
        <span class="inside_span">供应商</span>
        <el-input v-model="project_form.row!.vendor" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">产品</span>
        <el-input v-model="project_form.row!.product" placeholder="请输入内容" style="width: calc(100% - 100px)"></el-input>
      </div>
      <div class="dialog_div">
        <span class="inside_span">标签</span>
        <el-select v-model="project_form.row!.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
          <el-option v-for="poctags in poctags_list" :key="poctags.id" :label="poctags.name" :value="poctags.name"></el-option>
        </el-select>
      </div>
      <div class="dialog_div">
        <span class="inside_span">POC内容</span>
        <codemirror
          v-model="project_form.row!.content"
          :style="{ height: '500px', width: '89%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </main>
  </el-dialog>
</template>

<script setup lang="ts" name="PocDialog">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { Poc } from "@/api/interface";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { getpoctags } from "@/api/modules/poc";

const extensions = [javascript(), oneDark];

const type_list: Poc.ResType[] = [{ type: "高危" }, { type: "中危" }, { type: "低危" }];

let poctags_list: Poc.ResTags[] = [];

const getpoctagsList = async () => {
  try {
    const { data } = await getpoctags();
    poctags_list = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getpoctagsList();
});

interface project_form {
  title: string;
  row: Partial<Poc.RespocList>;
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
