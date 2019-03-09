from elasticsearch import Elasticsearch, helpers
import os
import sys
import json
from pathlib import Path

from config import config_es, index_ids

# create ES client
env = "development"
es = Elasticsearch(
    [config_es[env]],
    sniff_on_start=True,
    # refresh nodes after a node fails to respond
    sniff_on_connection_fail=True,
    # and also every 60 seconds
    sniffer_timeout=60
)

#es_indices = es.indices.get_alias().keys()
#print(es_indices)

def reindex(i):
    if es.indices.exists(i):
        print("Recreating INDEX", i)
        es.indices.delete(i)
        es.indices.create(i)
    else:
        es.indices.create(i)


dirname = os.path.dirname(__file__)
data = os.path.join(dirname, '..', 'json')

def load_json(directory):
    " Use a generator, no need to load all in memory"
    for pth in Path(directory).iterdir():
        if pth.suffix == '.json':
            print("#############")
            print(pth)
            index = os.path.splitext(os.path.basename(pth))[0]
            with open(pth,'r') as open_file:
                yield json.load(open_file), index

#load_json(data)
def index_items(index_type):
    for f, index in load_json(data):
        print("index is: ", index)
        if index_type == "index":
            reindex(index)
        for i, work in enumerate(f):
            # a if condition else b
            work_id = work[index_ids[index]] if index_ids[index] in work else "_no_work_id_" + str(i)
            yield {
                "_id": work_id,
                "_index": index,
                "_type": "document",
                "_source": work
            }

helpers.bulk(es, index_items("index")) # could also be create
