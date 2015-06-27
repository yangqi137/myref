import urllib2

def LoadBib(locid, citename):
    kind, id = locid.split(':')
    if kind == 'arXiv':
        return arXiv2bib(id, citename)
    if kind == 'doi':
        return doi2bib(id, citename)

def doi2bib(doi, citename):
    prefix = doi.split('/')[0]
    if prefix == '10.1103':
        return aps2bib(doi, citename)
    req = urllib2.Request('http://dx.doi.org/' + doi,
                          headers = {'Accept': 'application/x-bibtex'})
    hf = urllib2.urlopen(req)
    str = ''
    for line in hf:
        str += line
    return str

def aps2bib(doi, citename):
    pass

def arXiv2bib(id, citename):
    pass
