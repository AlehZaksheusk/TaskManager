from django.db import models
from datetime import datetime

class Abstract(models.Model):
    create_time = models.DateTimeField(default = datetime.now, verbose_name="Create time")
    name = models.TextField(max_length = 100, verbose_name="Name")
    def __unicode__(self):
       return self.header
    class Meta:
        abstract = True

class User(Abstract):
    is_manager = models.BooleanField(default=False, verbose_name="Is manager?")
    class Meta:
        verbose_name ="User"
        verbose_name_plural = "Users"

class Project(Abstract):
    user = models.ManyToManyField(User)
    class Meta:
        verbose_name ="Project"
        verbose_name_plural = "Projects"

class Task(Abstract):
    description = models.TextField(default=False, verbose_name="Description")
    due_date = models.DateField(verbose_name="Due date", default=datetime.today)
    user = models.ForeignKey(User)
    project = models.ForeignKey(Project);
    class Meta:
        verbose_name ="Project"
        verbose_name_plural = "Projects"