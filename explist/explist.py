import csv
import sys

import argparse
import loadbib

parser = argparse.ArgumentParser(description = 'Expand biblist to bib file');
parser.add_argument('biblist', type=file, help='biblist file')
args = parser.parse_args()

bl = csv.reader(args.biblist)
for record in bl:
    locid = record[1].strip()
    print locid
    bibstr = loadbib.LoadBib(locid, record[0])
    print bibstr


