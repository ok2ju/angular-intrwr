import _ from 'lodash';

/**
 * Create restfull resource based on Restangular.
 * @param {String} name - name of the resource.
 * @param {Object} Restangular  - instance of Restangular.
 * @param {Object} extension - this extension mixed with result object.
 * It overwrite property assignments of generic resource.
 * @returns {Object} - result object.
 */
export function createResource(name, Restangular, extension) {
  const R = Restangular;

  const genericResource = {
    create(res) {
      return R.all(name).post(res);
    },

    update(id, data) {
      return R.one(name, id).customPUT(data);
    },

    list(query) {
      return R.all(name).getList(query || {});
    },

    one(id) {
      return R.one(name, id).get();
    },

    delete(id) {
      return R.one(name, id).remove();
    }
  };

  const res = {};
  if(extension && _.isObject(extension)) {
    _.assign(res, genericResource, extension);
  } else {
    _.assign(res, genericResource);
  }
  return res;
}