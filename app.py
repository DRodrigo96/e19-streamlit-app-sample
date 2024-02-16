# ./app.py
# ==================================================
# requirements
import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
from pyvis.network import Network
# defined
from utils.utils import Utilities
# --------------------------------------------------

# [NOTE] data for network
# --------------------------------------------------
db_dep = pd.read_csv('./data/db_dependencies.csv', delimiter=';')
db_prop = pd.read_csv('./data/db_properties.csv', delimiter=';')

# [NOTE] streamlit
# --------------------------------------------------
st.title('Table dependencies network')

table_list = db_prop['table_name'].tolist()
table_list.sort()
selected_tables = st.multiselect('Tablas a visualizar', table_list)

if len(selected_tables) == 0:
    st.text('Escoger al menos una tabla...')
else:
    df_select = db_dep.loc[db_dep['source'].isin(selected_tables) | db_dep['target'].isin(selected_tables)]
    df_select = df_select.reset_index(drop=True)
    nb_select = set(df_select['source'].unique()).union(set(df_select['target'].unique()))
    df_prop_select = db_prop.loc[db_prop['table_name'].isin(nb_select)]
    
    # [NOTE] network and dependencies
    db_net = Network(height='750px', width="100%", bgcolor='#F0F0F0', font_color='#000000')
    sources = df_select['source']
    targets = df_select['target']
    edge_data = zip(sources, targets)
    for e in edge_data:
        src = e[0]
        trg = e[1]
        db_net.add_node(src, src, title=src)
        db_net.add_node(trg, trg, title=trg)
        db_net.add_edge(source=src, to=trg)
    neighbor_map = db_net.get_adj_list()
    
    # [NOTE] node properties
    for node in db_net.nodes:
        table_name = node['title']
        table_dependencies = Utilities.get_dependencies(db_dep, table_name)
        table_properties = Utilities.get_properties(df_prop_select, table_name)
        
        # [NOTE] tooltips
        prop_str = (
            f'''
            - Table name: {table_name}
            <br>
            - Dependencies:
            <br>
            {table_dependencies}
            <br>
            - Propiedades:
            <br>
            Rows: {table_properties['nro_rows']}
            <br>
            Columns: {table_properties['nro_cols']}
            <br>
            Schema: {table_properties['schema']}
            '''
        )
        
        # [NOTE] network labels
        node['title'] = prop_str
        node['value'] = len(neighbor_map[node['id']])
    
    # [NOTE] graph properties
    var_options = Utilities.get_options()
    db_net.set_options(var_options)
    
    # [NOTE] save and read graph as HTML file (on Streamlit Sharing)
    path = './public/resources'
    db_net.save_graph(f'{path}/pyvis-graph.html')
    HtmlFile = open(f'{path}/pyvis-graph.html', 'r', encoding='utf-8')
    components.html(HtmlFile.read(), height=750)
