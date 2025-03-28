import { ResPage, Sensitive_info } from "@/api/interface/index";
import http from "@/api";

// 获取敏感信息列表
export const getSensitive_infoList = (params: Sensitive_info.ReqSensitive_infoParams) => {
  return http.post<ResPage<Sensitive_info.ReqSensitive_infoParams>>(`/getSensitive_infoList/`, params);
};

// 删除敏感信息模板
export const deleteSensitive_info = (params: { id: string[] }) => {
  return http.post(`/Sensitive_info/delete/`, params);
};
