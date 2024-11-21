import mysql.connector
from app.database import db_config
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from app.database import db_config


def run_migration():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    with open('0001_create_clients_table.sql', 'r') as file:
        migration_sql = file.read()

    try:
        cursor.execute(migration_sql)
        connection.commit()
        print("Migration applied successfully!")
    except Exception as e:
        print(f"Error applying migration: {e}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    run_migration()
