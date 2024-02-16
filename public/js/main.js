// ./public/js/main.js
// ==================================================
// --------------------------------------------------

var edges, nodes, network, container, options, data;

const drawGraph = () => {
  var container = document.getElementById('network');
  
  nodes = new vis.DataSet(
    [
      {
        "font": {"color": "#000000"},
        "id": "clientes_a",
        "label": "clientes_a",
        "shape": "dot",
        "title": "\n            - Table name: clientes_a\n            \u003cbr\u003e\n            - Dependencies:\n            \u003cbr\u003e\n            No dependencies found\n            \u003cbr\u003e\n            - Propiedades:\n            \u003cbr\u003e\n            Rows: 2000\n            \u003cbr\u003e\n            Columns: 4\n            \u003cbr\u003e\n            Schema: {\u0027id\u0027: \u0027int\u0027, \u0027name\u0027: \u0027string\u0027, \u0027tc_client\u0027: \u0027decimal\u0027, \u0027cl_code\u0027: \u0027bool\u0027}\n            ", "value": 1
      },
      {
        "font": {"color": "#000000"},
        "id": "clientes_c",
        "label": "clientes_c",
        "shape": "dot",
        "title": "\n            - Table name: clientes_c\n            \u003cbr\u003e\n            - Dependencies:\n            \u003cbr\u003e\n            clientes_a\u003cbr\u003eclientes_b\u003cbr\u003eclientes_f\n            \u003cbr\u003e\n            - Propiedades:\n            \u003cbr\u003e\n            Rows: 5000\n            \u003cbr\u003e\n            Columns: 3\n            \u003cbr\u003e\n            Schema: {\u0027id\u0027: \u0027int\u0027, \u0027name\u0027: \u0027string\u0027, \u0027hb_date\u0027: \u0027datetime\u0027}\n            ", "value": 4
      },
      {
        "font": {"color": "#000000"},
        "id": "clientes_b",
        "label": "clientes_b",
        "shape": "dot",
        "title": "\n            - Table name: clientes_b\n            \u003cbr\u003e\n            - Dependencies:\n            \u003cbr\u003e\n            No dependencies found\n            \u003cbr\u003e\n            - Propiedades:\n            \u003cbr\u003e\n            Rows: 3000\n            \u003cbr\u003e\n            Columns: 4\n            \u003cbr\u003e\n            Schema: {\u0027id\u0027: \u0027int\u0027, \u0027name\u0027: \u0027string\u0027, \u0027tc_client\u0027: \u0027decimal\u0027, \u0027cl_code\u0027: \u0027bool\u0027}\n            ", "value": 1
      },
      {
        "font": {"color": "#000000"},
        "id": "clientes_e",
        "label": "clientes_e",
        "shape": "dot",
        "title": "\n            - Table name: clientes_e\n            \u003cbr\u003e\n            - Dependencies:\n            \u003cbr\u003e\n            clientes_c\n            \u003cbr\u003e\n            - Propiedades:\n            \u003cbr\u003e\n            Rows: 2000\n            \u003cbr\u003e\n            Columns: 3\n            \u003cbr\u003e\n            Schema: {\u0027id\u0027: \u0027int\u0027, \u0027name\u0027: \u0027string\u0027, \u0027hb_date\u0027: \u0027datetime\u0027}\n            ", "value": 1
      },
      {
        "font": {"color": "#000000"},
        "id": "clientes_f",
        "label": "clientes_f",
        "shape": "dot",
        "title": "\n            - Table name: clientes_f\n            \u003cbr\u003e\n            - Dependencies:\n            \u003cbr\u003e\n            No dependencies found\n            \u003cbr\u003e\n            - Propiedades:\n            \u003cbr\u003e\n            Rows: 2000\n            \u003cbr\u003e\n            Columns: 4\n            \u003cbr\u003e\n            Schema: {\u0027id\u0027: \u0027int\u0027, \u0027name\u0027: \u0027string\u0027, \u0027tc_client\u0027: \u0027decimal\u0027, \u0027cl_code\u0027: \u0027bool\u0027}\n            ", "value": 1
      }
    ]
  );
  edges = new vis.DataSet(
    [
      {"from": "clientes_a", "to": "clientes_c"},
      {"from": "clientes_b", "to": "clientes_c"},
      {"from": "clientes_c", "to": "clientes_e"},
      {"from": "clientes_f", "to": "clientes_c"}
    ]
  );
  
  data = {nodes: nodes, edges: edges};
  var options = {
    "layout": {
      "hierarchical": {
        "enabled": true,
        "edgeMinimization": true,
        "direction": "LR",
        "sortMethod": "directed"
      }
    },
    "edges": {
      "physics": true,
      "smooth": {
        "enabled": true,
        "type": "cubicBezier",
        "roundness": 0.7
      }, 
      "arrows": {
        "to": {
          "enabled": true,
          "scaleFactor": 0.4,
          "type": "arrow"
        }, 
        "middle": {
          "enabled": false,
          "scaleFactor": 0.4
        }, 
        "from": {
          "enabled": false,
          "scaleFactor": 0.4,
          "type": "arrow"
        }
      }
    }
  };
  network = new vis.Network(container, data, options);
  return network;
};

drawGraph();
