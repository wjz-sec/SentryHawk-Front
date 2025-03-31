<template>
  <el-dialog center :title="`${scan_form.title}扫描模板`" v-model="dialogVisible" width="50%" class="dialog-all">
    <main class="dialog-main">
      <div class="dialog-row">
        <span class="inside_span">&nbsp;&nbsp;模板名称:&nbsp;&nbsp;</span>
        <el-input v-model="scan_form.row!.scan_name" placeholder="请输入内容" style="width: 400px"></el-input>
      </div>
      <div class="dialog-row">
        <span class="inside_span">所属项目:&nbsp;&nbsp;</span>
        <el-select v-model="scan_form.row!.project_id" placeholder="Select" filterable style="width: 400px">
          <el-option v-for="asset_project in project_list" :key="asset_project.id" :label="asset_project.name" :value="asset_project.id" />
        </el-select>
      </div>
      <span class="divider">---------------------------资产收集---------------------------</span>
      <div class="dialog-row">
        <span class="inside_span">是否开启资产收集</span>
        <el-switch v-model="scan_form.row!.asset_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="switch-row" v-if="scan_form.row!.asset_scan_if">
        <span class="inside_span">fofa 收集</span>
        <el-switch v-model="scan_form.row!.fofa_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span" style="display: none">hunter 收集</span>
        <el-switch style="display: none" v-model="scan_form.row!.hunter_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">quake 收集</span>
        <el-switch v-model="scan_form.row!.quake_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <span class="divider">---------------------------信息收集---------------------------</span>
      <div class="dialog-row">
        <span class="inside_span">是否开启信息收集</span>
        <el-switch v-model="scan_form.row!.info_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="switch-row" v-if="scan_form.row!.info_scan_if">
        <span class="inside_span">crt.sh子域名收集</span>
        <el-switch v-model="scan_form.row!.crt_sh_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">rustscan端口扫描</span>
        <el-switch v-model="scan_form.row!.port_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">EHole指纹识别</span>
        <el-switch v-model="scan_form.row!.EHole_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">TideFinger指纹识别</span>
        <el-switch v-model="scan_form.row!.TideFinger_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">WIH探测</span>
        <el-switch v-model="scan_form.row!.Wih_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">JSfinder扫描</span>
        <el-switch v-model="scan_form.row!.JSFinder_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">Dirsearch</span>
        <el-switch v-model="scan_form.row!.Dirsearch_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">oneforall子域名收集</span>
        <el-switch v-model="scan_form.row!.Oneforall_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <span class="divider">---------------------------漏洞扫描---------------------------</span>
      <div class="dialog-row">
        <span class="inside_span">是否开启漏洞扫描</span>
        <el-switch v-model="scan_form.row!.vuln_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="switch-row" v-if="scan_form.row!.vuln_scan_if">
        <span class="inside_span">xray扫描</span>
        <el-switch v-model="scan_form.row!.xray_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">nuclei扫描</span>
        <el-switch v-model="scan_form.row!.nuclei_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span">afrog扫描</span>
        <el-switch v-model="scan_form.row!.afrog_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span class="inside_span" style="display: none">AWVS扫描</span>
        <el-switch style="display: none" v-model="scan_form.row!.awvs_scan_if" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div>
        <el-button type="primary" @click="handleSubmit" style="margin-top: 20px; width: 400px">保存</el-button>
      </div>
    </main>
  </el-dialog>
</template>

<script setup lang="ts" name="ScanDialog">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { Scan } from "@/api/interface";
import { getAssetProject } from "@/api/modules/assets";

let project_list: Scan.ResProject[] = [];

const getProjectList = async () => {
  try {
    const { data } = await getAssetProject();
    project_list = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getProjectList();
});

interface scan_form {
  title: string;
  row: Partial<Scan.ResScanList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const dialogVisible = ref(false);
const scan_form = ref<scan_form>({
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: scan_form) => {
  scan_form.value = params;
  dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const handleSubmit = async () => {
  try {
    // 确保api存在
    if (!scan_form.value.api) {
      throw new Error("API method is not defined.");
    }

    // 执行API请求
    await scan_form.value.api(scan_form.value.row);
    ElMessage.success({ message: `${scan_form.value.title}扫描模板成功！` });

    // 刷新表格数据
    await scan_form.value.getTableList!();

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

<style>
.dialog-all {
  max-height: 70vh; /* 设置最大高度为视口高度的90% */
  overflow-y: auto; /* 添加滚动条 */
}

.dialog-main {
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保子元素在交叉轴上居中对齐 */
  justify-content: flex-start; /* 主轴上从开始位置对齐 */
  width: 100%;
  padding: 20px; /* 增加内边距，以便内容不会紧贴边缘 */
}

.dialog-row,
.switch-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* 允许元素换行 */
  justify-content: center; /* 确保子元素在主轴上居中对齐 */
  margin-bottom: 10px; /* 每个元素之间的间隔 */
  width: 100%;
  max-width: 600px; /* 或者您可以设置一个最大宽度 */
}

.switch-row {
  gap: 10px; /* 设置子元素之间的间隔 */
}

.dialog-row:not(:first-child) {
  margin-left: 10px; /* 每个 .dialog-row 之间的左间距 */
}

.inside_span {
  margin-right: 10px;
  white-space: nowrap;
}

.divider {
  width: 100%;
  text-align: center;
  margin: 10px 0;
}
</style>
