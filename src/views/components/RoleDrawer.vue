<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户组`" @open="onopen">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
      label-position="top"
    >
      <el-form-item label="用户组名称" prop="group_name">
        <el-input v-model="drawerProps.row!.group_name" placeholder="请填写用户组名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="group_menu">
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="menus"
          show-checkbox
          default-expand-all
          node-key="path"
          highlight-current
          :props="defaultProps"
        />
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
import { ElMessage, FormInstance, TreeInstance } from "element-plus";
import { getAuthMenuListApi } from "@/api/modules/login";
const treeRef = ref<TreeInstance>();
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
};
defineExpose({
  acceptParams
});
const defaultProps = {
  children: "children",
  label: "title"
};
const menus = ref<Menu.MenuOptions[]>();
const getAuthMenuList = async () => {
  const res = await getAuthMenuListApi();
  menus.value = res.data;
};
getAuthMenuList();
const rules = reactive({
  group_name: [{ required: true, message: "请填写用户名" }],
  group_menu: [{ required: true, message: "请选择菜单权限" }]
});
const onopen = () => {
  let menus = drawerProps.value.row["menus"];
  if (!menus) return;
  treeRef.value!.setCheckedKeys(drawerProps.value.row["menus"], false);
};
interface DrawerProps {
  title: string;
  isView: boolean;
  row: any;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  drawerProps.value.row.group_menu = treeRef.value!.getCheckedKeys(false);
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
