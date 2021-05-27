import os 
import json 
class archive: 
    def __init__(self, id=None, url=None, tag=None): 
        self.id = id 

        if url: 
            self.url = url 

        if tag: 
            self.tag = tag 
        else: 
            self.tag = os.path.abspath(url) 

        if(os.path.isFile(tag)):
            self.type="File"
        else:
            self.type="Directory"

        self.json = json.dumps({"id": self.id, "url": self.url, "tag": self.tag, "type": self.type}) 
