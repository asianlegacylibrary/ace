from elasticsearch import Elasticsearch, helpers
import os
import sys
import json
from pathlib import Path

from config import config_es

# create ES client
env = "production"
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
data = os.path.join(dirname, 'data')

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
def g():
    for f, index in load_json(data):
        print("index is: ", index)
        reindex(index)
        for work in f:
            yield {
                "_index": index,
                "_type": "document",
                "_source": work
            }
        #     print("************************")
        #     print(work)
helpers.bulk(es, g())
#helpers.bulk(es, ll(u), index='test_nlm')