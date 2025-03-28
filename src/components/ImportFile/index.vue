<template>
  <el-dialog v-model="dialogVisible" :title="`批量导入${acceptParams.title}`" width="30%">
    <el-upload
      class="upload-demo"
      drag
      :action="upload.url"
      :headers="upload.headers"
      name="file"
      :multiple="true"
      :data="uploadData"
      accept=".yaml,.zip"
      :on-success="excelUploadSuccess"
      :on-error="excelUploadError"
      :before-upload="beforeUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">支持上传 YAML 或 ZIP 格式的文件</div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElNotification, ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

interface AcceptParams {
  title: string;
  tempApi?: (params: any) => Promise<any>;
  importApi: (params: any) => Promise<any>;
  getTableList?: () => void;
  fileTypes: string[];
  tipMessage: string;
}

const dialogVisible = ref(false);
const acceptParams = ref<AcceptParams>({
  title: "",
  tempApi: undefined,
  importApi: async (params: any) => {
    try {
      const response = await fetch("/api/your-import-endpoint", {
        method: "POST",
        body: JSON.stringify(params)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Import API Error:", error);
      throw new Error("Import API failed");
    }
  },
  getTableList: undefined,
  fileTypes: [],
  tipMessage: ""
});

const upload = {
  url: "/api/poc/batchadd/",
  headers: {
    Authorization: localStorage.getItem("token")
  }
};

const open = () => {
  dialogVisible.value = true;
};

// const close = () => {
//   dialogVisible.value = false;
// };

// 修改上传数据
const uploadData = {
  type: "multipart"
};

const beforeUpload = (file: File) => {
  const fileName = file.name.toLowerCase();
  // 检查文件类型
  if (!fileName.endsWith(".yaml") && !fileName.endsWith(".zip")) {
    ElMessage.error("只能上传 YAML 或 ZIP 格式的文件！");
    return false;
  }

  // 检查文件大小
  const fileSize = file.size / 1024 / 1024 < 5;
  if (!fileSize) {
    ElMessage.error("上传文件大小不能超过 5MB！");
    return false;
  }

  // 简单的 ZIP 文件类型检查
  if (fileName.endsWith(".zip")) {
    const validZipTypes = ["application/zip", "application/x-zip-compressed", "application/x-zip", ""];
    if (!validZipTypes.includes(file.type)) {
      console.log("文件类型:", file.type); // 用于调试
    }
  }

  return true;
};

// const handleSuccess = async (response: { code: number; msg: string; data: any }) => {
//   console.log("Response:", response);
//   //   if (response.code === 200) {
//   //     try {
//   //       const res = await acceptParams.value.importApi(response.data);
//   //       console.log("Import API Response:", res);
//   //       if (res.code === 200) {
//   //         ElMessage.success(res.msg || "导入成功");
//   //         acceptParams.value.getTableList?.();
//   //         close();
//   //       } else {
//   //         ElMessage.error(res.msg || "导入失败");
//   //       }
//   //     } catch (error) {
//   //       console.error("Import Error:", error);
//   //       ElMessage.error("导入失败");
//   //     }
//   //   } else {
//   //     ElMessage.error(response.msg || "上传失败");
//   //   }
// };

// const handleError = (error: any) => {
//   console.error("上传错误详情：", error);
//   ElMessage.error("上传失败");
// };

// 上传错误提示
const excelUploadError = (error: any) => {
  console.error("上传错误:", error);
  ElNotification({
    title: "温馨提示",
    message: `批量添加${acceptParams.value.title}失败，请您重新上传！`,
    type: "error"
  });
};

// 上传成功提示
const excelUploadSuccess = (response: any) => {
  if (response.code === 200) {
    ElNotification({
      title: "温馨提示",
      message: `批量添加${acceptParams.value.title}成功！`,
      type: "success"
    });
    acceptParams.value.getTableList?.();
    dialogVisible.value = false;
  } else {
    ElNotification({
      title: "温馨提示",
      message: response.msg || `批量添加${acceptParams.value.title}失败！`,
      type: "error"
    });
  }
};

defineExpose({
  open,
  acceptParams
});
</script>
