from django.db import models
from users.models import User


class Project(models.Model):

    STATUS_CHOICES = (
        ("NOT STARTED", "Not Started"),
        ("IN PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
        ("ON HOLD", "On Hold"),
    )
    project_name = models.CharField(max_length=200)
    project_description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.project_name


class Module(models.Model):

    STATUS_CHOICES = (
        ("NOT STARTED", "Not Started"),
        ("IN PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
        ("ON HOLD", "On Hold"),
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=200)
    module_description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.module_name


class Topic(models.Model):

    PRIORITY_CHOICES = (
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
    )
    STATUS_CHOICES = (
        ("TODO", "Todo"),
        ("IN PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
    )
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    topic_name = models.CharField(max_length=200)
    topic_description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    estimated_hours = models.PositiveIntegerField()
    due_date = models.DateField()
    assigned_employee = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return self.topic_name