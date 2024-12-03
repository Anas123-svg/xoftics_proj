from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """
    Verify that the plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)
