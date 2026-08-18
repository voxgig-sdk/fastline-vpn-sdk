
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'FastlineVpn',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://freevpn-rel.fastline.club",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      server: {
      },

    }
  }


  entity = {
    "server": {
      "fields": [
        {
          "name": "servers",
          "type": "`$ARRAY`"
        },
        {
          "name": "success",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "server",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/ajax/servers",
              "parts": [
                "ajax",
                "servers"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

