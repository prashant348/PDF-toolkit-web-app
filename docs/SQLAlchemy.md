# SQLAlchemy ORM Set Up with PSQL & FastAPI

### 1. First install modules and libraries

```bash
cd server # first move to backend root folder
pip install sqlalchemy psycopg2-binary alembic dotenv 
```

**Understand the use of these modules:**

|package | work|
|-------|------|
|sqlalchemy| ORM|
|psycopg2-binary| PostgreSQL driver|
|alembic| DB migrations|
|dotenv| env var |

### 2. Set Up SQLAlchemy code

- In `server/app/core/database.py` copy-paste this code:
  
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    url=DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=True,
)

class Base(DeclarativeBase):
    pass

```

- In `server/app/core/session.py` copy-paste this code:
  
```py
from core.database import SessionLocal, Base
from sqlalchemy.orm import Session
from typing import Generator

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```


### 3. Set up `server/app/auth/models.py`

- copy paste this code in `models.py`

```py
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from core.session import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
```

### 4. Set up env var

- Set up 2 different database URLs in `server/.env` file, both are of same format
 
```
DATABASE_URL=driver://username:password@localhost:5432/database_name
SQLALCHEMY_URL=driver://username:password@localhost:5432/database_name
```

- Now lets take example values:
```
POSTGRES_USER=postgres -> psql username
POSTGRES_DB=mydb -> psql database name
POSTGRES_PASSWORD=mypostgres@123 -> psql password
POSTGRES_HOST=localhost -> psql host
POSTGRES_PORT=5432 -> psql server port

now your urls will look like: 

replace special characters by their encoded value
here @ -> %40

NOTE: do not replace '@' of '@localhost:5432' by anything, just replace special characters of you username and pasword by their url encoded values

DATABASE_URL=postgres+psycopg2://postgres:mypostgres%40123@localhost:5432/mydb

for sqlalchemy url replace @ by %%40, means replace any special character by their encoded value followed by one '%' for sqlalchemy

so in SQLALCHEMY_URL use "Alembic Escapse" (given in below table)
SQLALCHEMY_URL=postgres+psycopg2://postgres:mypostgres%%40123@localhost:5432/mydb
```

**Some Encoded values of special characters:**
|Character|	Name|	Encoded Value| Alembic `(.ini)` Escape|
|------|-------|-------|-----| 
| ` ` |Space	|%20 or +| %%20 |
|`/`	|Forward Slash|	%2F| %%2F|
|`?`	|Question Mark|	%3F| %%3F|
|`&`	|Ampersand|	%26| %%26|
|`=`	|Equals Sign|	%3D| %%3D|
|`#`	|Hash / Pound|	%23| %%23|
|`:`	|Colon|	%3A| %%3A|
|`@`	|At Sign|	%40| %%40|
|`%`	|Percent Sign|	%25| %%25|
|`$`	|Dollar Sign|	%24| %%24|
|`+`	|Plus Sign|	%2B| %%2B|

### 5. Initialize `alembic`

- ensure you are already in `server/` directory
```bash
alembic init alembic
```

- an `alembic.ini` file and an `alembic/` named folder will be generated in `server/` folder
  
- `alembic/` folder will look like:
```
alembic/
│
├── versions/
├── env.py
├── README
├── script.py.mako

```

**NOTE:** Do not put `alembic.ini` file & `alembic/` folder names in `.gitignore`, they are not meant to be **untracked**

**NOTE:** Do not hardcore your sensitive data like database password or username in `alembic.ini`, means do not change anything in `alembic.ini` file, specially this line `sqlalchemy.url = driver://user:pass@localhost/dbname` of the file.

 


### 6. Set up `server/app/core/config.py`

- copy paste this code in `config.py`:

```py
from dotenv import load_dotenv
import os

load_dotenv()

SQLALCHEMY_URL = os.getenv("SQLALCHEMY_URL")

class Settings:
    SQLALCHEMY_URL = SQLALCHEMY_URL

settings = Settings()
```


### 7. Set up `server/alembic/env.py`

- add these lines in `env.py`:

```py
# add these imports
from app.core.config import settings
from app.core.database import Base
from app.auth.models import User


# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config -> THIS LINE ALREADY EXISTS IN env.py

#  OVERWRITE the sqlalchemy.url of alembic.ini from your .env file
config.set_main_option("sqlalchemy.url", settings.SQLALCHEMY_URL) -> you have to add only this line exactly at this place below 'config = context.config' line  


# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None: -> THESE LINES ALREADY EXISTS IN env.py TOO!
    fileConfig(config.config_file_name)

# and change this line...
target_metadata=None 
# to...
target_metadata=Base.metadata
```

### 8. Run `alembic` cmds

- run these cmds one by one:
```bash
alembic revision --autogenerate -m "create users table"
alembic upgrade head
```

- If cmds successfully run, go to pgAdmin and see in your database, your `users` table is generated

