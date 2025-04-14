<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <!-- <el-form-item label="用户头像" prop="avatar">
        <UploadImg v-model:image-url="drawerProps.row!.avatar as string" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 3M </template>
        </UploadImg>
      </el-form-item> -->
      <!-- <el-form-item label="用户照片" prop="photo">
        <UploadImgs v-model:file-list="drawerProps.row!.photo as UploadUserFile[]" height="140px" width="140px" border-radius="50%">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传照片</span>
          </template>
          <template #tip> 照片大小不能超过 5M </template>
        </UploadImgs>
      </el-form-item> -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="drawerProps.row!.username" placeholder="请填写用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="drawerProps.row!.password" placeholder="请填写用户密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone_num">
        <el-input v-model="drawerProps.row!.phone_num" placeholder="请填写手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="user_group">
        <el-select v-model="drawerProps.row!.user_group" placeholder="请选择用户组" clearable>
          <el-option v-for="item in userRoles" :key="item.id" :label="item.group_name" :value="item.group_name" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="drawerProps.row!.email" placeholder="请填写邮箱" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { User } from "@/api/interface";
import { getUserRole } from "@/api/modules/user";

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});
// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
  if (params.title === "新增") {
    rules.password[0].required = true;
  } else {
    rules.password[0].required = false;
  }
};
defineExpose({
  acceptParams
});
const userRoles = ref<User.ResRole[]>();
const getUserRoles = async () => {
  const res = await getUserRole();
  userRoles.value = res.data.list;
};
getUserRoles();
const rules = reactive({
  username: [{ required: true, message: "请填写用户名" }],
  password: [{ required: false, message: "请填写用户密码" }],
  phone_num: [{ required: true, message: "请填写手机号码" }],
  user_group: [{ required: true, message: "请选择用户身份" }],
  email: [{ required: true, message: "请填写邮箱" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<User.ResUserList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}
// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};
</script>
