from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }