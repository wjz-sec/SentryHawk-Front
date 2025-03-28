import { ResPage, Poc } from "@/api/interface/index";
import http from "@/api";

/**
 * @name POC管理模块
 */
// 获取POC列表
export const getPocList = (params: Poc.ReqpocParams) => {
  return http.post<ResPage<Poc.ReqpocParams>>(`/getPoclist/`, params);
};

// 获取POC tags列表
export const getpoctags = () => {
  return http.get<Poc.ResTags[]>(`/poc/getpoctags/`, {}, { cancel: false });
};

// 新增POC
export const addPoc = (params: { id: string }) => {
  return http.post(`/poc/add/`, params);
};

// 批量添加POC
export const BatchAddPoc = (params: FormData) => {
  return http.post(`/poc/BatchAdd/`, params);
};

// 编辑POC
export const editPoc = (params: { id: string }) => {
  return http.post(`/poc/edit/`, params);
};

// 删除POC
export const deletePoc = (params: { id: string[] }) => {
  return http.post(`/poc/delete/`, params);
};

// 导出POC数据
export const downloadPocInfo = (params: Poc.ReqpocParams) => {
  return http.download(`/poc/downloadPocInfo/`, params);
};
