from pydantic import BaseModel
from typing import List


class User(BaseModel):
    # id: Optional[UUID] = uuid4()
    username: str
    password: str

class MenuItem(BaseModel):
    id: str
    name: str
    unitPrice: float
    description: str
    imageUrl: str

class CartItem(BaseModel):
    user_id: str
    item_id: int
    quantity: int

class OrderItem(BaseModel):
    id: str
    quantity: int

class Order(BaseModel):
    totalPrice: float
    orderItem: List[OrderItem]