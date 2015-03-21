import csv
import sys

import argparse

parser = argparse.ArgumentParse(description = 'Expand biblist to bib file');
parser.add_argument('biblist', type=file, help='biblist file')
args = parser.parse_args()

bl = csv.reader(args.biblist)
for record in bl
    print recond


