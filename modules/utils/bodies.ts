export function governmentQuery() {
    const body = {
        operationName: "GetThreatActors",
        variables: {},
        query: `
          query GetThreatActors { 
            sectors(search: "government") { 
              edges { 
                node { 
                  id 
                  name 
                } 
              } 
            } 
          }
        `
      };
    return body;      
}

export function threatActorQuery() {
    const body = {
        operationName: "GetThreatActors",
        variables: {},
        query: `
          query GetThreatActors { 
            threatActors { 
              edges { 
                node { 
                  id 
                  name 
                } 
              } 
            } 
          }
        `
      };
    return body;      
}