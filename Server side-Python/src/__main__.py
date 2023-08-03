import psycopg2
import random
from fastapi import FastAPI, Path, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from psycopg2.pool import SimpleConnectionPool
from config.const_variables import BASE_URL, SLASH_REGEX, MAX_RETRIES, URL_LENGTH, CHARACTERS_POOL

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Create a connection pool for the database

def create_db_pool():
    connection_string = "dbname='tinyurldb' user='docker' password='docker' host='localhost'"
    return SimpleConnectionPool(minconn=1, maxconn=10, dsn=connection_string)

db_pool = create_db_pool()

def get_db_connection():
    connection = db_pool.getconn()
    try:
        yield connection
    finally:
        db_pool.putconn(connection)


def create_url_mapping_table(db_connection):
    with db_connection.cursor() as cursor:
        try:
            cursor.execute("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='url_mapping')")
            table_exists = cursor.fetchone()[0]
            if not table_exists:
                cursor.execute("""
                    CREATE TABLE url_mapping (
                        short_url varchar(100) NOT NULL PRIMARY KEY,
                        long_url text NOT NULL
                    );
                """)
                db_connection.commit()
        except Exception as e:
            print(f"Error creating table: {e}")
            db_connection.rollback()

@app.on_event("startup")
async def startup_event():
    db_connection = db_pool.getconn()
    create_url_mapping_table(db_connection)
    db_pool.putconn(db_connection)

def generate_tiny_url():
    return ''.join(random.choice(CHARACTERS_POOL) for _ in range(URL_LENGTH))

def create_tiny_url(long_url, db_connection):
    cursor = db_connection.cursor()
    tiny_code = generate_tiny_url()
    i = 0
    while i < MAX_RETRIES:
        try:
        # Insert the shortened URL into the database
            cursor.execute("INSERT INTO url_mapping (short_url, long_url) VALUES (%s, %s)", (f"{BASE_URL}{tiny_code}", long_url))
            db_connection.commit()
            cursor.close()
            break
        except psycopg2.IntegrityError:
            # Retry if the generated tiny code already exists in the database
            tiny_code = generate_tiny_url()
            i += 1
    else:
        db_connection.rollback()
        raise RuntimeError("ERROR-cann't provide tiny URL")
    return tiny_code


@app.get("/tinyUrl/", response_model=list)
async def get_all_urls(db_connection = Depends(get_db_connection)):
    with db_connection.cursor() as cursor:
        query = "SELECT * FROM url_mapping;"
        cursor.execute(query)
        return cursor.fetchall()

@app.get("/tinyUrl/getShortUrl/{longUrl:path}")
async def get_short_url(longUrl:str = Path(...), db_connection = Depends(get_db_connection)):

    with db_connection.cursor() as cursor:
        # longUrl = longUrl.replace("{", "").replace("}", "")
        query = "SELECT * FROM url_mapping WHERE long_url = %s;"
        cursor.execute(query, (longUrl,))
        result = cursor.fetchone()
        # return longUrl
    newShortUrl=None
    if result is None:
        newShortUrl=create_tiny_url(longUrl, db_connection)
        return f"{BASE_URL}{newShortUrl}"
    return result[0]

@app.get("/tinyUrl/getLongUrl/{shortUrl:path}")
async def get_long_url(shortUrl:str = Path(..., regex=SLASH_REGEX), db_connection = Depends(get_db_connection)):
    with db_connection.cursor() as cursor:
        shortUrl = shortUrl.replace("{", "").replace("}", "")
        query = "SELECT * FROM url_mapping WHERE short_url = %s;"
        cursor.execute(query , (shortUrl,))
        result = cursor.fetchone()

    if result is None:
        return {"error1": "Short URL not found"}
    return result[1]


@app.get("/tinyUrl/{longUrl:path}")
async def direct(longUrl: str = Path(..., regex=SLASH_REGEX), db_connection = Depends(get_db_connection), redirect: bool = True):
    with db_connection.cursor() as cursor:
        longUrl = longUrl.rstrip("/")
        # return longUrl
        query = "SELECT * FROM url_mapping WHERE short_url = %s;"
        cursor.execute(query, (f"{BASE_URL}{longUrl}",))
        result = cursor.fetchone()

    if result is not None:
        short_url = result[0]
        if redirect:
            # Redirect to the long URL
            return RedirectResponse(url=result[1])
        else:
            # Return the long URL without redirecting
            return {"long URL": result[1]}
    # If the short URL is not found, return an error response
    return {"error2": "Short URL not found"}