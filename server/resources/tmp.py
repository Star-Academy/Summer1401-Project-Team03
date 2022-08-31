from sqlalchemy import create_engine
import pandas.io.sql as psql
engine = create_engine('postgresql://postgres:Khosro1381@localhost/postgres')
connection = engine.connect()
connection.execute('DROP TABLE IF EXISTS t1')
input = psql.read_sql('SELECT * FROM (TABLE t2) AS t3', connection)    
output = input
output = input['__']
output.to_sql('t1', connection)