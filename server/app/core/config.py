from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

print(settings.SECRET_KEY)
print(settings.ALGORITHM)
print(settings.ACCESS_TOKEN_EXPIRE_MINUTES)
