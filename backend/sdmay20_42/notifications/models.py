import django
from django.db import models


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(django.contrib.auth.get_user_model(), on_delete=models.CASCADE, db_column='user_id')
    notification = models.CharField(max_length=256)
    timestamp = models.CharField(max_length=256)

    class Meta:
        managed = False
        db_table = 'notifications'
