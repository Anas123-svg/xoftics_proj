import mysql.connector
from mysql.connector import pooling


db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",  
    "database": "xoftics"
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=30, **db_config)

def get_db_connection():
    """
    Fetches a connection from the pool.
    """
    try:
        connection = connection_pool.get_connection()
        return connection
    except Exception as e:
        raise Exception(f"Failed to get database connection: {str(e)}")
