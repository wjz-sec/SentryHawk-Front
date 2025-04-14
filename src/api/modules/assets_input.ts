import { ResPage, Asset } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 项目资产模块
 */
// 获取资产列表
export const getAssetsList = (params: Asset.ReqassertParams) => {
  return http.post<ResPage<Asset.ReqassertParams>>(`/getAsset_inputlist/`, params);
};

// 新增资产
export const addAsset = (params: { id: string }) => {
  return http.post(`/asset_input/add/`, params);
};

// 批量添加资产`
export const BatchAddAsset = (params: FormData) => {
  return http.post(`/asset_input/BatchAdd/`, params);
};

// 编辑资产
export const editAsset = (params: { id: string }) => {
  return http.post(`/asset_input/edit/`, params);
};

// 删除资产
export const deleteAsset = (params: { id: string[] }) => {
  return http.post(`/asset_input/delete/`, params);
};

// 导出资产数据
export const downloadAssetInfo = (params: Asset.ReqassertParams) => {
  return http.download(`/asset_input/downloadAssetInfo/`, params);
};

// 获取资产批量添加模板
export const exportAssetDemo = (params: Asset.ReqassertParams) => {
  return http.download(`/getAssetAddDemo/`, params);
};

// 获取资产类型
export const getAssetType = () => {
  return http.get<Asset.ResType[]>(`/asset/type/`);
};

// 获取资产单位树形选择器列表
export const getAssetOrganization = () => {
  return http.get<Asset.ResDepartment[]>(`/getAssetOrganization/`, {}, { cancel: false });
};

//获取资产单位列表
export const getAssetProject = () => {
  return http.get<Asset.ResProject[]>(`/asset/project/`, {}, { cancel: false });
};

// 获取资产详情
export const getAssetDetail = (params: { id: string }) => {
  return http.get<Asset.ResDetail>(`/asset/detail/`, params);
};
