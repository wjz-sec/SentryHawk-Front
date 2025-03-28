import { ResPage, Vuln } from "@/api/interface/index";
import http from "@/api";

// 获取漏洞列表
export const getVulnlist = (params: Vuln.ReqVulnParams) => {
  return http.post<ResPage<Vuln.ReqVulnParams>>(`/getVulnlist/`, params);
};

// 删除漏洞模板
export const deleteVuln = (params: { id: string[] }) => {
  return http.post(`/vuln/delete/`, params);
};
