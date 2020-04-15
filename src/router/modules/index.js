// children 中对象大于1时 添加 isGroup: true，列表渲染始终为 组
// 路由中角色配置要求
/**
 * 父组件角色不要大于子组件
 * 父组件无角色属性会验证子组件
 */

import system from "./system";
import setup from "./setup";
import process from "./process";
import student from "./student";
import data from "./data";

export default [...student, ...setup, ...process, ...data, ...system];
