import * as user from "./user";
import * as system from "./system";
import * as competition from "./competition/competition";
import * as process from "./competition/process";
export default { ...user, ...system, ...competition, ...process };
