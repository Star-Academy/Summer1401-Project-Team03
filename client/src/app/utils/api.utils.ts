export const BASE_URL = 'https://localhost:7017';

const INVENTORY_SERVICE = BASE_URL + '/DataInventory';
export const INVENTORY_IMPORT = INVENTORY_SERVICE + '/Import';
export const INVENTORY_EXPORT = INVENTORY_SERVICE + '/Export';
export const INVENTORY_ALL = INVENTORY_SERVICE + '/GetFilesInformation';
export const INVENTORY_DELETE = INVENTORY_SERVICE + '/delete';

const PIPELINE_SERVICE = BASE_URL + '/Pipeline';
export const PIPELINE_CREATE = PIPELINE_SERVICE + '/Create';
export const PIPELINE_TRANSFORMER = PIPELINE_SERVICE + '/AddTransformer';
export const PIPELINE_ALL = PIPELINE_SERVICE + '/getPipelinesInformation';

// Pipeline node
export const ADD_PIPELINE_NODE = PIPELINE_SERVICE + '/AddComponent';
export const ADD_PIPELINE_CHANGE_POSITION = PIPELINE_SERVICE + '/ChangeComponentPosition';
export const PIPELINE_ONE = PIPELINE_SERVICE + '/getPipelineInformation';
export const PIPELINE_NODE_CONFIG = PIPELINE_SERVICE + '/GetComponent';
export const PIPELINE_SET_CONFIG = PIPELINE_SERVICE + '/SetComponentConfig';

export const POST_INIT = {
    method: 'post',
    headers: {
        'content-type': 'application/json',
    },
};

export const PUT_INIT = {
    method: 'put',
    headers: {
        'content-type': 'application/json',
    },
};

export const DELETE_INIT = {
    method: 'delete',
    headers: {
        'content-type': 'application/json',
    },
};

export const FORM_POST_INIT = {
    method: 'post',
};
