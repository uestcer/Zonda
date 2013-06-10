# test case genre
define ( require ) ->
  module "Genre"

  Util = require "util"

  Genre = Util.Genre

  API =
    genre:
      "id~id : @Number": ""

      "variety~var : @String": ""
      "lifetime~life : @Number": ""

      "min-height~min-h : @Number": ""
      "max-height~max-h : @Number": ""

      "wool~wool : @Array": [
        {
          "type~type : @Array": [
            {
              "name~typename : @String": ""
              "id~typeid : @Number": ""
            }
          ]
          "color~color : @Array": [
            {
              "name~colorname : @String": ""
              "id~colorid : @Number": ""
            }
          ]
        }
      ]

    CREATE:
      url: "/FAKE_CREATE_dog"
      expire: 1
      input:
        variety: not null
        lifetime: not null
        wool: not null
      output:
        id: not null

    UPDATE:
      url: "/FAKE_UPDATE_dog"
      expire: 1
      input: "@dog"
      output: null

    READ:
      url: "/FAKE_READ_dog"
      expire: 1300
      input:
        id: not null
      output: "@dog"

    READ_LIST:
      url: "/FAKE_READ_LIST_dog"
      expire: 1300
      input: null
      output: ": @Array : @dog"

    DELELE:
      url: "/FAKE_DELETE_dog"
      expire: 1300
      input:
        id: not null
      output: null

  # Test Genre
  # - - -
  dog = new Genre API, "@dog"
  # - - -
  # Test Genre

  test "API", ->
    ok dog.inspect
    ok dog.toLocal
    ok dog.toRemote
    #ok dog.GENRE

  test "toLocal", ->
    a = dog.toLocal
      id: 1
      life: 12
      var: "Sheep Dog"

    ok a.id
    ok a.lifetime
    ok a.variety

  test "toRemote", ->
    b = dog.toRemote
      id: 2
      lifetime: 13
      variety: 12

    ok b.id
    ok b.life
    ok b.var

  test "Mapping complex structures", ->
    b = dog.toRemote
      id: 1
      lifetime: 12
      variety: "adf"
      "min-height": 12
      wool: [
        {
          type: [
            {
              id: 1
              name: "asdf"
            }
          ]
          color: [
            {
              id: 2
              name: "asdfasdfa"
            }
          ]
        }
        {
          type: [
            {
              id: 1
              name: "asdf"
            }
          ]
          color: [
            {
              id: 2
              name: "asdfasdfa"
            }
          ]
        }
      ]

    ok b.wool[0].type[0].typeid
    ok b.wool[0].type[0].typename

    ok b.wool[0].color[0].colorid
    ok b.wool[0].color[0].colorname

    ok b.wool[1].type[0].typeid
    ok b.wool[1].type[0].typename

    ok b.wool[1].color[0].colorid
    ok b.wool[1].color[0].colorname

    b = dog.toLocal b
    ok b.wool[0].type[0].id
    ok b.wool[0].type[0].name

    ok b.wool[0].color[0].id
    ok b.wool[0].color[0].name

    ok b.wool[1].type[0].id
    ok b.wool[1].type[0].name

    ok b.wool[1].color[0].id
    ok b.wool[1].color[0].name

  test "Inspect Complex structures", ->
    b = dog.toRemote
      id: 1
      lifetime: 12
      variety: '121'
      "min-height": 12
      wool: [
        {
          type: [
            {
              id: 1
              name: "asdf"
            }
          ]
          color: [
            {
              id: 2
              name: "121"
            }
          ]
        }
        {
          type: [
            {
              id: 1
              name: "asdf"
            }
          ]
          color: [
            {
              id: 2
              name: "asdfasdfa"
            }
          ]
        }
      ]

    ok dog.inspect b

    console.dir dog
  
# END define
