from data_layer.models.base import Base
import sqlalchemy as sql
from sqlalchemy.orm import relationship
from data_layer.models.user import User


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)
    user_id = sql.Column(sql.Integer, sql.ForeignKey("user.id"))

    writer = relationship("User", foreign_keys=[user_id])

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"

