# ./utils/utils.py
# ==================================================
# standard
from typing import Dict, Any
# requirements
import pandas
# --------------------------------------------------

class Utilities(object):
    
    @classmethod
    def get_dependencies(
        cls, df: pandas.DataFrame, target_name: str, target_col: str='target', source_col: str='source'
    ) -> str:
        depend_list = df[df[target_col] == target_name][source_col].tolist()
        return '<br>'.join(depend_list) if len(depend_list) > 0 else 'No dependencies found'
    
    @classmethod
    def get_properties(
        cls, df: pandas.DataFrame, table_name: str, table_name_col: str='table_name'
    ) -> Dict[str, Any]:
        properties = df[df[table_name_col] == table_name].to_dict('records')[0]
        return properties
    
    @classmethod
    def get_options(cls) -> str:
        var_options = (
            '''
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
                        "roundness": 0.70
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
            }
            '''
        )
        return var_options
