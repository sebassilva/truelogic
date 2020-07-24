from django.db import models
from django.contrib.auth.models import User

# Adds a timestamp when created or mdified. 
class TrackedModel(models.Model):
    datetime_created = models.DateTimeField(auto_now_add=True, db_index=False)
    datetime_modified = models.DateTimeField(auto_now=True, db_index=False)

    class Meta:
        abstract = True
        get_latest_by = 'datetime_created'


class Memory(TrackedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(null=False, blank=False, max_length=140)
    rating = models.IntegerField(null=False, blank=False, max_length=50)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=False, null=False)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=False, null=False)

    def __str__(self):
        return self.description