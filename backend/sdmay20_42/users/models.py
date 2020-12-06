from django.db import models
from django.contrib.auth.models import User


# This is how we can create a custom user with additional fields. This model is currently unused.
class HomeSecurityUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="securityUser")
    # add fields here

    # DB stuff.
    # class Meta:
    # managed = False
    # db_table = 'home_security_user'
