import { FastlineVpnEntityBase } from '../FastlineVpnEntityBase';
import type { FastlineVpnSDK } from '../FastlineVpnSDK';
import type { Control } from '../types';
import type { Server, ServerCreateData } from '../FastlineVpnTypes';
declare class ServerEntity extends FastlineVpnEntityBase<Server> {
    constructor(client: FastlineVpnSDK, entopts: any);
    make(this: ServerEntity): ServerEntity;
    create(this: any, reqdata?: ServerCreateData, ctrl?: Control): Promise<ServerEntity>;
}
export { ServerEntity };
