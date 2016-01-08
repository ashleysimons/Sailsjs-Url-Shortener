/**
* Url.js
*
* @description :: Contains a URL to be shortened.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
      path: {
          type: 'string',
          required: true
      },
      token: {
          type: 'string',
          required: true,
          index: true
      },
      active: {
          type: 'string',
          enum: ['ACTIVE', 'UN_PUBLISHED', 'DELETED'],
          defaultsTo: 'ACTIVE'
      },
      updatedAt: {
          type: 'datetime',
          defaultsTo: function (){ return new Date(); },
          autoUpdatedAt: true
      },
      created: {
          type: 'datetime',
          defaultsTo: function (){ return new Date(); }
      }
  }
};

