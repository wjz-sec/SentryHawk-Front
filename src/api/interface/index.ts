// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    userInfo: { name: string };
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

export namespace Asset {
  export interface ReqassertParams extends ReqPage {
    asset_id: string;
    asset: string;
    asset_type: string;
    asset_editor_time: string;
  }
  export interface ResassertList {
    id: string;
    asset: string;
    asset_type: string;
    asset_project: string;
    asset_editor_time: string;
  }

  export interface ResType {
    type: string;
  }

  export interface ResDetail {
    id: string;
    asset: string;
    asset_type: string;
    asset_project: string;
    asset_editor_time: string;
    asset_note: string;
    ip_info_list?: ResIp_info[];
    url_info_list?: ResUrl_info;
    subdomain?: string;
    ehole_fingerprints: String[];
    tide_fingerprints: String[];
  }

  export interface ResIp_info {
    port: string;
    domain: string;
    status: string;
    service: string;
  }

  export interface ResUrl_info {
    title: string;
    finger: string;
    status: string;
  }

  export interface ResDomain_info {
    subdomain: string;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }

  export interface ResProject {
    name: string;
    id: string;
  }

  export interface ResAddAsset {
    message: string;
  }

  export interface ResAsssetCount {
    total_assets: number;
    url_assets: number;
    ip_assets: number;
    domain_assets: number;
  }

  export interface ResSensitiveCount {
    value: number;
    name: string;
  }
}

export namespace Poc {
  export interface ReqpocParams extends ReqPage {
    poc_id: string;
    poc_name: string;
    author: string;
    severity: string;
    cvss_score: string;
    vendor: string;
    product: string;
    tags: string;
    add_time: string;
    editor_time: string;
  }
  export interface RespocList {
    id: string;
    poc_name: string;
    content: string;
    author: string;
    severity: string;
    cvss_score: string;
    vendor: string;
    product: string;
    tags: string;
    add_time: string;
    editor_time: string;
  }

  export interface ResType {
    type: string;
  }

  export interface ResDetail {
    id: string;
    asset: string;
    asset_type: string;
    asset_project: string;
    asset_editor_time: string;
    asset_note: string;
    ip_info_list?: ResIp_info[];
    url_info_list?: ResUrl_info;
    subdomain?: string;
  }

  export interface ResIp_info {
    port: string;
    domain: string;
    status: string;
    service: string;
  }

  export interface ResUrl_info {
    title: string;
    finger: string;
    status: string;
  }

  export interface ResDomain_info {
    subdomain: string;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }

  export interface ResTags {
    name: string;
    id: string;
  }

  export interface ResAddAsset {
    message: string;
  }
}

export namespace Project {
  export interface ReqProjectParams extends ReqPage {
    project_id: string;
    project_name: string;
    url_num: string;
    domain_num: string;
    ip_num: string;
    project_tag: string;
  }
  export interface ResProjectList {
    id: string;
    project_name: string;
    project_tag: string;
  }

  export interface ResTag {
    id: number;
    tag: string;
  }

  export interface ResProject {
    name: string;
    id: string;
  }

  export interface ResAddAsset {
    message: string;
  }
}

export namespace Scan {
  export interface ReqScanParams extends ReqPage {
    scan_id: string;
    scan_name: string;
    scan_schedule: string;
    project: string;
    asset_scan_if: string;
    info_scan_if: string;
    vuln_scan_if: string;
  }
  export interface ResScanList {
    id: string;
    scan_name: string;
    scan_schedule: string;
    project_id: string;
    asset_scan_if: boolean;
    info_scan_if: boolean;
    vuln_scan_if: boolean;
    xray_scan_if: boolean;
    nuclei_scan_if: boolean;
    afrog_scan_if: boolean;
    awvs_scan_if: boolean;
    crt_sh_scan_if: boolean;
    Ksubdomain_scan_if: boolean;
    port_scan_if: boolean;
    EHole_scan_if: boolean;
    TideFinger_scan_if: boolean;
    Wih_scan_if: boolean;
    URLfinder_scan_if: boolean;
    JSFinder_scan_if: boolean;
    Dirsearch_scan_if: boolean;
    Oneforall_scan_if: boolean;
    quake_if: boolean;
    fofa_if: boolean;
    hunter_if: boolean;
    scan_start_time: boolean;
    scan_end_time: string;
  }

  export interface ResProject {
    name: string;
    id: string;
  }

  export interface ResAddAsset {
    message: string;
  }

  export interface ResTag {
    status: Boolean;
    msg: string;
  }
}

export namespace Vuln {
  export interface ReqVulnParams extends ReqPage {
    id: string;
    target: string;
    project: string;
    vuln_name: string;
    vuln_from: string;
    vuln_level: string;
    editor_time: string;
  }

  export interface ResType {
    type: string;
  }

  export interface ResVulnList {
    id: string;
    target: string;
    project: string;
    vuln_name: string;
    vuln_from: string;
    vuln_level: string;
    editor_time: string;
  }
}

export namespace Sensitive_dir {
  export interface ReqSensitive_dirParams extends ReqPage {
    id: string;
    target: string;
    info: string;
    editor_time: string;
  }
  export interface ResSensitive_dirList {
    id: string;
    target: string;
    info: string;
    editor_time: string;
  }
}

export namespace Sensitive_info {
  export interface ReqSensitive_infoParams extends ReqPage {
    id: string;
    target: string;
    info: string;
    editor_time: string;
  }
  export interface ResSensitive_infoList {
    id: string;
    target: string;
    info: string;
    editor_time: string;
  }
}
