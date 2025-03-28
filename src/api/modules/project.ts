import { ResPage, Project } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 单位管理模块
 */
// 获取资产列表
export const getprojectList = (params: Project.ReqProjectParams) => {
  return http.post<ResPage<Project.ReqProjectParams>>(`/getProjectList/`, params);
};

// 新增资产
export const addProject = (params: { id: string }) => {
  return http.post(`/project/add/`, params);
};

// 编辑资产
export const editProject = (params: { id: string }) => {
  return http.post(`/project/edit/`, params);
};

// 删除资产
export const deleteProject = (params: { id: string[] }) => {
  return http.post(`/project/delete/`, params);
};
