import { ResPage, Sensitive_dir } from "@/api/interface/index";
import http from "@/api";

// 获取敏感目录列表
export const getSensitive_dirList = (params: Sensitive_dir.ReqSensitive_dirParams) => {
  return http.post<ResPage<Sensitive_dir.ReqSensitive_dirParams>>(`/getSensitive_dirList/`, params);
};

// 删除敏感目录模板
export const deleteSensitive_dir = (params: { id: string[] }) => {
  return http.post(`/Sensitive_dir/delete/`, params);
};
