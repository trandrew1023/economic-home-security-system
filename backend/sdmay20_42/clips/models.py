import django
from django.db import models


class Clip(models.Model):
    clip_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(django.contrib.auth.get_user_model(), on_delete=models.CASCADE, db_column='user_id')
    camera_id = models.ForeignKey('cameras.Camera', on_delete=models.CASCADE, db_column='camera_id')
    clip_url = models.CharField(max_length=256)
    date_added = models.DateField(null=False)

    class Meta:
        managed = False
        db_table = 'clips'