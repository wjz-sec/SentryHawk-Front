import{d as v,l as L,i as c,m as y,r as $,c as h,o as j,b as s,a as B,u as l,w as i,v as P,e as p,n as R,p as b,q,s as N,x as E,E as F}from"./index-Bj5Pylhr.js";import{u as g}from"./useHandleData-DW4kA-As.js";import{I as V,u as H}from"./index-BjdKsW-_.js";import{_ as M}from"./index.vue_vue_type_script_setup_true_name_ProTable_lang-D0RK73s3.js";import{T as S}from"./index-ypUc4-rv.js";import z from"./AssetDialog-CXtPL_DU.js";import{c as O,d as U,e as _,B as W,f as G,h as J,i as K,j as Q}from"./assets-DERgPz2g.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sortable.esm-C83syoBY.js";const X={class:"main-box"},Y={class:"table-box"},Z=v({name:"useTreeFilter"}),ce=v({...Z,setup(ee){const k=L(),w=t=>{k.push(`/assets/assetManage/detail/${t}`)},n=c(),d=y({projectId:""}),C=t=>{n.value.pageable.pageNum=1,d.projectId=t},T=y([{type:"selection",width:50},{prop:"asset",label:"资产",minWidth:451,search:{el:"input"}},{prop:"asset_type",label:"资产类别",width:100,enum:[{type:"URL"},{type:"Domain"},{type:"IP"}],search:{el:"select",props:{filterable:!0}},fieldNames:{label:"type",value:"type"}},{prop:"asset_editor_time",label:"创建时间",width:170},{prop:"operation",label:"操作",width:210,fixed:"right"}]),x=async t=>{var e;await g(_,{id:[t.id]},`删除【${t.asset}】资产`),(e=n.value)==null||e.getTableList()},A=async t=>{var e,a;await g(_,{id:t},"删除所选用户信息"),(e=n.value)==null||e.clearSelection(),(a=n.value)==null||a.getTableList()},D=async()=>{F.confirm("确认导出资产数据?","温馨提示",{type:"warning"}).then(()=>{var e;const t={...(e=n.value)==null?void 0:e.searchParam,projectId:d.projectId};H(Q,"单位资产列表",t)})},u=c(null),I=()=>{var e,a;const t={title:"资产",tempApi:G,importApi:W,getTableList:(e=n.value)==null?void 0:e.getTableList};(a=u.value)==null||a.acceptParams(t)},m=c(null),f=(t,e={})=>{var o,r;const a={title:t,row:{...e},api:t==="新增"?J:t==="编辑"?K:void 0,getTableList:(o=n.value)==null?void 0:o.getTableList};(r=m.value)==null||r.acceptParams(a)};return(t,e)=>{const a=$("el-button");return j(),h("div",X,[s(S,{label:"name",title:"单位列表","request-api":l(O),"default-value":d.projectId,onChange:C},null,8,["request-api","default-value"]),B("div",Y,[s(M,{ref_key:"proTable",ref:n,columns:T,"request-api":l(U),"init-param":d,"search-col":{xs:1,sm:1,md:2,lg:3,xl:3}},{tableHeader:i(o=>[s(a,{type:"primary",icon:l(q),onClick:e[0]||(e[0]=r=>f("新增"))},{default:i(()=>e[1]||(e[1]=[p("新增资产")])),_:1},8,["icon"]),s(a,{type:"primary",icon:l(N),plain:"",onClick:I},{default:i(()=>e[2]||(e[2]=[p("批量添加资产")])),_:1},8,["icon"]),s(a,{type:"primary",icon:l(E),plain:"",onClick:D},{default:i(()=>e[3]||(e[3]=[p("导出资产")])),_:1},8,["icon"]),s(a,{type:"danger",icon:l(b),disabled:!o.isSelected,onClick:r=>A(o.selectedListIds)},{default:i(()=>e[4]||(e[4]=[p("批量删除资产")])),_:2},1032,["icon","disabled","onClick"])]),operation:i(o=>[s(a,{type:"primary",link:"",icon:l(P),onClick:r=>w(o.row.id)},{default:i(()=>e[5]||(e[5]=[p("查看")])),_:2},1032,["icon","onClick"]),s(a,{type:"primary",link:"",icon:l(R),onClick:r=>f("编辑",o.row)},{default:i(()=>e[6]||(e[6]=[p("编辑")])),_:2},1032,["icon","onClick"]),s(a,{type:"primary",link:"",icon:l(b),onClick:r=>x(o.row)},{default:i(()=>e[7]||(e[7]=[p("删除")])),_:2},1032,["icon","onClick"])]),_:1},8,["columns","request-api","init-param"]),s(z,{ref_key:"DialogRef",ref:m},null,512),s(V,{ref_key:"dialogRef",ref:u},null,512)])])}}});export{ce as default};
