import { ResPage, Scan } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 扫描任务模块
 */
// 获取扫描模板列表
export const getScanList = (params: Scan.ReqScanParams) => {
  return http.post<ResPage<Scan.ReqScanParams>>(`/getScanList/`, params);
};

// 新增扫描模板
export const addScan = (params: { id: string }) => {
  return http.post(`/scan/add/`, params);
};

// 编辑扫描模板
export const editScan = (params: { id: string }) => {
  return http.post(`/scan/edit/`, params);
};

// 删除扫描模板
export const deleteScan = (params: { id: string[] }) => {
  return http.post(`/scan/delete/`, params);
};

// 开始扫描
export const startScan = (params: { id: string }) => {
  return http.post(`/startScan/`, params);
};
