from pydantic import BaseModel



class User(BaseModel):
    # id: Optional[UUID] = uuid4()
    username: str
    password: str

class MenuItem(BaseModel):
    id: int
    name: str
    unitPrice: float
    description: str
    imageUrl: str

class CartItem(BaseModel):
    user_id: str
    item_id: int
    quantity: int



