from decouple import config
import os


os.environ['DATABASE_URL'] = 'postgres://lgllyayu:pBmRfXVFZ60eIRBrkvwjLefMVGWo_rPZ@rogue.db.elephantsql.com:5432/lgllyayu'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "..", "..", "example.db")
DATABASE_URL = config('DATABASE_URL')
print(DATABASE_URL)
