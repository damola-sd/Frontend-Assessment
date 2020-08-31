from data_layer.models.base import Base
import sqlalchemy as sql


class User(Base):
  __tablename__ = "user"
  id = sql.Column(sql.Integer, primary_key=True)
  email = sql.Column(sql.String)
  password = sql.Column(sql.String)
  username = sql.Column(sql.String, unique=True)
  

  def __repr__(self):
        return f"<User (id={self.id}, email={self.email}, name={self.name})>"