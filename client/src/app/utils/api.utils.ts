export const BASE_URL = 'https://localhost:5017';

const INVENTORY_SERVICE = BASE_URL + '/DataInventory';
export const INVENTORY_IMPORT = INVENTORY_SERVICE + '/Import';
export const INVENTORY_EXPORT = INVENTORY_SERVICE + '/Export';
export const INVENTORY_ALL = INVENTORY_SERVICE + '/GetFilesInformation';

const PIPELINE_SERVICE = BASE_URL + '/Pipeline';
export const PIPELINE_CREATE = PIPELINE_SERVICE + '/Create';
export const PIPELINE_TRANSFORMER = PIPELINE_SERVICE + '/AddTransformer';
export const PIPELINE_SOURCE = PIPELINE_SERVICE + '/AddSource';
export const PIPELINE_DESTINATION = PIPELINE_SERVICE + '/AddDestination';

export const POST_INIT = {
    method: 'post',
    headers: {
        'content-type': 'application/json',
    },
};

export const FORM_POST_INIT = {
    method: 'post',
};
