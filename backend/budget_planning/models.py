
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    total_deposit = models.IntegerField(default=0)
    expected_expense = models.ForeignKey('Expense', on_delete=models.PROTECT, related_name="expected_expense", null=True)
    actual_expense = models.ForeignKey('Expense', on_delete=models.PROTECT, related_name="actual_expense", null=True)
    savings = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
        }

class Expense(models.Model):
    groceries = models.IntegerField(default=0)
    personal = models.IntegerField(default=0)
    housing = models.IntegerField(default = 0)
    mobile = models.IntegerField(default=0)
    insurance = models.IntegerField(default = 0)

    def serialize(self):
        return {
            "groceries": self.groceries,
            "personal": self.personal,
            "housing": self.housing,
            "mobile": self.mobile,
            "insurance": self.insurance
        }

class Report(models.Model):
    month = models.CharField(max_length=64, blank=True)
    owner_user = models.ForeignKey(User, on_delete=models.CASCADE, name="owner_user")

    def serialize(self):
        return {
            "month": self.month,
            "owner_user": self.owner_user
        }

    

