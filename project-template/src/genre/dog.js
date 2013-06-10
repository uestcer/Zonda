// Generated by CoffeeScript 1.6.2
define(function(require, exports, module) {
  return module.exports = {
    genre: {
      "id ~ id : @Int": !null,
      "variety ~ var : @String": null,
      "lifetime ~ life : @Int": null,
      "min-height ~ min-h : @Float": null,
      "max-height ~ max-h : @Float": null,
      "wool ~ wool : @Array : @Object": [
        {
          "type ~ type : @Array : @Object": {
            "name ~ name : @String": null,
            "id ~ id : @Int": !null
          },
          "color ~ color : @Array : @Object": {
            "name ~ name : @String": null,
            "id ~ id : @Int": !null
          }
        }
      ]
    },
    CREATE: {
      url: "/FAKE_CREATE_dog",
      expire: 1,
      input: {
        variety: !null,
        lifetime: !null,
        wool: !null
      },
      output: {
        id: !null
      }
    },
    UPDATE: {
      url: "/FAKE_UPDATE_dog",
      expire: 1,
      input: "@dog",
      output: null
    },
    READ: {
      url: "/FAKE_READ_dog",
      expire: 1300,
      input: {
        id: !null
      },
      output: "@dog"
    },
    READ_LIST: {
      url: "/FAKE_READ_LIST_dog",
      expire: 1300,
      input: null,
      output: ": @Array : @dog"
    },
    DELELE: {
      url: "/FAKE_DELETE_dog",
      expire: 1300,
      input: {
        id: !null
      },
      output: null
    }
  };
});
